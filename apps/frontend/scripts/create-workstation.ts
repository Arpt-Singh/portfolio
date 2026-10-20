import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

interface GltfDocument {
  buffers: { uri?: string; byteLength: number }[];
  bufferViews: { buffer: number; byteOffset?: number; byteLength: number }[];
  images?: ({ uri: string } | { bufferView: number; mimeType: string })[];
  samplers?: { magFilter: number; minFilter: number; wrapS: number; wrapT: number }[];
  textures?: { source: number; sampler: number }[];
  materials: { pbrMetallicRoughness: { baseColorTexture?: { index: number } } }[];
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = process.argv[2];
if (!source) throw new Error("Usage: npm run generate:workstation -- /path/to/workstation01.png");
const output = path.join(root, "public/desktop_pc/workstation01");
const image = await readFile(source);
if (image.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
  throw new Error("The source must be a PNG image");
}
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
if (!width || !height) throw new Error("PNG dimensions must be positive");

// GLTFExporter uses the browser FileReader API even for geometry-only exports.
Object.defineProperty(globalThis, "FileReader", { value: class {
  result: string | ArrayBuffer | null = null;
  onloadend?: () => void;
  onerror?: (error: unknown) => void;

  readAsArrayBuffer(blob: Blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result;
      this.onloadend?.();
    }, (error) => this.onerror?.(error));
  }
  readAsDataURL(blob: Blob) {
    blob.arrayBuffer().then((result) => {
      this.result = `data:${blob.type};base64,${Buffer.from(result).toString("base64")}`;
      this.onloadend?.();
    }, (error) => this.onerror?.(error));
  }
} });

const scene = new THREE.Scene();
scene.name = "Workstation01 image";
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 3 * height / width),
  new THREE.MeshBasicMaterial({ name: "Full workstation image", side: THREE.DoubleSide }),
);
plane.name = "Full image plane";
// glTF textures use a top-left origin, unlike Three.js plane UVs.
const uv = plane.geometry.attributes.uv;
if (!(uv instanceof THREE.BufferAttribute)) throw new Error("Expected CPU-backed plane UVs");
for (let i = 0; i < uv.count; i++) {
  uv.setY(i, 1 - uv.getY(i));
}
scene.add(plane);
const exporter = new GLTFExporter();
const exported = await exporter.parseAsync(scene, { binary: false, onlyVisible: true });
if (exported instanceof ArrayBuffer) throw new Error("Expected a JSON glTF export");
// GLTFExporter's JSON return type does not describe its schema.
const gltf = exported as GltfDocument;
const geometryUri = gltf.buffers[0].uri;
if (!geometryUri) throw new Error("Exported geometry has no embedded buffer");
const geometry = Buffer.from(geometryUri.split(",")[1], "base64");
gltf.images = [{ uri: "textures/workstation01.png" }];
gltf.samplers = [{ magFilter: 9729, minFilter: 9987, wrapS: 33071, wrapT: 33071 }];
gltf.textures = [{ source: 0, sampler: 0 }];
gltf.materials[0].pbrMetallicRoughness.baseColorTexture = { index: 0 };
await mkdir(path.join(output, "textures"), { recursive: true });
await writeFile(path.join(output, "textures/workstation01.png"), image);

const embedded = structuredClone(gltf);
delete embedded.buffers[0].uri;
const paddedGeometry = Buffer.concat([geometry, Buffer.alloc((4 - geometry.length % 4) % 4)]);
embedded.bufferViews.push({ buffer: 0, byteOffset: paddedGeometry.length, byteLength: image.length });
embedded.images = [{ bufferView: embedded.bufferViews.length - 1, mimeType: "image/png" }];
const binary = Buffer.concat([paddedGeometry, image, Buffer.alloc((4 - image.length % 4) % 4)]);
embedded.buffers[0].byteLength = binary.length;
const json = Buffer.from(JSON.stringify(embedded));
const jsonChunk = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 0x20)]);
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + binary.length, 8);
const chunk = (data: Buffer, type: number) => {
  const prefix = Buffer.alloc(8);
  prefix.writeUInt32LE(data.length, 0);
  prefix.writeUInt32LE(type, 4);
  return Buffer.concat([prefix, data]);
};
await writeFile(path.join(output, "scene.glb"), Buffer.concat([
  header, chunk(jsonChunk, 0x4e4f534a), chunk(binary, 0x004e4942),
]));
await writeFile(path.join(output, "README.txt"), [
  "Workstation01 - full PNG image on a flat plane",
  "The complete original image is preserved without cropping or added geometry.",
  "This is a flat image packaged in a 3D format, not a volumetric reconstruction.",
  "scene.glb: self-contained plane geometry, unlit material and original PNG.",
  "textures/workstation01.png: original image used as the loading preview.",
  "Only workstation01 assets are retained; obsolete desktop models were removed.",
  "Regenerate from the monorepo root: npm run generate:workstation -- /absolute/path/to/workstation01.png",
  "Source image rights remain with their respective owner.",
  "",
].join("\n"));
console.log(`Created full-image plane (${width} x ${height}) in ${output}`);

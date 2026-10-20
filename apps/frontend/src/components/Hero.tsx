import { useRef, type PointerEvent } from "react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || !sceneRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    const scene = sceneRef.current;

    scene.style.setProperty("--scene-tilt-x", `${-y * 1.2}deg`);
    scene.style.setProperty("--scene-tilt-y", `${x * 1.5}deg`);
    scene.style.setProperty("--scene-shift-x", `${x * 8}px`);
    scene.style.setProperty("--scene-shift-y", `${y * 6}px`);
  };

  const resetPointer = () => {
    if (!sceneRef.current) return;

    sceneRef.current.style.setProperty("--scene-tilt-x", "0deg");
    sceneRef.current.style.setProperty("--scene-tilt-y", "0deg");
    sceneRef.current.style.setProperty("--scene-shift-x", "0px");
    sceneRef.current.style.setProperty("--scene-shift-y", "0px");
  };

  return (
    <section
      className='hero-full-scene relative mx-auto w-full max-w-7xl overflow-hidden'
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className='hero-copy-shade pointer-events-none absolute inset-0 z-10' />

      <div className='relative z-20 w-full px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-28'>
        <div className='hero-copy flex w-full min-w-0 max-w-[585px] items-start gap-3 text-left'>
          <div className='mt-5 flex shrink-0 flex-col items-center'>
            <div className='h-5 w-5 rounded-full bg-[#915EFF]' />
            <div className='h-28 w-1 violet-gradient sm:h-40' />
          </div>

          <div className='hero-copy-text min-w-0 flex-1'>
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className='text-[#915EFF]'>Arpit</span>
            </h1>
            <p className='mt-5 text-[16px] font-normal leading-7 text-[#c3cde0]'>
              Connecting hardware and software through embedded systems, analog & digital electronics, wireless communication, and machine learning.
            </p>
          </div>
        </div>
      </div>

      <div className='hero-scene-float glb-scene-fade pointer-events-none relative z-0 mt-2 aspect-[3/2] w-full lg:absolute lg:left-[calc(6%+50px)] lg:top-[76px] lg:mt-0 lg:w-[94%]'>
        <div ref={sceneRef} className='hero-scene-tilt absolute inset-0'>
          <ComputersCanvas />
        </div>
      </div>

    </section>
  );
};

export default Hero;

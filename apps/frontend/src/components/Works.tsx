import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";

type Project = (typeof projects)[number];

const ProjectArchitecture = ({ project }: { project: Project }) => (
  <figure className='rounded-xl border border-[#915eff]/40 bg-primary p-4 sm:p-5'>
    <figcaption className='mb-5 font-bold text-secondary'>{project.workAreas ? "System Architecture & Stack" : "Engineering Flow"}</figcaption>
    <ol className='project-flow' aria-label={`${project.name} engineering flow`}>
      {project.flow.map((step, index) => (
        <li key={step.name} className='project-flow-step'>
          <div className='project-flow-block rounded-xl border border-[#915eff]/40 bg-tertiary p-4'>
            <span className='text-[12px] font-semibold text-[#62d9ff]'>0{index + 1}</span>
            <h3 className='mt-2 font-bold text-secondary'>{step.name}</h3>
            <p className='mt-2 text-[14px] leading-6 text-white'>{step.detail}</p>
          </div>
          {step.link && (
            <div className='project-flow-link text-[#62d9ff]'>
              <span className='text-[11px] leading-4'>{step.link}</span>
              <svg viewBox='0 0 60 16' fill='none' aria-hidden='true'>
                <path d='M1 8h56M51 2l6 6-6 6' stroke='currentColor' strokeWidth='1.5' />
              </svg>
            </div>
          )}
        </li>
      ))}
    </ol>
    {project.branches && (
      <div className='mt-5 border-t border-[#915eff]/30 pt-4'>
        <p className='mb-3 text-center text-[12px] text-[#62d9ff]'>Backend integration areas</p>
        <div className='grid gap-3 md:grid-cols-2'>
          {project.branches.map((branch) => (
            <div key={branch.name} className='rounded-xl border border-[#915eff]/40 bg-tertiary p-4'>
              <h3 className='font-bold text-secondary'>{branch.name}</h3>
              <p className='mt-2 text-[14px] leading-6 text-white'>{branch.detail}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </figure>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) throw new Error("Project dialog is not mounted");
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby='project-modal-title'
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
        }
      }}
      className='project-modal rounded-2xl border border-[#915eff]/40 bg-tertiary p-5 sm:p-8 text-white'
    >
      <div className='flex items-start justify-between gap-4'>
        <h2 id='project-modal-title' className='text-[24px] sm:text-[30px] font-bold'>{project.name}</h2>
        <button type='button' autoFocus onClick={onClose} className='project-focus shrink-0 rounded-lg border border-secondary/40 px-3 py-2 text-secondary'>
          Close
        </button>
      </div>
      <div className='mt-6 space-y-5 text-[15px] leading-7'>
        <div className='grid gap-4 md:grid-cols-2'>
          <section className='rounded-xl border border-[#915eff]/30 bg-primary p-4'>
            <h3 className='font-bold text-secondary'>Engineering Problem</h3>
            <p className='mt-2 text-[14px] leading-6'>{project.problem}</p>
          </section>
          <section className='rounded-xl border border-[#915eff]/30 bg-primary p-4'>
            <h3 className='font-bold text-secondary'>My Responsibility</h3>
            <p className='mt-2 text-[14px] leading-6'>{project.responsibility}</p>
          </section>
        </div>
        <ProjectArchitecture project={project} />
        {!project.workAreas && <section className='rounded-xl border border-[#915eff]/30 p-4'>
          <h3 className='font-bold text-secondary'>Design & Implementation Contributions</h3>
          <ul className='mt-3 grid gap-3 md:grid-cols-3'>
            {project.contributions.map((item) => (
              <li key={item} className='rounded-lg bg-primary p-3 text-[14px] leading-6'>{item}</li>
            ))}
          </ul>
        </section>}
        {project.workAreas && (
          <section aria-label='Engineering work coverage'>
            <h3 className='mb-3 font-bold text-secondary'>Design Decisions & Algorithms</h3>
            <div className='grid gap-3 md:grid-cols-2'>
              {project.workAreas.map((area) => (
                <section key={area.name} className='rounded-xl border border-[#915eff]/30 bg-primary p-4'>
                  <h4 className='font-bold text-secondary'>{area.name}</h4>
                  <p className='mt-2 text-[14px] leading-6'>{area.detail}</p>
                </section>
              ))}
            </div>
          </section>
        )}
        <div className='flex flex-wrap gap-2' aria-label='Technologies'>
          {project.technologies.map((technology) => (
            <span key={technology} className='rounded-full border border-[#915eff]/40 bg-primary px-3 py-1 text-[12px] text-[#62d9ff]'>{technology}</span>
          ))}
        </div>
        <section className='rounded-xl border-l-2 border-[#62d9ff] bg-primary p-4'>
          <h3 className='font-bold text-secondary'>Outcome</h3>
          <p className='mt-2 text-[14px] leading-6'>{project.outcome}</p>
        </section>
      </div>
    </dialog>,
    document.body,
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Research & engineering</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>
      <p className='mt-3 max-w-3xl text-secondary text-[17px] leading-[30px]'>
        Selected research and engineering projects.
      </p>
      <div className='mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project) => (
          <div key={project.name} className='min-w-0 rounded-[20px] green-pink-gradient p-[1px] shadow-card'>
          <button
            type='button'
            onClick={() => setSelectedProject(project)}
            aria-haspopup='dialog'
            aria-label={`View ${project.name} project overview`}
            className='project-focus group flex h-full w-full min-w-0 flex-col items-center gap-5 rounded-[20px] bg-tertiary p-6 text-center transition-colors hover:bg-[#251e43]'
          >
            <img src={project.icon} alt='' className='h-16 w-16 object-contain' />
            <h3 className='text-white font-bold text-[20px] leading-7'>{project.name}</h3>
            <p className='text-[14px] leading-6 text-secondary'>
              {project.description}
            </p>
            <span className='flex flex-wrap justify-center gap-2' aria-label='Featured technologies'>
              {(project.featuredTechnologies || project.technologies.slice(0, 3)).map((name) => (
                <span key={name} className='rounded-full bg-primary px-3 py-1 text-[12px] text-secondary'>{name}</span>
              ))}
            </span>
            <span className='mt-auto block pt-2 text-[13px] font-semibold text-[#62d9ff] group-hover:text-white'>View architecture &rarr;</span>
          </button>
          </div>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
};

export default SectionWrapper(Works, "projects");

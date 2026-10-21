import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import "./Works.css";

type Project = (typeof projects)[number];

const ProjectArchitecture = ({ project }: { project: Project }) => (
  <figure className="works__architecture">
    <figcaption className="works__architecture-title">{project.workAreas ? "System Architecture & Stack" : "Engineering Flow"}</figcaption>
    <ol className="works__flow" aria-label={`${project.name} engineering flow`}>
      {project.flow.map((step, index) => (
        <li key={step.name} className="works__flow-step">
          <div className="works__flow-block">
            <span className="works__step-number">0{index + 1}</span>
            <h3 className="works__step-title">{step.name}</h3>
            <p className="works__detail">{step.detail}</p>
          </div>
          {step.link && (
            <div className="works__flow-link">
              <span>{step.link}</span>
              <svg viewBox='0 0 60 16' fill='none' aria-hidden='true'>
                <path d='M1 8h56M51 2l6 6-6 6' stroke='currentColor' strokeWidth='1.5' />
              </svg>
            </div>
          )}
        </li>
      ))}
    </ol>
    {project.branches && (
      <div className="works__branches">
        <p className="works__branches-title">Backend integration areas</p>
        <div className="works__two-columns">
          {project.branches.map((branch) => (
            <div key={branch.name} className="works__flow-block">
              <h3 className="works__panel-title">{branch.name}</h3>
              <p className="works__detail">{branch.detail}</p>
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
    const alreadyLocked = document.body.classList.contains("project-dialog-open");
    dialog.showModal();
    document.body.classList.add("project-dialog-open");
    return () => {
      dialog.close();
      if (!alreadyLocked) document.body.classList.remove("project-dialog-open");
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
      className="works-modal"
    >
      <div className="works-modal__header">
        <h2 id='project-modal-title' className="works-modal__title">{project.name}</h2>
        <button type='button' autoFocus onClick={onClose} className="works-modal__close">
          Close
        </button>
      </div>
      <div className="works-modal__body">
        <div className="works__two-columns works__summary">
          <section className="works__panel">
            <h3 className="works__panel-title">Engineering Problem</h3>
            <p className="works__detail">{project.problem}</p>
          </section>
          <section className="works__panel">
            <h3 className="works__panel-title">My Responsibility</h3>
            <p className="works__detail">{project.responsibility}</p>
          </section>
        </div>
        <ProjectArchitecture project={project} />
        {!project.workAreas && <section className="works__contributions">
          <h3 className="works__panel-title">Design & Implementation Contributions</h3>
          <ul className="works__contribution-list">
            {project.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>}
        {project.workAreas && (
          <section aria-label='Engineering work coverage'>
            <h3 className="works__areas-title">Design Decisions & Algorithms</h3>
            <div className="works__two-columns">
              {project.workAreas.map((area) => (
                <section key={area.name} className="works__panel">
                  <h4 className="works__panel-title">{area.name}</h4>
                  <p className="works__detail">{area.detail}</p>
                </section>
              ))}
            </div>
          </section>
        )}
        <div className="works__technologies" aria-label='Technologies'>
          {project.technologies.map((technology) => (
            <span key={technology} className="works__technology">{technology}</span>
          ))}
        </div>
        <section className="works__outcome">
          <h3 className="works__panel-title">Outcome</h3>
          <p className="works__detail">{project.outcome}</p>
        </section>
      </div>
    </dialog>,
    document.body,
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="works">
      <header className="works__header">
        <p className="section-subheading">Research & engineering</p>
        <h2 className="section-heading">Projects.</h2>
      </header>
      <p className="works__description">
        Selected research and engineering projects.
      </p>
      <div className="works__grid">
        {projects.map((project) => (
          <div key={project.name} className="works__card-border">
          <button
            type='button'
            onClick={() => setSelectedProject(project)}
            aria-haspopup='dialog'
            aria-label={`View ${project.name} project overview`}
            className="works__card"
          >
            <img src={project.icon} alt='' className="works__icon" />
            <h3 className="works__card-title">{project.name}</h3>
            <p className="works__card-description">
              {project.description}
            </p>
            <span className="works__badges" aria-label='Featured technologies'>
              {(project.featuredTechnologies || project.technologies.slice(0, 3)).map((name) => (
                <span key={name} className="works__badge">{name}</span>
              ))}
            </span>
            <span className="works__view">View architecture &rarr;</span>
          </button>
          </div>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default SectionWrapper(Works, "projects");

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { employer, experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }: { experience: (typeof experiences)[number] }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt=''
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.focus}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => {
          const label = point.match(/^(Responsibility|Research|Design contribution|Technologies|Achievement):/);
          return (
          <li
            key={`experience-point-${index}`}
            className='text-white text-[14px] leading-6 pl-1 tracking-wide'
          >
            {label ? (
              <>
                <strong className='font-bold text-secondary'>{label[0]}</strong>
                {point.slice(label[0].length)}
              </>
            ) : point}
          </li>
          );
        })}
      </ul>
      <div className='mt-5 flex justify-end'>
        <a
          href={employer.url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${employer.name} (opens in a new tab)`}
          className='inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#62d9ff]'
        >
          <img
            src={employer.logo}
            alt='Medtronic'
            width={53}
            height={56}
            loading='lazy'
            className='h-14 w-[53px] object-contain'
          />
        </a>
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline layout='2-columns' className='experience-timeline'>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");

import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ title, icon, technologies }: (typeof services)[number]) => (
  <Tilt className='h-full min-w-0 w-full' options={{ max: 45, scale: 1, speed: 450 }}>
    <motion.div
      variants={fadeIn("up", "spring", 0, 0.75)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.1 }}
      className='h-full w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-5 h-full min-h-[360px] flex items-center flex-col gap-5'
      >
        <img
          src={icon}
          alt=''
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
        <ul className='flex flex-wrap justify-center gap-2' aria-label={`${title} technologies`}>
          {technologies.map((technology) => (
            <li key={technology} className='rounded-full bg-primary px-3 py-1 text-[12px] text-secondary'>
              {technology.trim()}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "tween", 0.1, 1)}
        className='mt-4 w-full max-w-3xl text-secondary text-[19px] leading-[32px] sm:text-[21px] sm:leading-[36px]'
      >
        I build intelligent embedded systems by connecting electronics, physics, low level programming,
        wireless communication, and machine learning.
        My work spans C/C++, Rust, Linux Drivers/Yocto Project, real-time device interactions, signal processing,
        and computer Vision application - with a focus on understanding complex problem statement, translate to user need and turning them into reliable engineering solutions.
      </motion.p>

      <div className='mt-20 grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");

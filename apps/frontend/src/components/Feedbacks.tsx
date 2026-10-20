import React from "react";
import { SectionWrapper } from "../hoc";

const Feedbacks = () => (
  <div className='galileo-card w-full min-w-0 rounded-3xl border border-white/10 p-6 sm:p-10'>
    <figure className='min-w-0'>
      <span className='text-[64px] font-black leading-none text-[#a781ff]' aria-hidden='true'>&ldquo;</span>
      <blockquote className='mt-2 text-[22px] font-medium leading-relaxed tracking-wide text-white sm:text-[28px]'>
        [The universe] cannot be read until we have learnt the language and become familiar with the characters in which it is written. It is written in mathematical language
      </blockquote>
      <figcaption className='mt-8 flex items-center gap-4 text-[16px] font-medium text-white'>
        <img
          src='https://commons.wikimedia.org/wiki/Special:FilePath/Galileo_Galilei_2.jpg?width=160'
          alt='Portrait of Galileo Galilei'
          loading='lazy'
          width={64}
          height={64}
          className='h-16 w-16 shrink-0 rounded-full border border-[#915eff]/40 object-cover object-top'
        />
        <span>
          Galileo Galilei
          <span className='mt-1 block text-[12px] text-secondary'>Attributed quotation</span>
        </span>
      </figcaption>
    </figure>

  </div>
);

export default SectionWrapper(Feedbacks, "");

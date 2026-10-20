import { motion } from "framer-motion";
import type { ComponentType } from "react";

import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component: ComponentType, idName: string) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: "some", margin: "0px 0px -80px 0px" }}
        className='relative z-0 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8'
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;

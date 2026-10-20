import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const CONTACT_EMAIL = "arpit181001002080@gmail.com";

const Contact = () => (
  <div className='overflow-hidden'>
    <motion.div
      variants={slideIn("left", "tween", 0.2, 1)}
      className='contact-panel overflow-hidden rounded-3xl border border-white/10 bg-black-100'
    >
      <div className='contact-intro p-6 sm:p-10'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} mt-2`}>Let's talk.</h3>
        <p className='mt-5 max-w-xl text-[16px] leading-7 text-secondary'>
          Have an engineering problem, a project idea, or a question about my work? I'd like to hear from you.
        </p>
        <div className='mt-9'>
          <p className='mb-3 text-xs font-medium uppercase tracking-widest text-secondary'>Email me directly</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className='contact-email inline-block max-w-full break-all text-[15px] font-medium text-[#c4adff] underline decoration-[#915eff]/40 underline-offset-4 sm:text-[17px]'
          >
            {CONTACT_EMAIL}
          </a>
          <p className='mt-5 text-sm leading-6 text-secondary'>Embedded systems / Software / Applied research</p>
        </div>
      </div>
    </motion.div>
  </div>
);

export default SectionWrapper(Contact, "contact");

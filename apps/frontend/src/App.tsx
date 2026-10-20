import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='hero-backdrop'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Works />
        <div className='relative z-0'>
          <Feedbacks />
          <StarsCanvas />
        </div>
        <Contact />
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, StarsCanvas } from "./components";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className='portfolio'>
        <div className='portfolio__hero'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Works />
        <div className='portfolio__quotation'>
          <Feedbacks />
          <StarsCanvas />
        </div>
        <Contact />
      </div>
    </BrowserRouter>
  );
}

export default App;

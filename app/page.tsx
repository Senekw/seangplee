import Hero from "@/components/sections/Hero";
import Sutura from "@/components/sections/Sutura";
import Research from "@/components/sections/Research";
import Experience from "@/components/sections/Experience";
import Record from "@/components/sections/Record";
import Brain from "@/components/sections/Brain";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Community from "@/components/sections/Community";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <div className="panels">
        <Sutura />
        <Research />
        <Experience />
        <Record />
        <Brain />
        <About />
        <Skills />
        <Community />
        <Contact />
      </div>
    </main>
  );
}

import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Start from "@/components/start";
import HeroSkillsGlobe from "@/components/start/HeroSkillsGlobe";
import { getAudioTracks } from "@/lib/audioTracks";

export default async function Portfolio() {
  const tracks = await getAudioTracks();

  return (
    <main className="portfolio-section-bg w-full">
      <div className="relative isolate overflow-hidden">
        <section id="home" className="relative z-10 w-full">
          <Start tracks={tracks} />
        </section>
        <HeroSkillsGlobe />
        <section id="skills" className="relative z-10 w-full">
          <Skills />
        </section>
      </div>
      <section id="experience" className="w-full">
        <Experience />
      </section>
      <section id="projects" className="w-full">
        <Projects />
      </section>
      <section id="contact" className="w-full">
        <Contact />
      </section>
    </main>
  );
}

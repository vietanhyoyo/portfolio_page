import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Start from "@/components/start";

type Props = {
  params: { locale: string };
};

export default function Portfolio({ params: { locale } }: Props) {
  return (
    <main className="w-full">
      <section id="home" className="w-full">
        <Start />
      </section>
      <section id="skills" className="w-full">
        <Skills />
      </section>
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

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
    <main>
      <section id="home">
        <Start />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}

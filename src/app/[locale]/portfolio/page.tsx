import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Start from "@/components/start";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { getAudioTracks } from "@/lib/audioTracks";

type Props = {
  params: { locale: string };
};

export default async function Portfolio({ params: { locale } }: Props) {
  const tracks = await getAudioTracks();

  return (
    <main className="w-full">
      <section id="home" className="w-full">
        <Start />
      </section>
      <AudioPlayer tracks={tracks} />
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

import Reveal from "../animation/Reveal";
import CompanyInfo from "./CompanyInfo";
import ProjectItem from "./ProjectItem";

const Divider = () => {
  return (
    <div className="flex justify-start flex-col items-center">
      <div className="w-7 h-7 bg-primary rounded-full items-center flex justify-center">
        <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full  items-center flex justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
      <div className="mt-1 flex-1 w-1 bg-primary rounded-full"></div>
    </div>
  );
};

export default function Experience() {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0">
        <Reveal>
          <div className="text-6xl font-bold dark:text-white text-primary mb-6">
            Experience
          </div>
        </Reveal>
        <Reveal>
          <div className="w-96 h-2 bg-primary rounded-full mb-8"></div>
        </Reveal>
        <div className="w-full mb-5">
          <div className="flex">
            <Divider />
            <div className="leading-7 ml-5">
              <CompanyInfo
                date="01/09/2022 - 31/03/2024"
                company="Viet Nam Hi-Tech Engineering Company"
              />
              <ProjectItem
                title="Banana disease analysis project"
                technicals={["flutter", "figma"]}
                descriptions={[
                  "- I participate in improving the application, integrate Google Map into searching for diseased crop areas, process analytical data on UI",
                  "- I design a new UI with Figma to upgrade the UI for the app",
                ]}
              />
              <ProjectItem
                title="Mother and baby health care project"
                technicals={["flutter", "getx"]}
                descriptions={[
                  "- I build the interface based on the Figma design and integrate API",
                ]}
              />
              <ProjectItem
                title="Diary management project"
                technicals={["flutter", "getx", "ruby on rails"]}
                descriptions={[
                  "- I am responsible for managing, assigning tasks and rev iewing code for team members",
                  "- I build the interface based on the Figma design and integrate API, handle video uploads, handle notification",
                  "- I participate in writing some APIs in the backend with Ruby on Rails",
                ]}
              />
              <ProjectItem
                title="Asset management project"
                technicals={["vuejs", "element plus"]}
                descriptions={[
                  "- I build the interface based on the Figma design and integrate API",
                ]}
              />
            </div>
          </div>
        </div>
        <div className="w-full mb-5">
          <div className="flex">
            <Divider />
            <div className="leading-7 ml-5">
              <CompanyInfo
                date="05/2022 - 30/07/2022"
                company="Maysoft Company"
              />
              <ProjectItem
                title="Web and Mobile App development for
                incident management project"
                technicals={["react", "react native", "mui"]}
                descriptions={[
                  "- I build the interface based on the Figma design and integrate API",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

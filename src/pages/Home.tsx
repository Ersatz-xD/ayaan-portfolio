import Hero from "../components/hero/Hero";
import EducationView from "../components/views/EducationView";
import ExperienceView from "../components/views/ExperienceView";
import ProjectsView from "../components/views/ProjectsView";
import ServicesView from "../components/views/ServicesView";
import FeaturedCredentials from "../components/views/FeaturedCredentials";

export default function Home() {
  return (
    <>
      <Hero />
      <EducationView />
      <ExperienceView />
      <ProjectsView />
      <ServicesView />
      <FeaturedCredentials />
    </>
  );
}
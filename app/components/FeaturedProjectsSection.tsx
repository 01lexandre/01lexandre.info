import { getProjectMetadata } from "../lib/metadata";
import FeaturedProject from "./FeaturedProject";
import AnimatedProjectWrapper from "./AnimatedProjectWrapper";

interface Project {
  url: string;
  status?: "ACTIVE" | "DEVELOPMENT" | "FINISHED";
}

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export default async function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  // Buscar todos os metadados em paralelo
  const projectsWithMetadata = await Promise.all(
    projects.map(async (project) => {
      const metadata = await getProjectMetadata(project.url);
      return {
        ...project,
        metadata,
      };
    })
  );

  return (
    <div className="flex flex-col gap-4">
      {projectsWithMetadata.map((project, index) => (
        <AnimatedProjectWrapper key={project.url} delay={0.45 + index * 0.1}>
          <FeaturedProject
            url={project.url}
            status={project.status}
            metadata={project.metadata}
          />
        </AnimatedProjectWrapper>
      ))}
    </div>
  );
}


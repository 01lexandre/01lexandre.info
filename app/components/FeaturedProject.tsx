import ProjectFavicon from "./ProjectFavicon";

interface ProjectMetadata {
  title: string;
  description: string;
  favicon: string | null;
}

interface FeaturedProjectProps {
  url: string;
  status?: "ACTIVE" | "DEVELOPMENT" | "FINISHED";
  metadata: ProjectMetadata;
}

export default function FeaturedProject({
  url,
  status,
  metadata,
}: FeaturedProjectProps) {
  const statusColors = {
    ACTIVE: "bg-purple-600 text-zinc-100",
    DEVELOPMENT: "bg-yellow-500 text-black",
    FINISHED: "bg-green-600 text-zinc-100",
  };

  const displayTitle = metadata?.title || "Untitled";
  const displayDescription = metadata?.description || "No description available";
  const displayFavicon = metadata?.favicon;

  return (
    <a
      href={url+"?utm_source=01lexandre.info"}
      target="_blank"
      className="group flex items-center justify-between w-full py-3 hover:opacity-80 hover:scale-[1.02] transition-all duration-200"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-zinc-200 font-medium truncate">{displayTitle}</h3>
          {status && (
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${statusColors[status]}`}
            >
              {status}
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2">{displayDescription}</p>
      </div>
      <div className="flex items-center gap-2 ml-4 shrink-0">
        <div className="w-8 border-t border-dashed border-zinc-700"></div>
        <ProjectFavicon favicon={displayFavicon} title={displayTitle} />
      </div>
    </a>
  );
}


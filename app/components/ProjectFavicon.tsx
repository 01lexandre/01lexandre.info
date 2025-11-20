"use client";

import { useState } from "react";

interface ProjectFaviconProps {
  favicon: string | null;
  title: string;
}

export default function ProjectFavicon({ favicon, title }: ProjectFaviconProps) {
  const [faviconError, setFaviconError] = useState(false);

  return (
    <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 overflow-hidden bg-transparent">
      {favicon && !faviconError ? (
        <img
          src={favicon}
          alt=""
          className="w-full h-full object-cover rounded"
          onError={() => setFaviconError(true)}
        />
      ) : (
        <span className="text-zinc-300 font-bold text-sm">
          {title.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}


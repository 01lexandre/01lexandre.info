import { cache } from "react";

interface ProjectMetadata {
  title: string;
  description: string;
  favicon: string | null;
}

export const getProjectMetadata = cache(async (url: string): Promise<ProjectMetadata> => {
  try {
    // Usar cache do Next.js 16 - cache por 7 dias (604800 segundos)
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 604800 }, // Cache por 7 dias
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Extrair título
    const titleMatch =
      html.match(/<title[^>]*>([^<]+)<\/title>/i) ||
      html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i);
    const title = titleMatch ? titleMatch[1].trim() : "Untitled";

    // Extrair descrição
    const descriptionMatch =
      html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i);
    const description = descriptionMatch
      ? descriptionMatch[1].trim()
      : "No description available";

    // Extrair favicon
    const faviconMatch =
      html.match(/<link[^>]*rel=["'](?:shortcut\s+)?icon["'][^>]*href=["']([^"']+)["']/i) ||
      html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:shortcut\s+)?icon["']/i) ||
      html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

    let favicon = faviconMatch ? faviconMatch[1].trim() : null;

    // Se o favicon é relativo, tornar absoluto
    if (favicon && !favicon.startsWith("http")) {
      const urlObj = new URL(url);
      if (favicon.startsWith("//")) {
        favicon = `${urlObj.protocol}${favicon}`;
      } else if (favicon.startsWith("/")) {
        favicon = `${urlObj.protocol}//${urlObj.host}${favicon}`;
      } else {
        favicon = `${urlObj.protocol}//${urlObj.host}/${favicon}`;
      }
    }

    // Se não encontrou favicon, usar o padrão
    if (!favicon) {
      const urlObj = new URL(url);
      favicon = `${urlObj.protocol}//${urlObj.host}/favicon.ico`;
    }

    return {
      title,
      description,
      favicon,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Untitled",
      description: "No description available",
      favicon: null,
    };
  }
});


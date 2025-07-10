import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";
  
  const encodedTag = encodeURIComponent(tag);
  
  
  const getDescription = (tagName: string) => {
    if (tagName === "All") {
      return "Browse and manage all your notes in one convenient location using NoteHub";
    }
    return `Browse and manage your ${tagName.toLowerCase()} notes in NoteHub`;
  };

  const getTitle = (tagName: string) => {
    if (tagName === "All") {
      return "All Notes | NoteHub";
    }
    return `${tagName} Notes | NoteHub`;
  };

  return {
    title: getTitle(tag),
    description: getDescription(tag),
    openGraph: {
      title: getTitle(tag),
      description: getDescription(tag),
      url: `https://notehub.com/notes/filter/${encodedTag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub ${tag} Notes`,
        },
      ],
      type: "website",
    },
  };
}

export default async function NotesByTagPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";
  const tagParam = tag === "All" ? undefined : tag;

  const initialNotes = await fetchNotes(undefined, 1, tagParam);
  return <NotesClient initialNotes={initialNotes} tag={tag} />;
}

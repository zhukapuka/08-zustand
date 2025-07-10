import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "./NoteDetails.client";
import styles from "./NoteDetails.module.css";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const noteId = resolvedParams.id;
  const note = await fetchNoteById(noteId);

  return {
    title: `${note.title} | NoteHub`,
    description:
      note.content.substring(0, 160) +
      (note.content.length > 160 ? "..." : ""),
    openGraph: {
      title: `${note.title} | NoteHub`,
      description:
        note.content.substring(0, 160) +
        (note.content.length > 160 ? "..." : ""),
      url: `https://notehub.com/notes/${noteId}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${note.title}`,
        },
      ],
      type: "article",
    },
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const resolvedParams = await params;
  const noteId = resolvedParams.id;

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <div className={styles.item}>
          <NoteDetails noteId={noteId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}

"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}



function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  if (!notes.length) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <div className={css.footerLeft}>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <div className={css.footerRight}>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                onClick={() => handleDelete(note.id.toString())}
                className={css.button}
                disabled={
                  mutation.isPending &&
                  mutation.variables === note.id.toString()
                }
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

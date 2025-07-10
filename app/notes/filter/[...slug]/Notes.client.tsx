"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./NotesPage.module.css";

interface NotesClientProps {
  initialNotes: FetchNotesResponse;
  tag: string;
}

export default function NotesClient({ initialNotes, tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const tagParam = tag === "All" ? undefined : tag;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notes", page, tagParam, debouncedSearchQuery],
    queryFn: () => fetchNotes(debouncedSearchQuery, page, tagParam),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
    retry: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const showLoading = isLoading && !data?.notes;

  return (
    <div>
      <div className={styles.toolbar}>
        <h1>Notes</h1>
        <div className={styles.toolbarRight}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
          <Link href="/notes/action/create" className={styles.button}>
            Create New Note
          </Link>
        </div>
      </div>

      {showLoading ? (
        <p>Loading...</p>
      ) : data?.notes !== undefined ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}

      {isFetching && data?.notes && (
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Updating...
        </div>
      )}
    </div>
  );
}

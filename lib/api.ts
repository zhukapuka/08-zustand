import axios from "axios";
import { Note, CreateNoteRequest } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseURL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  query?: string,
  page: number = 1,
  tag?: string
): Promise<FetchNotesResponse> => {
  try {
    const params: { page: string; tag?: string; search?: string } = {
      page: page.toString(),
    };
    if (tag && tag !== "All") params.tag = tag;
    if (query && query.trim() !== "") params.search = query;
    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch note");
  }
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  try {
    const response = await api.post<Note>("/notes", note);
    return response.data;
  } catch {
    throw new Error("Failed to create note");
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to delete note");
  }
}

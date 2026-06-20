import { User } from "@/types/user";
import api from "./api";
import { cookies } from "next/headers";
import { Note } from "@/types/note";

type CheckSessionRequest = {
  success: boolean;
};

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async (
  searchTerm?: string,
  page: number = 1,
  perPage: number = 12,
  tag?: string,
) => {
  const cookieStore = await cookies();
  const response = await api.get<HTTPResponse>("/notes", {
    headers: { Cookie: cookieStore.toString() },
    params: {
      search: searchTerm?.trim() || undefined,
      page,
      perPage,
      tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
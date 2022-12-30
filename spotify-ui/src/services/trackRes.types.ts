import { Track } from "../constants/types/track";

export type SavedTracksRes = {
  href: string;
  items: Array<Track>;
  limit: number;
  message?: string;
  next: null | string;
  offset: number;
  previous: null | string;
  total: number;
  status?: number;
}
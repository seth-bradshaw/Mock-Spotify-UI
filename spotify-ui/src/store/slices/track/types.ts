import { Track } from "../../../constants/types/track";

export type SavedTracks = {
  tracks: Array<Track>;
  offset: number; // * index of the next request start point
  total: number;
  limit: number; // * amount per request
}

export type TrackState = {
  savedTracks: SavedTracks;
  activeTrack: Track | null;
  status: string;
  error: null | string | { message: string };
}
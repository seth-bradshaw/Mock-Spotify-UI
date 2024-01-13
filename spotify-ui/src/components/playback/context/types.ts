export type PlaybackEventCallback = {
  device_id: string;
};

// TODO get rid of this attrocity
export type AnyObj = { [key: string]: any };

export type PlayerContext = {
  uri: string; // * context uri, e.g. spotify:{album, track}:xxxxx
  metadata?: {[key: string]: any} | null; // * Additional metadata for the context (contains undocumented properties, or can be null)
}

export type PlayerDisallows = {
  pausing: boolean;
  peeking_next: boolean;
  peeking_prev: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
}
export enum TrackType {
  Track = 'track',
  Episode = 'episode',
  Ad = 'ad'
}
export enum MediaType {
  Audio = 'audio',
  Video = 'video'
}

export interface Artists { 
  uri: string; // * artist uri, e.g. artist:album:xxxxx 
  name: string;
}

export interface Album {
  uri: string; // * album uri, e.g. spotify:album:xxxxx
  name: string;
  images: Array<{ url: string}>
}

export type WebPlaybackTrack = {
  uri: string; // * track URI, e.g. spotify:track:xxxx
  id: string | null;
  type: TrackType;
  media_type: MediaType;
  name: string;
  is_playable: boolean;
  album: Album
  artists: Array<Artists>
}

export type TrackWindow = {
  current_track: WebPlaybackTrack;
  previous_tracks: Array<WebPlaybackTrack>;
  next_tracks: Array<WebPlaybackTrack>;
}

export type PlayerState = {
  duration: number;
  context: PlayerContext;
  disallows: PlayerDisallows;
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  track_window: TrackWindow;
}
import { Artist } from "./artist";
import { AvailableMarkets, ExternalUrls } from "./common";

interface Image {
  height: number;
  url: string;
  width: number;
}
type Album = {
  album_type: string;
  artists: Array<Artist>;
  available_markets: AvailableMarkets;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Array<Image>
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

type TrackDetails = {
  album: Album;
  artists: Array<Artist>;
  available_markets: AvailableMarkets;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  externalIds: ExternalUrls;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export type Track = {
  added_at: string;
  track: TrackDetails;
}

import { Artists } from "../../components/playback/context/types";
import { ExternalUrls } from "./common";

type Followers = {
  href: string;
  total: number
}
export interface Artist extends Artists {
  type: string;
  id: string;
  href: string;
  external_urls: ExternalUrls;
  followers?: Followers;
  genres?: Array<String>;
  images?: Array<{url: string; height: number; width: number;}>
  popularity?: number;
}
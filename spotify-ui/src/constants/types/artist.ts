import { Artists } from "../../components/playback/context/types";
import { ExternalUrls } from "./common";

export interface Artist extends Artists {
  type: string;
  id: string;
  href: string;
  external_urls: ExternalUrls;
}
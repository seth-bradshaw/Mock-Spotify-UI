import { Artist } from "../../../constants/types/artist";

export type SavedArtists = {
    artists: Array<Artist>;
    after: string; // * request start index
    limit: number; // * response size
}

export interface ActiveArtist extends Artist {
    albums: any;
    topTracks: any;
}

export type ArtistState = {
    savedArtists: SavedArtists;
    activeArtist: ActiveArtist | null;
    status: string;
    error: null | string | { message: string }
}
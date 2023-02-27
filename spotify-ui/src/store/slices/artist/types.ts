import { Artist } from "../../../constants/types/artist";

export type SavedArtists = {
    artists: Array<Artist>;
    after: string; // * request start index
    limit: number; // * response size
}

export type ArtistState = {
    savedArtists: SavedArtists;
    activeArtist: Artist | null;
    status: string;
    error: null | string | { message: string }
}
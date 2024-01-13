import { Artist } from "../constants/types/artist";

type Cursors = { after: string; before: string;}

export type FollowedArtistResponse = {
    artists: {
        href: string;
        limit: number;
        next: string;
        cursors: Cursors;
        total: number;
        items: Array<Artist>;
    }
    message?: string;
    status?: number;
}
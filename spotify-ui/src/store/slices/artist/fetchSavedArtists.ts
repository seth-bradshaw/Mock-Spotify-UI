import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFollowedArtists } from "../../../services";
import { FollowedArtistResponse } from "../../../services/followedArtists.types";
import { ArtistState } from "./types";

const fetchFollowedArtists = createAsyncThunk<FollowedArtistResponse, { after?: string | undefined, limit?: number | null}, { rejectValue: { message: string } | string }>('artist/followed', async (args, thunkApi) => {
    const { artist } = thunkApi.getState() as { artist: ArtistState };

    const after = args?.after ?? artist.savedArtists.after

    const response: FollowedArtistResponse = await getUserFollowedArtists(args.limit ?? artist.savedArtists.limit, after);

    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get followed Artists')
    }

    return response;
})

export default fetchFollowedArtists;

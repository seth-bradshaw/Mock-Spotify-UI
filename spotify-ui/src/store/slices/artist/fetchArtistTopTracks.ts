import { createAsyncThunk } from "@reduxjs/toolkit";
import { getArtistTopTracks } from "../../../services";

// TODO update to proper res type
const fetchArtistTopTracks = createAsyncThunk<any, string, { rejectValue: { message: string } | string }>('artist/top-tracks', async (id, thunkApi) => {
    const response: any = await getArtistTopTracks(id);

    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get followed Artists')
    }

    return response;
})

export default fetchArtistTopTracks;
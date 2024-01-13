import { createAsyncThunk } from "@reduxjs/toolkit";
import { getArtistAlbums } from "../../../services";

// TODO update to proper res type
const fetchArtistAlbums = createAsyncThunk<any, string, { rejectValue: { message: string } | string }>('artist/albums', async (id, thunkApi) => {
    const response: any = await getArtistAlbums(id);

    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get followed Artists')
    }

    return response;
})

export default fetchArtistAlbums;
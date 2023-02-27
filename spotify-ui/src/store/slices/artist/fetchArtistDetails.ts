import { createAsyncThunk } from "@reduxjs/toolkit";
import { Artist } from "../../../constants/types/artist";
import { extractId, getArtistDetails } from "../../../services";

export interface ArtistDetailsRes extends Artist {
    status?: string;
    message?: string;
}

const fetchArtistDetails = createAsyncThunk<ArtistDetailsRes, string, { rejectValue: { message: string } | string }>('artist/details', async (id, thunkApi) => {

    const response: ArtistDetailsRes = await getArtistDetails(id);

    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get followed Artists')
    }

    return response;
})

export default fetchArtistDetails;

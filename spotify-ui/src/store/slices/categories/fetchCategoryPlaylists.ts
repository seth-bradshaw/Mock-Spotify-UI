import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoryPlaylists as fetchPlaylists } from "../../../services";

const fetchCategoryPlaylists = createAsyncThunk<any, string, { rejectValue: { message: string } | string }>('category/playlists', async (id, thunkApi) => {

    const response = await fetchPlaylists(id);
    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get category playlists')
    }
    response.playlists.categoryId = id
    return response.playlists;
})

export default fetchCategoryPlaylists;
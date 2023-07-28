import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoryPlaylists as fetchPlaylists } from "../../../services";

const fetchCategoryPlaylists = createAsyncThunk<any, { id: string, offset: number, limit: number }, { rejectValue: { message: string } | string }>('category/playlists', async ({ id, offset, limit }, thunkApi) => {

    const response = await fetchPlaylists(id, offset, limit);
    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get category playlists')
    }
    response.playlists.categoryId = id
    return response.playlists;
})

export default fetchCategoryPlaylists;
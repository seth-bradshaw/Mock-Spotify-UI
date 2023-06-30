import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrowseCategories } from "../../../services";

const fetchCategories = createAsyncThunk<any, { after?: string | undefined, limit?: number | null}, { rejectValue: { message: string } | string }>('category/all', async (args, thunkApi) => {
    const { artist } = thunkApi.getState() as any;

    const response = await fetchBrowseCategories();
    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get categories')
    }

    return response.categories;
})

export default fetchCategories;
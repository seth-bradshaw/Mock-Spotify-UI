import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrowseCategories } from "../../../services";

const fetchCategories = createAsyncThunk<any, { offset?: number | undefined, limit?: number | null}, { rejectValue: { message: string } | string }>('category/all', async (args, thunkApi) => {
    const response = await fetchBrowseCategories(args?.offset, args?.limit);
    if (response?.status ?? 200 >= 400) {
        return thunkApi.rejectWithValue(response?.message ?? 'Failed to get categories')
    }

    return response.categories;
})

export default fetchCategories;
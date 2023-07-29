import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAlbumDetails as fetchDetails } from "../../../services";

const fetchAlbumDetails = createAsyncThunk<any, string, { rejectValue: { message: string } | string }>('albums/fetchDetails', async (id, thunkApi) => {
  const response = await fetchDetails(id);

  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get album details');
  }
  return response;
});

export default fetchAlbumDetails;
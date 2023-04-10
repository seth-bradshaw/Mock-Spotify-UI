import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPlaylistDetails } from "../../../services";

const fetchPlaylistDetails = createAsyncThunk<any, string, { rejectValue: { message: string } | string }>('playlists/fetchDetails', async (id, thunkApi) => {
  const response = await getPlaylistDetails(id);

  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get playlist details');
  }

  return response;
});

export default fetchPlaylistDetails;
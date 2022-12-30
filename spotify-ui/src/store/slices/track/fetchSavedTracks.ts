import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSavedTracks } from "../../../services";
import { SavedTracksRes } from "../../../services/trackRes.types";


const fetchSavedTracks = createAsyncThunk<SavedTracksRes, undefined, { rejectValue: { message: string } | string }>('track/fetchSaved', async (_, thunkApi) => {
  const response = await getUserSavedTracks();
  
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get saved tracks');
  }
  return response;
});

export default fetchSavedTracks;
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserProfile, ProfileResponse } from "../../../services";

const fetchSpotifyProfile = createAsyncThunk<ProfileResponse, any, { rejectValue: { message: string } | string }>('user/fetch_spotify_profile', async (_, thunkApi) => {
  const response: ProfileResponse = await getCurrentUserProfile();
  
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get user spotify profile');
  }
  return response;
});

export default fetchSpotifyProfile;
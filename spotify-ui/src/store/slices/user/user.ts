import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";
import fetchSpotifyProfile from "./fetchSpotifyProfile";

const initialState: UserState = {
  spotify_profile: null,
  status: "",
  error: null,
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpotifyProfile.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchSpotifyProfile.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.spotify_profile = payload
      state.status = "idle";
    });

    builder.addCase(fetchSpotifyProfile.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

export default trackSlice.reducer;

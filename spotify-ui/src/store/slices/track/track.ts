import { createSlice } from "@reduxjs/toolkit";
import { TrackState } from "./types";
import fetchSavedTracks from "./fetchSavedTracks";

const initialState: TrackState = {
  savedTracks: { 
    tracks: [],
    offset: 0, 
    total: 0,
    limit: 20 // * default req size to 20
  },
  activeTrack: null,
  status: '',
  error: ''
}


export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    updateTrack: (state, action) => {
      state.activeTrack = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSavedTracks.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })

    builder.addCase(fetchSavedTracks.fulfilled, (state, { payload }) => {
      state.savedTracks = { tracks: [ ...state.savedTracks.tracks, ...payload.items ], offset: payload.offset, limit: payload.limit, total: payload.total };
      state.status = 'idle'
    })

    builder.addCase(fetchSavedTracks.rejected, (state, { payload }) => {
      if (payload) state.error = payload
      state.status = 'idle'
    })
  }
})

export const { updateTrack } = trackSlice.actions;

export default trackSlice.reducer;

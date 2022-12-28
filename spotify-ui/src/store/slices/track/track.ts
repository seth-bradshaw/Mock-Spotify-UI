import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSavedTracks } from "../../../services";
import { TrackState, Track } from "./types";

const initialState: TrackState = {
  savedTracks: { tracks: [] },
  activeTrack: null,
  status: '',
  error: ''
}

export type SavedTracksRes = {
  href: string;
  items: Array<Track>;
  limit: number;
  message?: string;
  next: null | string;
  offset: number;
  previous: null | string;
  total: number;
  status?: number;
}

export const fetchSavedTracks = createAsyncThunk<SavedTracksRes, undefined, { rejectValue: { message: string } | string }>('track/fetchSaved', async (_, thunkApi) => {
  const response = await getUserSavedTracks();
  
  console.log('status', { response})
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get saved songs');
  }
  return response;
})

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

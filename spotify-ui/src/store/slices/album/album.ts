import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SavedTracksRes } from "../../../services/trackRes.types";
import fetchSavedAlbums from "./fetchSavedAlbums";
import { AlbumState } from "./types";
import fetchAlbumDetails from "./fetchAlbumDetails";
import fetchAlbumTracks from "./fetchAlbumTracks";

const initialState: AlbumState = {
  savedAlbums: {
    albums: [],
    offset: 0,
    total: 0,
    limit: 20, // * default req size to 20
  },
  activeAlbum: {},
  status: "",
  error: null,
};

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    updateActiveAlbum: (state, action) => {
      state.activeAlbum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSavedAlbums.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchSavedAlbums.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.savedAlbums = {
        albums: state.savedAlbums.albums.concat(payload.items),
        offset: payload.items.length + payload.offset, // * increment offset, creates pagination functionality
        limit: payload.limit,
        total: payload.total,
      };
      state.status = "idle";
    });

    builder.addCase(fetchSavedAlbums.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(fetchAlbumDetails.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchAlbumDetails.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.activeAlbum = {
        ...payload,
        tracks: {
          ...payload.tracks,
          offset: payload.tracks.offset + payload.tracks.items.length
        }
      };
      state.status = "idle";
    });

    builder.addCase(fetchAlbumDetails.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(fetchAlbumTracks.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchAlbumTracks.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.activeAlbum.tracks.items = state.activeAlbum.tracks.items.concat(payload.items);
      state.activeAlbum.tracks.offset = state.activeAlbum.tracks.offset + payload.items.length;
      state.status = "idle";
    });

    builder.addCase(fetchAlbumTracks.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

export const { updateActiveAlbum } = albumSlice.actions;

export default albumSlice.reducer;
export { }
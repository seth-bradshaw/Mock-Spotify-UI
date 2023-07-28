import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaylistState } from "./types";
import fetchSavedPlaylists from "./fetchSavedPlaylists";
import { SavedTracksRes } from "../../../services/trackRes.types";
import fetchPlaylistItems from "./fetchPlaylistItems";
import fetchPlaylistDetails from "./fetchPlaylistDetails";

const initialState: PlaylistState = {
  savedPlaylists: {
    playlists: [],
    offset: 0,
    total: 0,
    limit: 20, // * default req size to 20
  },
  activePlaylist: {},
  status: "",
  error: null,
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    updateActivePlaylist: (state, action) => {
      state.activePlaylist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSavedPlaylists.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchSavedPlaylists.fulfilled, (state, { payload }: PayloadAction<SavedTracksRes>) => {
      state.savedPlaylists = {
        playlists: [ ...state.savedPlaylists.playlists, ...payload.items ],
        offset: payload.items.length + payload.offset, // * increment offset, creates pagination functionality
        limit: payload.limit,
        total: payload.total,
      };
      state.status = "idle";
    });

    builder.addCase(fetchSavedPlaylists.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });


    builder.addCase(fetchPlaylistDetails.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchPlaylistDetails.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.activePlaylist = payload
      state.activePlaylist.tracks.offset = state.activePlaylist.tracks.items.length
    });

    builder.addCase(fetchPlaylistDetails.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(fetchPlaylistItems.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchPlaylistItems.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.activePlaylist.tracks.items = [...state.activePlaylist.tracks.items, ...payload.items]
      state.activePlaylist.tracks.offset = state.activePlaylist.tracks.offset + payload.limit
      state.status = "idle";
    });

    builder.addCase(fetchPlaylistItems.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

export const { updateActivePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;

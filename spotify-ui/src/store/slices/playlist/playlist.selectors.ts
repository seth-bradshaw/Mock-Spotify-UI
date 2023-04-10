
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

// TODO create complete app state type
const selectPlaylists = (state: RootState) => state.playlists;

export const getSavedPlaylists = createSelector(selectPlaylists, ({ savedPlaylists }) => savedPlaylists.playlists ?? []);
export const getActivePlaylist = createSelector(selectPlaylists, ({ activePlaylist }) => activePlaylist)
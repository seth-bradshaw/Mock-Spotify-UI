import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

// TODO create complete app state type
const selectAlbum = (state: RootState) => state.album;

export const getSavedAlbums = createSelector(selectAlbum, ({ savedAlbums }) => savedAlbums.albums ?? []);
export const getActiveAlbum = createSelector(selectAlbum, ({ activeAlbum }) => activeAlbum ?? {})
import { createSelector } from "@reduxjs/toolkit";
import { ArtistState } from "./types";

// TODO create complete app state type
const selectArtists = (state: { artist: ArtistState }) => state.artist;

export const getActiveArtist = createSelector(selectArtists, ({ activeArtist }) => activeArtist);

export const getFollowedArtists = createSelector(selectArtists, ({ savedArtists }) => savedArtists);

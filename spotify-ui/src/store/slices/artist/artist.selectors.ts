import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { ArtistState } from "./types";

// TODO create complete app state type
const selectArtist = (state: RootState) => state.artist;

export const getActiveArtist = createSelector(selectArtist, ({ activeArtist }) => activeArtist);

export const getFollowedArtists = createSelector(selectArtist, ({ savedArtists }) => savedArtists);

export const getIsArtistLoading = createSelector(selectArtist, ({ status }) => status !== 'idle');

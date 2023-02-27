import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowedArtistResponse } from "../../../services/followedArtists.types";
import fetchArtistDetails, { ArtistDetailsRes } from "./fetchArtistDetails";
import fetchFollowedArtists from "./fetchSavedArtists";
import { ArtistState } from "./types";
// @ts-ignore
import { omit } from 'ramda';

const initialState: ArtistState = {
    savedArtists: {
        artists: [],
        after: '', // * id of last fetched artist
        limit: 20
    },
    activeArtist: null,
    status: "",
    error: null
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        updateArtist: (state, action) => {
            state.activeArtist = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFollowedArtists.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });

        builder.addCase(fetchFollowedArtists.fulfilled, (state, { payload }: PayloadAction<FollowedArtistResponse>) => {
            state.savedArtists = {
                artists: [ ...state.savedArtists.artists, ...payload.artists.items],
                after: payload.artists.cursors.after,
                limit: payload.artists.limit
            }
            state.status = 'idle'
        })

        builder.addCase(fetchFollowedArtists.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = 'idle'
        })

        builder.addCase(fetchArtistDetails.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });

        builder.addCase(fetchArtistDetails.fulfilled, (state, { payload }: PayloadAction<ArtistDetailsRes>) => {
            state.activeArtist = omit(['status', 'message'], payload)
            state.status = 'idle'
        })

        builder.addCase(fetchArtistDetails.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = 'idle'
        })
    }
})

export const { updateArtist } = artistSlice.actions;

export default artistSlice.reducer;
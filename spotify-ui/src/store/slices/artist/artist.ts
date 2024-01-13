import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowedArtistResponse } from "../../../services/followedArtists.types";
import fetchArtistDetails, { ArtistDetailsRes } from "./fetchArtistDetails";
import fetchFollowedArtists from "./fetchSavedArtists";
import { ArtistState } from "./types";
// @ts-ignore
import { omit } from 'ramda';
import fetchArtistTopTracks from "./fetchArtistTopTracks";
import fetchArtistAlbums from "./fetchArtistAlbums";

enum StatusOpts {
    Idle = 'idle',
    Loading = 'loading'
}

const initialState: ArtistState = {
    savedArtists: {
        artists: [],
        after: '', // * id of last fetched artist
        limit: 20
    },
    activeArtist: null,
    status: StatusOpts.Idle,
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
            state.status = StatusOpts.Loading;
            state.error = null;
        });

        builder.addCase(fetchFollowedArtists.fulfilled, (state, { payload }: PayloadAction<FollowedArtistResponse>) => {
            state.savedArtists = {
                artists: [ ...state.savedArtists.artists, ...payload.artists.items],
                after: payload.artists.cursors.after,
                limit: payload.artists.limit
            }
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchFollowedArtists.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchArtistDetails.pending, (state) => {
            state.status = StatusOpts.Loading;
            state.error = null;
        });

        builder.addCase(fetchArtistDetails.fulfilled, (state, { payload }: PayloadAction<ArtistDetailsRes>) => {
            state.activeArtist = omit(['status', 'message'], payload)
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchArtistDetails.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchArtistTopTracks.pending, (state) => {
            state.status = StatusOpts.Loading;
            state.error = null;
        });

        // TODO replace any with proper type
        builder.addCase(fetchArtistTopTracks.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.activeArtist.topTracks = omit(['status', 'message'], payload)
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchArtistTopTracks.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchArtistAlbums.pending, (state) => {
            state.status = StatusOpts.Loading;
            state.error = null;
        });

        // TODO replace any with proper type
        builder.addCase(fetchArtistAlbums.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.activeArtist.albums = omit(['status', 'message'], payload)
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchArtistAlbums.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = StatusOpts.Idle
        })
    }
})

export const { updateArtist } = artistSlice.actions;

export default artistSlice.reducer;
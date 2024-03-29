
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowedArtistResponse } from "../../../services/followedArtists.types";
// import { ArtistState } from "./types";
// @ts-ignore
import { omit } from 'ramda';
import fetchCategories from "./fetchCategories";
import fetchCategoryPlaylists from "./fetchCategoryPlaylists";

enum StatusOpts {
    Idle = 'idle',
    Loading = 'loading'
}

const initialState = {
    categories: [],
    offset: 0,
    limit: 20,
    total: 0,
    status: StatusOpts.Idle,
    error: null
}

const injectPlaylists = (categories, { categoryId, items, offset, limit, total }) => {
    categories.find((cat,idx) => {
        if (cat.id ===  categoryId)  {
            categories[idx].items = categories[idx].items ? categories[idx].items.concat(items) : items
            categories[idx].offset = offset + limit;
            categories[idx].limit = limit;
            categories[idx].total = total;
            return true;
        }
        return false;
    })

    return  categories;
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.status = StatusOpts.Loading;
            state.error = null;
        });

        builder.addCase(fetchCategories.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.categories = state.categories.concat(payload.items)
            state.offset = payload.offset + payload.limit;
            state.total = payload.total
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchCategories.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchCategoryPlaylists.pending, (state) => {
            state.status = StatusOpts.Loading;
            state.error = null;
        });

        builder.addCase(fetchCategoryPlaylists.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.categories = injectPlaylists(state.categories, payload)
            state.status = StatusOpts.Idle
        })

        builder.addCase(fetchCategoryPlaylists.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = StatusOpts.Idle
        })
    }
})

export default categorySlice.reducer;
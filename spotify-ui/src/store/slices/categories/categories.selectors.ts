import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

// TODO create complete app state type
const selectCategories = (state: RootState) => state.category;

export const getCategories = createSelector(selectCategories, ({ categories }) => categories);

export const getCategoriesPagination = createSelector(selectCategories, ({offset, total}) => ({offset, total}));
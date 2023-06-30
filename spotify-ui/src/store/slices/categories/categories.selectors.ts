import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

// TODO create complete app state type
const selectCategory = (state: RootState) => state.category;

export const getCategories = createSelector(selectCategory, ({ categories }) => categories);
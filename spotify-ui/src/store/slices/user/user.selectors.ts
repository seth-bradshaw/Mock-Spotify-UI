import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

// TODO create complete app state type
const selectUser = (state: RootState) => state.user;

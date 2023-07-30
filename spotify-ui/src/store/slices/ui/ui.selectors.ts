import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

const selectUI = (state: RootState) => state.ui;

export const getModal = createSelector(selectUI, ({ modal }) => modal);
export const getDeviceId = createSelector(selectUI, ({ device_id }) => device_id);
export const getPromptedTransfer = createSelector(selectUI, ({ promptedDeviceTransfer }) => promptedDeviceTransfer);
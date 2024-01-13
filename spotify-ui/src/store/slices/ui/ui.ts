import { createSlice } from "@reduxjs/toolkit";
import { UIState } from './types'

const initialState: UIState = {
  modal: null,
  promptedDeviceTransfer: false,
  device_id: null
};

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeModal: (state, action) => {
      if (action.payload === 'transfer_device') {
        state.promptedDeviceTransfer = true
      }
      state.modal = action.payload;
    },
    updateDeviceId: (state, action) => {
      if (state.device_id !== action.payload) {
        state.device_id = action.payload
      }
    }
  }
});

export const { changeModal, updateDeviceId } = ui.actions;

export default ui.reducer;
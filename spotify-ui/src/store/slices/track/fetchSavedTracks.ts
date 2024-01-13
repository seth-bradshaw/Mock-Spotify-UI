import { createAsyncThunk } from "@reduxjs/toolkit";
import { Track } from "../../../constants/types/track";
import { ParamOpts, getUserSavedTracks } from "../../../services";
import { SavedTracksRes } from "../../../services/trackRes.types";
import { TrackState } from "./types";

const fetchSavedTracks = createAsyncThunk<SavedTracksRes, ParamOpts, { rejectValue: { message: string } | string }>('track/fetchSaved', async (paramsObj, thunkApi) => {
  const state: { track: TrackState } = thunkApi.getState() as { track: TrackState };
  
  if (!paramsObj['offset']) {
    paramsObj['offset'] = state.track.savedTracks.offset;
  }

  // @ts-ignore
  const params = Object.keys(paramsObj).map((key: SavedTracksParams) => ({ [key]: paramsObj[key]}))
  const response: SavedTracksRes = await getUserSavedTracks(params);
  
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get saved tracks');
  }
  return response;
});

export default fetchSavedTracks;
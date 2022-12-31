import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSavedTracks } from "../../../services";
import { SavedTracksRes } from "../../../services/trackRes.types";

enum SavedTracksParams {
  Limit = 'limit', // * res body size
  Market = 'market',
  Offset = 'offset' // * starting index of res items
}

type SavedTrackParam = {
  [SavedTracksParams.Limit]?: number;
  [SavedTracksParams.Market]?: string;
  [SavedTracksParams.Offset]?: number;
}

const fetchSavedTracks = createAsyncThunk<SavedTracksRes, SavedTrackParam, { rejectValue: { message: string } | string }>('track/fetchSaved', async (paramsObj, thunkApi) => {
  // @ts-ignore
  const params = Object.keys(paramsObj).map((key: SavedTracksParams) => ({ [key]: paramsObj[key]}))
  const response = await getUserSavedTracks(params);
  
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get saved tracks');
  }
  return response;
});

export default fetchSavedTracks;
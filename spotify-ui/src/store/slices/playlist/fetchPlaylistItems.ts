import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamsWithReqId, getPlaylistItems } from "../../../services";
import { PlaylistState } from "./types";
import { RootState } from "../..";

const fetchPlaylistItems = createAsyncThunk<any, ParamsWithReqId, { rejectValue: { message: string } | string }>('playlists/fetchItems', async (paramsObj, thunkApi) => {
  const state = thunkApi.getState() as RootState

  
  if (!paramsObj['offset']) {
    paramsObj['offset'] = state.playlists.activePlaylist.tracks.offset;
  }
  
  const params = Object.keys(paramsObj).map((key: string) => ({ [key]: paramsObj[key]}))
  const response = await getPlaylistItems(params);

  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get playlist items');
  }

  return response;
});

export default fetchPlaylistItems;
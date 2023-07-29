import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamOpts, fetchAlbumItems as fetchItems } from "../../../services";

type Args = {
  paramsObj: ParamOpts
  album_id: string
}

const fetchAlbumTracks = createAsyncThunk<any, Args, { rejectValue: { message: string } | string }>('albums/fetchTracks', async ({ paramsObj, album_id }, thunkApi) => {
  const state = thunkApi.getState();
  
  if (!paramsObj['offset']) {
    // @ts-ignore
    paramsObj['offset'] = state.album.activeAlbum.tracks.offset;
  }

  // @ts-ignore
  const params = Object.keys(paramsObj).map((key: ParamsOpts) => ({ [key]: paramsObj[key]}))
  const response = await fetchItems(album_id, params);
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get album items');
  }
  return response;
});

export default fetchAlbumTracks;
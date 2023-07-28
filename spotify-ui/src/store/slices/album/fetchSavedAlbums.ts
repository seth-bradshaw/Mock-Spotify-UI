import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamOpts, fetchUserSavedAlbums } from "../../../services";

const fetchSavedAlbums = createAsyncThunk<any, ParamOpts, { rejectValue: { message: string } | string }>('albums/fetchSaved', async (paramsObj, thunkApi) => {
  const state = thunkApi.getState();
  
  if (!paramsObj['offset']) {
    // @ts-ignore
    paramsObj['offset'] = state.album.savedAlbums.offset;
  }

  // @ts-ignore
  const params = Object.keys(paramsObj).map((key: ParamsOpts) => ({ [key]: paramsObj[key]}))
  const response = await fetchUserSavedAlbums(params);
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get saved albums');
  }
  return response;
});

export default fetchSavedAlbums;
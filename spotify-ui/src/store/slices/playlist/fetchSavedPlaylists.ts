import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamOpts, getCurrentUserPlaylists } from "../../../services";

const fetchSavedPlaylists = createAsyncThunk<any, ParamOpts, { rejectValue: { message: string } | string }>('playlists/fetchSaved', async (paramsObj, thunkApi) => {
  const state = thunkApi.getState();
  
  if (!paramsObj['offset']) {
    // @ts-ignore
    paramsObj['offset'] = state.playlists.savedPlaylists.offset;
  }

  // @ts-ignore
  const params = Object.keys(paramsObj).map((key: ParamsOpts) => ({ [key]: paramsObj[key]}))
  const response = await getCurrentUserPlaylists(params);
  
  if (response?.status ?? 200 >= 400) {
    return thunkApi.rejectWithValue(response?.message ?? 'Failed to get saved playlists');
  }
  return response;
});

export default fetchSavedPlaylists;
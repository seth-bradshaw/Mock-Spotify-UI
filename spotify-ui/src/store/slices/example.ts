import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AnyObj } from '../../components/playback/context/types';
import { getUserQueue } from '../../services';

// ! remove later, leave as example for now
export const fetchQueue = createAsyncThunk(
  "counter/fetch", 
  async (_args: string, thunkApi) => {
    const response = await getUserQueue();

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({ 
        message: "Failed to fetch queue." 
      });
    }
    
    return response;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    queue: [],
    status: '',
    error: ''
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQueue.pending, (state) => {
      state.status = "loading";
      state.error = '';
    });

    builder.addCase(fetchQueue.fulfilled, 
      (state, { payload }) => {
      state.queue = payload.data.queue;
      state.status = "idle";
    });

    builder.addCase(fetchQueue.rejected, 
      (state, { payload }: AnyObj) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
})

export const { increment, decrement, incrementByAmount, } = counterSlice.actions

export default counterSlice.reducer
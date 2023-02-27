import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './slices/track';
import artistReducer from './slices/artist';

const store = configureStore({ 
  reducer: { 
    track: trackReducer,
    artist: artistReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
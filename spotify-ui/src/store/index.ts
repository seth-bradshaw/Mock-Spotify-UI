import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './slices/track';
import artistReducer from './slices/artist';
import userReducer from './slices/user';
import playlistReducer from './slices/playlist'

const store = configureStore({ 
  reducer: { 
    track: trackReducer,
    artist: artistReducer,
    user: userReducer,
    playlists: playlistReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
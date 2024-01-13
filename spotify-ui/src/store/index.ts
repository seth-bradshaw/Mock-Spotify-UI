import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './slices/track';
import artistReducer from './slices/artist';
import userReducer from './slices/user';
import playlistReducer from './slices/playlist';
import categoryReducer from './slices/categories/categories';
import albumReducer from './slices/album/album';
import uiReducer from './slices/ui/ui'

const store = configureStore({ 
  reducer: { 
    track: trackReducer,
    artist: artistReducer,
    user: userReducer,
    playlists: playlistReducer,
    category: categoryReducer,
    album: albumReducer,
    ui: uiReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
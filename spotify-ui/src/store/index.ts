import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/example'

export default configureStore({ 
  reducer: { 
    counterReducer
  }
})
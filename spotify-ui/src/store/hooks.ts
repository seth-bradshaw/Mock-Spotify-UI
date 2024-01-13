import { useDispatch as dispatcher, useSelector as selector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './'

export const useDispatch: () => AppDispatch = dispatcher
export const useSelector: TypedUseSelectorHook<RootState> = selector
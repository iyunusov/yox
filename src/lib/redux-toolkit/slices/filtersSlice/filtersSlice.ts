/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */

const initialState: FiltersSliceState = {
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: () => initialState,
    setFilters: (state, action: PayloadAction<Partial<FiltersSliceState>>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

/* Types */
export interface FiltersSliceState {
  searchTextFilter?: string | null;
}
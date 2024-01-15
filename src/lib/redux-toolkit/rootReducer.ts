/* Instruments */
import { filtersSlice, authSlice} from './slices'
 
export const reducer = {
  filters: filtersSlice.reducer,
  auth: authSlice.reducer,
}
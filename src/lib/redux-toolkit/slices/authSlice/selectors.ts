/* Instruments */
import type { ReduxState } from '@/lib/redux-toolkit'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPhoneNumber = (state: ReduxState) => state.auth.phoneNumber
export const selectPhoneAuthVerificationId = (state: ReduxState) => state.auth.phoneAuthVerificationId;

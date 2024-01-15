/* Instruments */
import { selectPhoneAuthVerificationId } from './selectors'
import { authSlice } from './authSlice'
import { type ReduxThunkAction } from '@/lib/redux-toolkit'
import { confirmOTP, sendPhoneOTP, signOut } from '@/lib/firebase/auth'
import { UserCredential } from 'firebase/auth'

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const setPhoneAuthVerification =
  (phoneNumber: string, buttonId: string): ReduxThunkAction<Promise<string | null>> =>
    async (dispatch) => {
      try {
        const confirmationResult = await sendPhoneOTP(phoneNumber, buttonId);
        if (confirmationResult) {
          const { verificationId } = confirmationResult;
          dispatch(authSlice.actions.updatePhoneAuthVerificationId(verificationId));
          return new Promise(res => res(verificationId as string));
        }
      } catch (error) {
          console.log(error);
      }
      return null;
    }

export const signInWithOTP = (otp: string): ReduxThunkAction<Promise<object | null>> => 
  async (_dispatch, getState) => {
    const phoneAuthVerificationId = selectPhoneAuthVerificationId(getState());
    if (phoneAuthVerificationId) {
      try {
        const userCredential = await confirmOTP(phoneAuthVerificationId, otp) as UserCredential;
        const { user } = userCredential;
        if (user) {
          const idToken = await user.getIdToken();

          const response = await fetch("/auth/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          });

          const resBody = (await response.json());
          if (response.ok && resBody.success) {
            return new Promise(resolve => resolve(user));
          } else signOut();
        }
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }

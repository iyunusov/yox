/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { ConfirmationResult } from 'firebase/auth';
import { getCountryCallingCode } from 'libphonenumber-js';
import { MuiTelInputInfo } from 'mui-tel-input';

const defaultCountryCallingCode = getCountryCallingCode('TJ');
const initialState: AuthSliceState = {
  phoneNumber: {
    countryCode: 'TJ',
    countryCallingCode: defaultCountryCallingCode,
    nationalNumber: null,
    numberType: null,
    numberValue: `+${defaultCountryCallingCode}`,
    reason: 'input',
  },
  phoneAuthVerificationId: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    updatePhoneNumber: (state, action: PayloadAction<MuiTelInputInfo>) => {
      state.phoneNumber = {
        ...state.phoneNumber,
        ...(action.payload ? action.payload : {}),
      };
    },
    updatePhoneAuthVerificationId: (state, action: PayloadAction<ConfirmationResult['verificationId']>) => {
      state.phoneAuthVerificationId = action.payload;
    },
  },
})

/* Types */
export interface AuthSliceState {
  phoneNumber: MuiTelInputInfo;
  phoneAuthVerificationId: ConfirmationResult['verificationId'] | null;
}
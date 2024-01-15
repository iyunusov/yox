'use client'
import React, { SyntheticEvent, useEffect, useId, useState } from 'react';
import { Box, Button, FormHelperText, Paper, Stack, Typography } from '@mui/material';
import { MuiTelInput } from "mui-tel-input";
import { FormControl } from '@mui/base';
import SwipeableViews from 'react-swipeable-views';
import SMSConfirmation from './SMSConfirmation';
import { AUTH_PAGES } from '@/utils/constants';
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import { isValidPhoneNumber } from 'libphonenumber-js';
import { authSlice, selectPhoneNumber, useDispatch, useSelector } from '@/lib/redux-toolkit';
import { setPhoneAuthVerification } from '@/lib/redux-toolkit/slices/authSlice/thunks';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
    confirmationResult: ConfirmationResult;
  }
}

export default function PhoneSignIn() {
  const dispatch = useDispatch();
  const phoneNumber = useSelector(selectPhoneNumber)
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
  const [authIndex, setAuthIndex] = useState(AUTH_PAGES.phoneNumberPage);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const submitButtonId = useId();

  const onSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const { numberValue = '' } = phoneNumber;
    if (!isValidPhoneNumber(numberValue as string)) {
      setPhoneNumberErrorText('Please provide a valid phoneNumber e.g. +992 90 202 5348')
      return
    }

    setButtonDisabled(true);
    if (numberValue) {
      const confirmation = await dispatch(setPhoneAuthVerification(numberValue, submitButtonId));
      if (confirmation) setAuthIndex(AUTH_PAGES['otpPage']);
      else {
        setPhoneNumberErrorText(`Something went wrong. Please reload the page and try again.`)
      }
    }
  }

  useEffect(() => {
    return () => {
      window.recaptchaVerifier = null;
    }
  }, [])

  return (
    <Stack 
      justifyContent="center"
      alignItems="center"
      height={{
        xs: 'calc(100vh - 64px)',
        sm: 'calc(100vh - 64px)',
      }}
      >
      <Paper sx={{ width: { xs: '100%', sm: '480px' }, p: 4 }}>
        <SwipeableViews index={authIndex}>
          <FormControl >
            <Typography variant="h6" mb={2} textAlign={'center'}>Authorize</Typography>
            <MuiTelInput
              size="small"
              fullWidth
              value={phoneNumber.numberValue || ''}
              onChange={(_value, numberProps) => {
                setPhoneNumberErrorText('');
                dispatch(authSlice.actions.updatePhoneNumber(numberProps))
              }}
              helperText={
                <Box
                  ml={0}
                  display={'flex'}
                  flexDirection={'column'}
                  component={'span'}
                  >
                  <FormHelperText component={'span'}>
                    Enter your mobile number.
                  </FormHelperText>
                  {phoneNumberErrorText && (
                    <FormHelperText error={true} component={'span'}>
                      {phoneNumberErrorText}
                    </FormHelperText>)
                  }
                </Box>
              }
              FormHelperTextProps={{
                sx: { ml: 0, mt: 1 },
              }}
              />
            <Button
              key={submitButtonId}
              id={submitButtonId}
              disabled={buttonDisabled}
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={onSubmit}
              type={'submit'}
              >Login</Button>
          </FormControl>
          {authIndex === AUTH_PAGES.otpPage ? <SMSConfirmation authIndex={authIndex} />: <></>}
        </SwipeableViews>
      </Paper>
    </Stack>
  );
}
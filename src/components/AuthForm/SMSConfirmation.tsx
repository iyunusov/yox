"use client"
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Box, Button, FormControl, Theme, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { AUTH_PAGES } from '@/utils/constants';
import { useDispatch } from '@/lib/redux-toolkit';
import { signInWithOTP } from '@/lib/redux-toolkit/slices/authSlice/thunks';

export default function SMSConfirmation ({ authIndex }: { authIndex: number; setAuthIndex?: Dispatch<SetStateAction<number>> }) {
  const [otp, setOtp] = React.useState('')
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const user = await dispatch(signInWithOTP(otp));
    if (user) router.push('/');
  };

  return (
    <FormControl
      component="form"
      fullWidth
      onSubmit={onSubmit}
      sx={{
        display: authIndex === AUTH_PAGES['otpPage'] ? 'block': 'none'
      }}
      >
      <Typography variant={"h5"} mb={2}>Enter SMS code</Typography>
      <Typography mb={4}>We have sent a text message with an activation code to {'phoneNumber' || ''}. Enter the code and complete sign-up.</Typography>
      <MuiOtpInput
        inputMode='numeric'
        autoFocus
        value={otp}
        onChange={handleChange}
        length={6}
        sx={(theme: Theme) => ({
          width: '100%',
          margin: 'auto',
          [theme.breakpoints.down('xs')]: {
            gap: '10px',
          },
          [theme.breakpoints.down('sm')]: {
            '& .MuiInputBase-input': {
              padding: '9.5px 9px'
            }
          }

        })}
        />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        gap={'20px'}
        flexDirection={{ xs: 'column', sm: 'column-reverse' }}
        mt={4}
        >
        <Button
          type={'submit'}
          variant={"contained"}
          >COMPLETE THE REGISTRATION PROCESS</Button>
      </Box>
    </FormControl>
  )
}
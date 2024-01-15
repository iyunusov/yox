import { Auth, ConfirmationResult, User } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, onAuthStateChanged as _onAuthStateChanged } from "firebase/auth";
import { auth } from './init';

export function onCaptchaVerifier(auth: Auth, phoneNumber: string, buttonId: string, callback?: (phoneNumber: string) => unknown) {
  if(!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
      size: 'invisible',
      callback: () => {
        if (callback) callback(phoneNumber);
      },
      badge: 'inline',
    })
  }
}

export async function sendPhoneOTP(phoneNumber: string, buttonId: string): Promise<ConfirmationResult> {
  onCaptchaVerifier(auth, phoneNumber, buttonId);
  const appVerifier = window.recaptchaVerifier;
  if (appVerifier) {
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  }
  throw new Error('App verifier not initialized.');
}

export async function confirmOTP(verificationId: string, otp: string) {
  const phoneAuthCredential = PhoneAuthProvider.credential(verificationId, otp)
  return await signInWithCredential(auth, phoneAuthCredential);
}

export function onAuthStateChanged(cb: (user: User | null) => void) {
	return _onAuthStateChanged(auth, cb);
}

export async function signOut() {
  try {
    await auth.signOut();

    const response = await fetch("/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json());
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing out.", error);
    return false;
  }
}
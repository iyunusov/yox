import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDGk7xYAm8qIZ5ThfuiHdUg_ojmUVKO6OQ",
  authDomain: "yox1-a9e83.firebaseapp.com",
  projectId: "yox1-a9e83",
  storageBucket: "yox1-a9e83.appspot.com",
  messagingSenderId: "854422039979",
  appId: "1:854422039979:web:51032eb76b7d0831fb36ee",
  measurementId: "G-L7H5XQ2RLL"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// To apply the default browser preference instead of explicitly setting it for reCAPTCHA localization.
auth.useDeviceLanguage();

export default app;
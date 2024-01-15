'use client'
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Provider as ReduxStoreProvider } from 'react-redux'
import { ThemeProvider } from '@mui/material';
import { reduxStore } from '@/lib/redux-toolkit';
import theme from '@/utils/theme';

export default function Providers ({ children }: { children: ReactNode }) {
  return (
    <ReduxStoreProvider store={reduxStore}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ReduxStoreProvider>
  )
}
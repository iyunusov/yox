import type { Metadata } from 'next'
import { CssBaseline } from '@mui/material';
import Providers from './providers';
import { getCurrentUser } from '@/lib/firebase/admin';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Yox E-Commerce App',
  description: 'App allows product listing, adding to card and product posting when authenticated.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header user={currentUser?.toJSON() || null} />
          {children}
        </Providers>
      </body>
    </html>
  )
}

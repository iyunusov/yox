'use client'
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/firebase/auth';

interface PrimarySearchAppBarProps { anchorEl: HTMLElement | null; isMenuOpen: boolean ; handleMenuClose: () => void; };
export default function PrimarySearchAppBar({ anchorEl, isMenuOpen, handleMenuClose }: PrimarySearchAppBarProps) {
  const router = useRouter();

  const handleSignOut = () => {
    handleMenuClose();
    signOut();
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push('/profile')
  }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={'primary-search-account-menu'}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
    </Menu>
  );
}
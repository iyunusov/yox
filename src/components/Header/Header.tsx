'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountMenu from './AccountMenu';
import { Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@firebase/auth';
import { useUserSession } from '@/hooks/useUserSession';
import { filtersSlice, useDispatch } from '@/lib/redux-toolkit';

const Search = styled('div')<{ focused: boolean; }>(({ theme, focused }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    flexGrow: focused ? 0.3: 0,
  },
  transition: 'all 0.3s',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  display: 'flex',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function Header({ user: userProp }: { user: object | null }) {
  const user = useUserSession(userProp as User);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [focused, setFocused] = React.useState<boolean>(false)

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onFocus = () => {
    setFocused(true);
  }

  const onBlur = () => {
    setFocused(false);
  }

  const onSearchInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filtersSlice.actions.setFilters({
      searchTextFilter: target.value,
    }))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Yox
          </Typography>
          {pathname === '/' && (
            <Search
              focused={focused}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onSearchInputChange}
              >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: { sm: 1 } }} />
          {user?.uid ? (
            <>
              <Box sx={{ display: { xs: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={'primary-search-account-menu'}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <AccountMenu
                anchorEl={anchorEl}
                isMenuOpen={isMenuOpen}
                handleMenuClose={handleMenuClose}
              />
            </>         
          ) : (
            <Button
              onClick={() => router.push('/auth')}
              variant="contained"
              color="secondary"
              >Sign up</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
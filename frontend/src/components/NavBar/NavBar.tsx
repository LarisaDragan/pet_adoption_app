import { Fragment, useState, useEffect } from 'react';
import {
  Toolbar,
  Button,
  AppBar,
  Link,
  IconButton,
  Box,
  useMediaQuery,
  Drawer,
  ListItemButton,
} from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { navigationMenu } from '../../constants/navigationMenu';
import componentsStyle from './NavBarStyle';
import { getToken } from '../../helpers/getToken';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const DesktopNavigation = () => {
  const style = componentsStyle();

  const token = getToken();

  const logout = () => {
    localStorage.removeItem('token');
    signOut(auth);
  };

  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 550) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const isActive = (url: any) => window.location.pathname === url;

  const currentPath = location.pathname;

  const isPageWithColorHeader =
    currentPath === '/adoptapet/petprofile' ||
    currentPath === '/rehomeapet' ||
    currentPath === '/adoptioninformation' ||
    currentPath === '/petcare';

  const isLoginOrRegister =
    currentPath === '/loginform' || currentPath === '/registerform';

  return (
    <Fragment>
      <AppBar
        className={
          isPageWithColorHeader
            ? style.petProfileNavBar
            : scrolling
            ? style.scrolledNavBar
            : isLoginOrRegister
            ? style.loginRegisterNavBar
            : style.appBar
        }
        data-testid="app-bar"
      >
        <Toolbar className={style.toolbar} data-testid="toolbar">
          <div>
            {isLoginOrRegister ? (
              <Button
                style={{ height: '70px' }}
                data-testid="logo"
                component={Link}
                href={navigationMenu[0].url}
              >
                <img
                  src="/images/logo3.png"
                  style={{ height: '100%' }}
                  alt="logo-image"
                />
              </Button>
            ) : (
              <>
                <Button
                  style={{ height: '70px' }}
                  data-testid="logo"
                  component={Link}
                  href={navigationMenu[0].url}
                >
                  <img
                    src="/images/logo3.png"
                    style={{ height: '100%' }}
                    alt="logo-image"
                  />
                </Button>
                <Button
                  component={Link}
                  href={navigationMenu[0].url}
                  className={
                    isActive(navigationMenu[0].url) ? style.activeButton : ''
                  }
                  data-testid="home-button"
                >
                  {navigationMenu[0].label}
                </Button>
                <Button
                  component={Link}
                  href={navigationMenu[3].url}
                  className={
                    isActive(navigationMenu[3].url) ? style.activeButton : ''
                  }
                  data-testid="adoption-info-button"
                >
                  {navigationMenu[3].label}
                </Button>
                <Button
                  component={Link}
                  href={navigationMenu[4].url}
                  className={
                    isActive(navigationMenu[4].url) ? style.activeButton : ''
                  }
                  data-testid="pet-care-button"
                >
                  {navigationMenu[4].label}
                </Button>
              </>
            )}
          </div>

          <div>
            {isLoginOrRegister ? null : token ? (
              <div className={style.userProfile} data-testid="log-out-div">
                <Button
                  component={Link}
                  href={navigationMenu[0].url}
                  onClick={logout}
                  data-testid="logout-button"
                >
                  {navigationMenu[7].label}
                </Button>
                <PersonRoundedIcon style={{ color: '#fab005' }} />
              </div>
            ) : (
              <>
                <Button
                  component={Link}
                  href={navigationMenu[5].url}
                  data-testid="login-button"
                >
                  {navigationMenu[5].label}
                </Button>
                <Button
                  component={Link}
                  href={navigationMenu[6].url}
                  data-testid="register-button"
                >
                  {navigationMenu[6].label}
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const MobileNavigation = () => {
  const [open, setState] = useState<boolean>(false);

  const toggleDrawer = (open: any) => (event: any) => {
    setState(open);
  };
  const style = componentsStyle();
  const isActive = (url: any) => window.location.pathname === url;

  const currentPath = location.pathname;

  const isLoginOrRegister =
    currentPath === '/loginform' || currentPath === '/registerform';

  const token = getToken();

  const logout = () => {
    localStorage.removeItem('token');
    signOut(auth);
  };

  return (
    <AppBar
      className={isLoginOrRegister ? style.loginRegisterNavBar : style.appBar}
    >
      <Toolbar className={style.toolbarMobile} data-testid="xxx">
        <Button
          className={style.logoMobileVersion}
          data-testid="logo"
          component={Link}
          href={navigationMenu[0].url}
        >
          <img
            src="/images/logo3.png"
            style={{ height: '100%' }}
            alt="logo-image"
          />
        </Button>

        {isLoginOrRegister ? null : (
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon color="primary" data-testid="mobileMenu" />
          </IconButton>
        )}
        {/* The outside of the drawer */}
        <Drawer
          open={open}
          anchor="right"
          PaperProps={{
            sx: {
              backgroundColor: '#162f51',
              width: '33vh',
            },
          }}
          data-testid="drawer-test"
        >
          <Box data-testid="box" className={style.mobileOptionsHeader}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>

            <Box className={style.navListItems}>
              <ListItemButton
                component={Link}
                href={navigationMenu[0].url}
                className={
                  isActive(navigationMenu[0].url) ? style.activeButton : ''
                }
              >
                {navigationMenu[0].label}
              </ListItemButton>

              <ListItemButton
                component={Link}
                href={navigationMenu[3].url}
                className={
                  isActive(navigationMenu[3].url) ? style.activeButton : ''
                }
              >
                {navigationMenu[3].label}
              </ListItemButton>

              <ListItemButton
                component={Link}
                href={navigationMenu[4].url}
                className={
                  isActive(navigationMenu[4].url) ? style.activeButton : ''
                }
              >
                {navigationMenu[4].label}
              </ListItemButton>
            </Box>

            <Box className={style.navAccessList}>
              {token ? (
                <div className={style.userProfile} data-testid="log-out-div">
                  <Button
                    component={Link}
                    href={navigationMenu[0].url}
                    onClick={logout}
                    data-testid="logout-button"
                  >
                    {navigationMenu[7].label}
                  </Button>{' '}
                </div>
              ) : (
                <>
                  <ListItemButton component={Link} href={navigationMenu[5].url}>
                    {navigationMenu[5].label}
                  </ListItemButton>

                  <ListItemButton component={Link} href={navigationMenu[6].url}>
                    {navigationMenu[6].label}
                  </ListItemButton>
                </>
              )}
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

const Header = () => {
  const isNotDesktopMode = useMediaQuery('(max-width:850px)');

  return <>{isNotDesktopMode ? <MobileNavigation /> : <DesktopNavigation />}</>;
};

export default Header;

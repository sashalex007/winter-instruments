import React from 'react';
import { Link } from 'react-router-dom';
//ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import image from '../static/img/logoText.png';
//logic
import getNavItems from '../static/navItems';
//components
import PopupCart from './cart/popupCart/popupCart';


const drawerWidth = 150;

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 20
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function NavBar(props) {
  const cartObject = props.cartObject;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navItems = getNavItems();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.link} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }} >
              <img src={image} alt="logo"
                style={{ height: '25px', width: 'auto' }}
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              &nbsp;&nbsp;
            </Link>


            <Typography variant="h6" sx={{
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none'
            }}>


            </Typography>

            <PopupCart cartObject={cartObject}></PopupCart>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

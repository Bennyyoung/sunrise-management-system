import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom"
// import TeachersHome from "./pages/ForTeachers/TeachersHome";

import { Home, EventManagement, AllStaffs, AddStaff, EditStaff, AllStudents, AddStudent, EditStudent, AddNewResult, AllResult, AddNewExpense, ForTeachers, ForParents, EditResult, AllExpenses, AddFees, UploadAssignment } from '../pages'

import Login from './auth/Login'
import Register from './auth/Register'

import { Link } from 'react-router-dom'

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 const { loggedIn } = useContext(AuthContext)


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <Link className="has-arrow" to="/register" aria-expanded="false">
              <i className="la la-register"></i>
              <span className="nav-text">Register</span>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <Switch>
     <Route exact path="/" component={Home} />
     {
      loggedIn === false && (
       <>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
       </>
      )
     }

     {
      loggedIn === true && (
       <>
        <Route path="/event-management" component={EventManagement} />

        {/* Staff Frontend Routes */}
        <Route path="/all-staffs" component={AllStaffs} />
        <Route path="/add-staff" component={AddStaff} />
        <Route path="/edit-staff/:id" component={EditStaff} />

        {/* Student Frontend Route */}
        <Route path="/all-students" component={AllStudents} />
        <Route path="/add-student" component={AddStudent} />
        <Route path="/edit-student/:id" component={EditStudent} />

        {/* Result Frontend Route */}
        <Route path="/all-results" component={AllResult} />
        <Route path="/add-new-result" component={AddNewResult} />
        <Route path="/edit-result/:id" component={EditResult} />


        <Route path="/add-new-expense" component={AddNewExpense} />
        <Route path="/all-expenses" component={AllExpenses} />

        <Route path="/add-fees" component={AddFees} />
        <Route path="/upload-assignment" component={UploadAssignment} />

        <Route path="/teachers" component={ForTeachers} />

        {/* <Route path="/teachers/:home/" component={TeachersHome} /> */}

        <Route path="/parents" component={ForParents} />

       </>
      )
     }

    </Switch>

      </Main>
    </Box>
  );

}


import React from 'react';
import { observer } from 'mobx-react';
import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';

import { HashIcon, NavLink } from '../components';
import { DRAWER_WIDTH } from '../config';
import { channelStore, routerStore } from '../stores';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    ...theme.mixins.toolbar,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export interface ISidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<ISidebarProps> = observer(props => {
  const classes = useStyles();

  const isSelected = (pathname: string): boolean => routerStore.location.pathname === pathname;

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography>Current Org</Typography>
      </div>
      <Divider />
      <List dense={true} subheader={<ListSubheader component="div">General</ListSubheader>}>
        <NavLink to="/">
          <ListItem button selected={isSelected('/')}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
        </NavLink>
        <NavLink to="/members">
          <ListItem button selected={isSelected('/members')}>
            <ListItemIcon>
              <GroupIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItem>
        </NavLink>
      </List>
      <List
        dense={true}
        subheader={
          <ListSubheader component="div" className={classes.listHeader}>
            Channels
            <Tooltip title="Create a channel" placement="top">
              <IconButton size="small" edge="end">
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ListSubheader>
        }
      >
        {channelStore.channels.map(channel => {
          // TODO: move the path and whether it's selected or not to an observable Channel class
          const { slug, id, name } = channel;
          const path = `/channels/${slug}`;
          const selected = isSelected(path);

          return (
            <NavLink to={path} key={id}>
              <ListItem button selected={selected}>
                <ListItemIcon>
                  <HashIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      <List
        dense={true}
        subheader={
          <ListSubheader component="div" className={classes.listHeader}>
            Direct messages
            <Tooltip title="Open a direct message" placement="top">
              <IconButton size="small" edge="end">
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ListSubheader>
        }
      >
        <NavLink to="/dm">
          <ListItem button selected={false}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="androo" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp>
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.onMobileClose}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
});

export default Sidebar;

import React from 'react';
import { AppBar, Avatar, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

import { DRAWER_WIDTH } from '../config';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export interface IAppHeaderProps {
  /**
   * Title to display.
   */
  title: string;

  /**
   * Callback to toggle the drawer menu.
   */
  onToggleDrawer: () => void;
}

export const AppHeader: React.FC<IAppHeaderProps> = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.row}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.onToggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{props.title}</Typography>
        </div>
        <Avatar variant="rounded">
          <PersonIcon />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

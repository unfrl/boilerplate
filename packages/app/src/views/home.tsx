import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router';

import { AppHeader, Sidebar } from '../containers';
import { Content } from '../components';

const useStyles = makeStyles((_theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflowY: 'hidden',
  },
}));

const Home: React.FC = observer(() => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const handleToggleOpen = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppHeader title="Home" onToggleDrawer={handleToggleOpen} />
      <div className={classes.root}>
        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
        <Content>
          <Switch>
            <Route path="/" exact={true} render={(_routeProps) => <Typography>Home</Typography>} />
            <Route render={(_routeProps) => <Typography>Not found</Typography>} />
          </Switch>
        </Content>
      </div>
    </>
  );
});

export default Home;

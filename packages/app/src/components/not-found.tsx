import React from 'react';
import { Container, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

export const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    // TODO: add in this image
    <Container maxWidth="md" component={Paper} className={classes.container}>
      <img src="images/not-found.svg" alt="Not Found" />
    </Container>
  );
};

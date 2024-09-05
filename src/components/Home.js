// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Premier League Predictor</Typography>
      {user ? (
        <>
          <Typography variant="h6">Welcome, {user.email}</Typography>
        </>
      ) : (
        <Typography variant="h6">
          Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to make predictions
        </Typography>
      )}
      <Button variant="contained" component={Link} to="/prediction">Make a Prediction</Button>
      <Button variant="contained" component={Link} to="/fixtures">View Fixtures</Button>
      <Button variant="contained" component={Link} to="/results">View Results</Button>
      <Button variant="contained" component={Link} to="/leaderboard">View Leaderboard</Button>
    </Container>
  );
};

export default Home;

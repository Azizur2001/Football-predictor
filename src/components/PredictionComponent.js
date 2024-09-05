// // Main
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PredictionComponent = () => {
//   const { state } = useLocation();
//   const [prediction, setPrediction] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect back if state is missing
//     if (!state) {
//       navigate('/');
//     }
//   }, [state, navigate]);

//   const handlePrediction = async () => {
//     try {
//       // Ensure the state has correct data
//       if (state && state.teams && state.goals) {
//         const response = await axios.post('http://127.0.0.1:5000/predict', {
//           home_team: state.teams.home.name,
//           away_team: state.teams.away.name,
//           home_goals: state.goals.home !== null ? state.goals.home : 0,
//           away_goals: state.goals.away !== null ? state.goals.away : 0
//         });
  
//         setPrediction(response.data.prediction);
//       } else {
//         setPrediction('Failed to fetch prediction - missing data');
//       }
//     } catch (error) {
//       console.error('Error fetching prediction:', error);
//       setPrediction('Failed to fetch prediction');
//     }
//   };
  
  

//   if (!state) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Predict the Outcome</h1>
//       <p>Home Team: {state.teams.home.name}</p>
//       <p>Away Team: {state.teams.away.name}</p>
//       <p>Home Goals: {state.goals.home}</p>
//       <p>Away Goals: {state.goals.away}</p>
//       <button onClick={handlePrediction}>Get Prediction</button>
//       <p>Prediction: {prediction}</p>
//     </div>
//   );
// };

// export default PredictionComponent;


// Everything is working fine up until now











// Main
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PredictionComponent = () => {
  const { state } = useLocation();
  const [prediction, setPrediction] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back if state is missing
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  const handlePrediction = async () => {
    try {
      // Ensure the state has correct data
      if (state && state.teams) {
        // Determine if goals are present or not (future matches)
        const isFutureMatch = state.goals.home === null || state.goals.away === null;

        const response = await axios.post('http://127.0.0.1:5000/predict', {
          home_team: state.teams.home.name,
          away_team: state.teams.away.name,
          home_goals: isFutureMatch ? 0 : state.goals.home,
          away_goals: isFutureMatch ? 0 : state.goals.away,
        });

        setPrediction(response.data.prediction);
      } else {
        setPrediction('Failed to fetch prediction - missing data');
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction('Failed to fetch prediction');
    }
  };

  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Predict the Outcome</h1>
      <p>Home Team: {state.teams.home.name}</p>
      <p>Away Team: {state.teams.away.name}</p>
      {/* Only display goals if the match has already happened */}
      {state.goals.home !== null && <p>Home Goals: {state.goals.home}</p>}
      {state.goals.away !== null && <p>Away Goals: {state.goals.away}</p>}
      <button onClick={handlePrediction}>Get Prediction</button>
      <p>Prediction: {prediction}</p>
    </div>
  );
};

export default PredictionComponent;

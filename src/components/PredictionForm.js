import React, { useState } from 'react';
import { savePrediction } from '../services/footballService';

const PredictionForm = ({ match }) => {
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const predictionData = {
      matchId: match.fixture.id,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      homeScore,
      awayScore,
      createdAt: new Date().toISOString(),
    };

    try {
      await savePrediction(predictionData);
      alert('Prediction saved successfully!');
    } catch (error) {
      alert('Failed to save prediction.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {match.teams.home.name} Score:
        <input
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        {match.teams.away.name} Score:
        <input
          type="number"
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Save Prediction</button>
    </form>
  );
};

export default PredictionForm;

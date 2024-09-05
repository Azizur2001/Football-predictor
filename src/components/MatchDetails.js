import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPremierLeagueFixtures } from '../services/footballService';
import PredictionForm from './PredictionForm';

const MatchDetails = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      const allFixtures = await getPremierLeagueFixtures();
      const matchDetails = allFixtures.find(
        (match) => match.fixture.id === parseInt(matchId)
      );
      setMatch(matchDetails);
      setLoading(false);
    };
    fetchMatch();
  }, [matchId]);

  if (loading) {
    return <div>Loading match data...</div>;
  }

  if (!match) {
    return <div>No match data available</div>;
  }

  return (
    <div>
      <h1>
        {match.teams.home.name} vs {match.teams.away.name}
      </h1>
      <PredictionForm match={match} />
    </div>
  );
};

export default MatchDetails;


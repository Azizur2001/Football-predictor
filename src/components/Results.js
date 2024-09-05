import React, { useState, useEffect } from 'react';
import { getPremierLeagueFixtures } from '../services/footballService';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await getPremierLeagueFixtures();
      // Filter finished matches
      const finishedMatches = data.filter(
        (match) => match.fixture.status.short === 'FT'
      );
      setResults(finishedMatches);
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h1>Premier League Match Results</h1>
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((match) => (
              <tr key={match.fixture.id}>
                <td>{match.teams.home.name}</td>
                <td>{match.teams.away.name}</td>
                <td>
                  {match.goals.home} - {match.goals.away}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results available</p>
      )}
    </div>
  );
};

export default Results;

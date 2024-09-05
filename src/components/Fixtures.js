// import React, { useEffect, useState } from 'react';
// import { getPremierLeagueFixtures } from '../services/footballService';
// import { Link, useNavigate } from 'react-router-dom';

// const Fixtures = () => {
//   const [fixtures, setFixtures] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFixtures = async () => {
//       const data = await getPremierLeagueFixtures();
//       setFixtures(data);
//     };

//     fetchFixtures();
//   }, []);

//   const handlePredictClick = (match) => {
//     // Navigate to the prediction page and pass the match data
//     navigate('/prediction', { state: match });
//   };

//   return (
//     <div>
//       <h1>Premier League Fixtures</h1>
//       {fixtures.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Home Team</th>
//               <th>Away Team</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fixtures.map((match) => (
//               <tr key={match.fixture.id}>
//                 <td>{new Date(match.fixture.date).toLocaleString()}</td>
//                 <td>{match.teams.home.name}</td>
//                 <td>{match.teams.away.name}</td>
//                 <td>{match.fixture.status.short}</td>
//                 <td>
//                   <button onClick={() => handlePredictClick(match)}>
//                     Predict
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No fixtures available</p>
//       )}
//     </div>
//   );
// };

// export default Fixtures;



import React, { useEffect, useState } from 'react';
import { getPremierLeagueFixtures } from '../services/footballService';
import { Link, useNavigate } from 'react-router-dom';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFixtures = async () => {
      const data = await getPremierLeagueFixtures();
      setFixtures(data);
    };

    fetchFixtures();
  }, []);

  const handlePredictClick = (match) => {
    // Navigate to the prediction page and pass the match data
    navigate('/prediction', { state: match });
  };

  return (
    <div>
      <h1>Premier League Fixtures</h1>
      {fixtures.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((match) => (
              <tr key={match.fixture.id}>
                <td>{new Date(match.fixture.date).toLocaleString()}</td>
                <td>{match.teams.home.name}</td>
                <td>{match.teams.away.name}</td>
                <td>{match.fixture.status.short}</td>
                <td>
                  <button onClick={() => handlePredictClick(match)}>
                    Predict
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No fixtures available</p>
      )}
    </div>
  );
};

export default Fixtures;

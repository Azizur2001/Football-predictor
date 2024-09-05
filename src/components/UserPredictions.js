import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const UserPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchPredictions = async () => {
      const q = query(collection(db, 'predictions'));
      const querySnapshot = await getDocs(q);
      const allPredictions = [];
      querySnapshot.forEach((doc) => {
        allPredictions.push({ ...doc.data(), id: doc.id });
      });
      console.log("Fetched all predictions:", allPredictions);
      setPredictions(allPredictions);
    };
  
    fetchPredictions();
  }, []);
  
  

  return (
    <div>
      <h1>My Predictions</h1>
      {predictions.length > 0 ? (
        <ul>
          {predictions.map((prediction) => (
            <li key={prediction.id}>
              {prediction.homeTeam} vs {prediction.awayTeam}: {prediction.homeScore}-{prediction.awayScore}
            </li>
          ))}
        </ul>
      ) : (
        <p>No predictions found.</p>
      )}
    </div>
  );
};

export default UserPredictions;

// testimport axios from 'axios';
import axios from 'axios';
import { db } from '../firebase'; // Import from firebase.js instead of firebaseConfig.js
import { collection, addDoc } from 'firebase/firestore';

const apiKey = '6452d3eb19msh019080b372c3459p1ad70bjsn4667663c6fb6';
const apiHost = 'v3.football.api-sports.io';


export const getPremierLeagueFixtures = async () => {
  try {
    const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
      params: { league: '39', season: '2024' }, // League ID for Premier League is 39
      headers: {
        'X-RapidAPI-Key': '6452d3eb19msh019080b372c3459p1ad70bjsn4667663c6fb6',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    console.log('API Response:', response.data); // Add this line to debug
    return response.data.response;
  } catch (error) {
    console.error('Error fetching Premier League fixtures:', error);
    return [];
  }
};

export const getPremierLeagueStandings = async () => {
  try {
    const response = await axios.get(`https://${apiHost}/standings`, {
      params: {
        league: 39, // Premier League ID
        season: 2023, // Current season
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
};

export const getPremierLeagueTeams = async () => {
  try {
    const response = await axios.get(`https://${apiHost}/teams`, {
      params: {
        league: 39, // Premier League ID
        season: 2023, // Current season
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

export const savePrediction = async (predictionData) => {
  try {
    await addDoc(collection(db, 'predictions'), predictionData);
    console.log('Prediction saved successfully!');
  } catch (error) {
    console.error('Error saving prediction:', error);
    throw new Error('Failed to save prediction.');
  }
};


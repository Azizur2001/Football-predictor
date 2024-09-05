// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 4000;
// const API_KEY = process.env.REACT_APP_API_KEY || '4f6adbe8b2d2473185ea51ac13b5d620';

// app.use(cors());

// // API Route for fetching a specific match by matchId
// app.get('/api/fixtures/:matchId', async (req, res) => {
//   const { matchId } = req.params;
//   try {
//     const response = await axios.get(`https://api.football-data.org/v4/matches/${matchId}`, {
//       headers: {
//         'X-Auth-Token': API_KEY,
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error(`Error fetching match with ID ${matchId} from Football API:`, error);
//     res.status(500).send('Server Error');
//   }
// });


// // Serve static files from the React app's build folder
// app.use(express.static(path.join(__dirname, 'build')));

// // Handle any other requests by sending back the React app's index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = 'YOUR_API_KEY_HERE';

app.use(cors());

app.get('/api/fixtures', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions/PL/matches', {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Football API:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

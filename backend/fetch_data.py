import requests
import pandas as pd
import os

# Your actual API key
api_key = '6452d3eb19msh019080b372c3459p1ad70bjsn4667663c6fb6'
api_url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures'

# Headers for the API request
headers = {
    'X-RapidAPI-Key': api_key,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
}

# Fetch data for each season from 2018 to 2024
seasons = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']

all_matches = []

for season in seasons:
    params = {
        'league': '39',  # Premier League (example)
        'season': season,
        'from': f'{season}-01-01',  # Start date
        'to': f'{season}-12-31'  # End date
    }
    
    # Make the API request
    response = requests.get(api_url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()['response']
        print(f"Fetched {len(data)} fixtures for season {season}")
        
        # Prepare the data
        for fixture in data:
            match_info = {
                'Date': fixture['fixture']['date'],
                'HomeTeam': fixture['teams']['home']['name'],
                'AwayTeam': fixture['teams']['away']['name'],
                'HomeGoals': fixture['goals']['home'],
                'AwayGoals': fixture['goals']['away'],
                'Outcome': '1' if fixture['teams']['home']['winner'] else ('2' if fixture['teams']['away']['winner'] else '0')
            }
            all_matches.append(match_info)
    else:
        print(f"Failed to fetch data for season {season}. Status code:", response.status_code)

# Convert to a DataFrame
df = pd.DataFrame(all_matches)

# Define the file path
file_path = 'data/historical_match_data.csv'

# Check if the file exists
if not os.path.isfile(file_path):
    # If the file doesn't exist, save the data (create a new file)
    df.to_csv(file_path, index=False)
else:
    # If the file exists, append the new data to it
    df.to_csv(file_path, mode='a', header=False, index=False)

print(f"Data fetched and appended to '{file_path}'")

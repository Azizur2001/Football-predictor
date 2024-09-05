import requests

response = requests.post('http://127.0.0.1:5000/predict', json={
    'home_team': 'Manchester United',
    'away_team': 'Liverpool',
    'home_goals': 6,
    'away_goals': 4,
    'status': 'NS'  # or 'FT'

})

print(response.text)  # Print the raw response text

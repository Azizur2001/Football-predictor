# Gives better percentage (56%) (this one is good)
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import cross_val_score
from sklearn.metrics import make_scorer, accuracy_score
from sklearn.multiclass import OneVsRestClassifier
import joblib

# Load the historical data
data = pd.read_csv('data/historical_match_data.csv')

# Prepare team names
team_names = np.unique(data[['HomeTeam', 'AwayTeam']].values)
team_encoding = OneHotEncoder(sparse_output=False).fit(team_names.reshape(-1, 1))

# One-hot encode the teams
home_dummies = team_encoding.transform(data['HomeTeam'].values.reshape(-1, 1))
away_dummies = team_encoding.transform(data['AwayTeam'].values.reshape(-1, 1))

# Combine home and away features
X = np.concatenate([home_dummies, away_dummies], axis=1)

# Define the target variable y
y = np.sign(data['HomeGoals'] - data['AwayGoals'])

# Initialize the logistic regression model with regularization
logistic_model = LogisticRegression(penalty='l2', fit_intercept=False, C=1)

# Wrap the logistic model in OneVsRestClassifier to handle multiclass
model = OneVsRestClassifier(logistic_model)

# Cross-validation
scores = cross_val_score(model, X, y, cv=5, scoring=make_scorer(accuracy_score))
print(f"Cross-validation scores: {scores}")
print(f"Average cross-validation score: {scores.mean()}")

# Train the model on the full dataset
model.fit(X, y)

# Save the model and the encoder
joblib.dump(model, 'logistic_regression_match_predictor.pkl')
joblib.dump(team_encoding, 'team_encoding.pkl')





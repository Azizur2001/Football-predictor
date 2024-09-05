# main 
# import joblib
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np

# # Load the trained model and label encoder
# model = joblib.load('logistic_regression_match_predictor.pkl')
# team_encoding = joblib.load('team_encoding.pkl')

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json(force=True)
#         home_team = data['home_team']
#         away_team = data['away_team']
#         home_goals = int(data['home_goals'])
#         away_goals = int(data['away_goals'])

#         # Encode the team names using the same OneHotEncoder used in training
#         home_team_encoded = team_encoding.transform(np.array([[home_team]]))
#         away_team_encoded = team_encoding.transform(np.array([[away_team]]))

#         # Combine home and away features
#         input_features = np.concatenate([home_team_encoded, away_team_encoded], axis=1)

#         # Add goal difference as a feature
#         goal_difference = np.array([[home_goals - away_goals]])
#         input_features = np.concatenate([input_features, goal_difference], axis=1)

#         # Debug: Check the number of features
#         print(f"Prediction Feature count: {input_features.shape[1]}")  # Should output 66

#         # Remove any potential extra feature
#         if input_features.shape[1] > 66:
#             input_features = input_features[:, :66]  # Trim to the first 66 features

#         # Make a prediction
#         prediction = model.predict(input_features)[0]
#         prediction_proba = model.predict_proba(input_features)[0]

#         # Convert the numerical outcome back to a human-readable format
#         if prediction == 1:
#             result = "Home Win"
#         elif prediction == -1:
#             result = "Away Win"
#         else:
#             result = "Draw"

#         return jsonify({
#             'prediction': result,
#             'probabilities': {
#                 'Home Win': prediction_proba[2],  # Assuming Home Win corresponds to 1
#                 'Draw': prediction_proba[1],      # Assuming Draw corresponds to 0
#                 'Away Win': prediction_proba[0]   # Assuming Away Win corresponds to -1
#             }
#         })
#     except ValueError as e:
#         print(f'ValueError: {str(e)}')
#         return jsonify({'error': f'ValueError: {str(e)}'}), 400
#     except Exception as e:
#         print(f'Exception: {str(e)}')
#         return jsonify({'error': f'Exception: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(debug=True)



# testing for matches labeled 'NS'
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# Load the trained model and label encoder
model = joblib.load('logistic_regression_match_predictor.pkl')
team_encoding = joblib.load('team_encoding.pkl')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        home_team = data['home_team']
        away_team = data['away_team']
        home_goals = data.get('home_goals')
        away_goals = data.get('away_goals')

        # If goals are provided, assume match is finished (FT) and return the actual outcome
        if home_goals is not None and away_goals is not None:
            home_goals = int(home_goals)
            away_goals = int(away_goals)
            if home_goals > away_goals:
                result = "Home Win"
            elif home_goals < away_goals:
                result = "Away Win"
            else:
                result = "Draw"
            return jsonify({'prediction': result, 'message': 'Based on actual scoreline'})
        
        # For NS (Not Started) matches, predict based on the model
        else:
            # Encode the team names using the same OneHotEncoder used in training
            home_team_encoded = team_encoding.transform(np.array([[home_team]]))
            away_team_encoded = team_encoding.transform(np.array([[away_team]]))

            # Combine home and away features
            input_features = np.concatenate([home_team_encoded, away_team_encoded], axis=1)

            # Add a placeholder for goal difference for NS matches
            goal_difference = np.array([[0]])  # Placeholder since the match hasn't been played
            input_features = np.concatenate([input_features, goal_difference], axis=1)

            # Debug: Check the number of features
            print(f"Prediction Feature count: {input_features.shape[1]}")  # Should output 66

            # Remove any potential extra feature
            if input_features.shape[1] > 66:
                input_features = input_features[:, :66]  # Trim to the first 66 features

            # Make a prediction
            prediction = model.predict(input_features)[0]
            prediction_proba = model.predict_proba(input_features)[0]

            # Convert the numerical outcome back to a human-readable format
            if prediction == 1:
                result = "Home Win"
            elif prediction == -1:
                result = "Away Win"
            else:
                result = "Draw"

            return jsonify({
                'prediction': result,
                'probabilities': {
                    'Home Win': prediction_proba[2],  # Assuming Home Win corresponds to 1
                    'Draw': prediction_proba[1],      # Assuming Draw corresponds to 0
                    'Away Win': prediction_proba[0]   # Assuming Away Win corresponds to -1
                }
            })
    except ValueError as e:
        print(f'ValueError: {str(e)}')
        return jsonify({'error': f'ValueError: {str(e)}'}), 400
    except Exception as e:
        print(f'Exception: {str(e)}')
        return jsonify({'error': f'Exception: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

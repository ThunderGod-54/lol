from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime
import hashlib
import os

app = Flask(__name__)
CORS(app)

# Secret key for JWT
app.config['SECRET_KEY'] = 'your-secret-key-here'

# In-memory storage for demo (replace with database later)
users = {}

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token(user_id, user_type):
    payload = {
        'user_id': user_id,
        'user_type': user_type,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type', 'student')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if email in users:
        return jsonify({'error': 'User already exists'}), 400

    # Create user
    user_id = str(len(users) + 1)
    users[email] = {
        'id': user_id,
        'email': email,
        'password': hash_password(password),
        'user_type': user_type,
        'name': '',
        'phone': '',
        'institution_type': '',  # 'college' or 'school'
        'branch': '',  # for college
        'interests': [],  # for school
        'onboarded': False
    }

    # Generate token
    token = generate_token(user_id, user_type)

    return jsonify({
        'message': 'User created successfully',
        'token': token,
        'user': {
            'id': user_id,
            'email': email,
            'user_type': user_type
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type', 'student')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = users.get(email)
    if not user or user['password'] != hash_password(password):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Generate token
    token = generate_token(user['id'], user['user_type'])

    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': user['id'],
            'email': user['email'],
            'user_type': user['user_type']
        }
    }), 200

@app.route('/api/auth/google', methods=['POST'])
def google_auth():
    data = request.get_json()
    user_type = data.get('user_type', 'student')

    # Simulate Google auth - in real app, verify Google token
    user_id = str(len(users) + 1)
    email = f'google_user_{user_id}@example.com'

    users[email] = {
        'id': user_id,
        'email': email,
        'password': '',  # No password for OAuth
        'user_type': user_type,
        'name': '',
        'phone': '',
        'institution_type': '',  # 'college' or 'school'
        'branch': '',  # for college
        'interests': [],  # for school
        'onboarded': False
    }

    token = generate_token(user_id, user_type)

    return jsonify({
        'message': 'Google auth successful',
        'token': token,
        'user': {
            'id': user_id,
            'email': email,
            'user_type': user_type
        }
    }), 200

@app.route('/api/auth/github', methods=['POST'])
def github_auth():
    data = request.get_json()
    user_type = data.get('user_type', 'student')

    # Simulate GitHub auth - in real app, verify GitHub token
    user_id = str(len(users) + 1)
    email = f'github_user_{user_id}@example.com'

    users[email] = {
        'id': user_id,
        'email': email,
        'password': '',  # No password for OAuth
        'user_type': user_type,
        'name': '',
        'phone': '',
        'institution_type': '',  # 'college' or 'school'
        'branch': '',  # for college
        'interests': [],  # for school
        'onboarded': False
    }

    token = generate_token(user_id, user_type)

    return jsonify({
        'message': 'GitHub auth successful',
        'token': token,
        'user': {
            'id': user_id,
            'email': email,
            'user_type': user_type
        }
    }), 200

@app.route('/api/auth/verify', methods=['GET'])
def verify_token():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'error': 'Token is required'}), 401

    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]

        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user = users.get(payload['user_id'])

        if not user:
            return jsonify({'error': 'User not found'}), 401

        return jsonify({
            'user': {
                'id': user['id'],
                'email': user['email'],
                'user_type': user['user_type'],
                'onboarded': user.get('onboarded', False)
            }
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

@app.route('/api/auth/onboard', methods=['POST'])
def onboard_user():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'error': 'Token is required'}), 401

    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]

        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = payload['user_id']

        # Find user by ID
        user = None
        for email, user_data in users.items():
            if user_data['id'] == user_id:
                user = user_data
                user_email = email
                break

        if not user:
            return jsonify({'error': 'User not found'}), 401

        data = request.get_json()
        name = data.get('name')
        phone = data.get('phone')
        institution_type = data.get('institution_type')  # 'college' or 'school'
        branch = data.get('branch', '')  # for college
        interests = data.get('interests', [])  # for school

        if not name or not phone or not institution_type:
            return jsonify({'error': 'Name, phone, and institution type are required'}), 400

        # Update user data
        user['name'] = name
        user['phone'] = phone
        user['institution_type'] = institution_type
        user['branch'] = branch
        user['interests'] = interests
        user['onboarded'] = True

        return jsonify({
            'message': 'Onboarding completed successfully',
            'user': {
                'id': user['id'],
                'email': user_email,
                'user_type': user['user_type'],
                'name': user['name'],
                'phone': user['phone'],
                'institution_type': user['institution_type'],
                'branch': user['branch'],
                'interests': user['interests'],
                'onboarded': user['onboarded']
            }
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)

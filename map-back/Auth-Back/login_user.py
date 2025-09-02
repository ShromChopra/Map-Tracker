from flask import Blueprint, request, jsonify
from db import get_db_connection

login_user_bp = Blueprint('login_user_bp', __name__)

@login_user_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT id, email FROM t_user WHERE username = %s AND password = %s;",
        (username, password)
    )
    user = cur.fetchone()
    cur.close()
    conn.close()

    if user:
        return jsonify({'message': 'Login successful', 'user_id': user[0], 'email': user[1]}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

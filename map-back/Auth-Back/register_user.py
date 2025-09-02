from flask import Blueprint, request, jsonify
from db import get_db_connection

register_bp = Blueprint('register_bp', __name__)

@register_bp.route('/api/register', methods=['POST'])
def register():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO T_USER (username, email, password) VALUES (%s, %s, %s) RETURNING id;",
        (username, email, password)
    )
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': 'User created', 'user_id': user_id}), 201




import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Config'))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Auth-Back'))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Controllers'))

from flask import Flask
from flask_cors import CORS
from db import get_db_connection
from register_user import register_bp
from login_user import login_user_bp
from Map_Controller import map_controller # placeholder



app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
app.register_blueprint(register_bp)
app.register_blueprint(login_user_bp)
app.register_blueprint(map_controller)

@app.route('/')
def index():
	conn = get_db_connection()
	cur = conn.cursor()
	cur.execute('SELECT version();')
	db_version = cur.fetchone()
	cur.close()
	conn.close()
	return f'Connected to PostgreSQL!<br>DB Version: {db_version[0]}'

if __name__ == '__main__':
	app.run(debug=True, port=5050)

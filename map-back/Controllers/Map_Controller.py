from flask import Blueprint, jsonify
import psycopg2
import os

map_controller = Blueprint('map_controller', __name__)

def get_db_connection():
	conn = psycopg2.connect(
		dbname='maptracker',
		user='mapuser',
		password=os.getenv('MAPTRACKER_DB_PASSWORD', ''),
		host='localhost'
	)
	return conn

@map_controller.route('/api/crime-data', methods=['GET'])
def get_crime_data():
	conn = get_db_connection()
	cur = conn.cursor()
	cur.execute('SELECT * FROM t_crime_data;')
	rows = cur.fetchall()
	columns = [desc[0] for desc in cur.description]
	data = [dict(zip(columns, row)) for row in rows]
	cur.close()
	conn.close()
	return jsonify(data)

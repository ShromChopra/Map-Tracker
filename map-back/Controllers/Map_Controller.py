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

@map_controller.route('/api/crime-types', methods=['GET'])
def get_crime_types():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, crime_type FROM t_criminal_activity_type;')
    rows = cur.fetchall()
    data = [{'id': row[0], 'crime_type': row[1]} for row in rows]
    cur.close()
    conn.close()
    return jsonify(data)

@map_controller.route('/api/method-types', methods=['GET'])
def get_method_types():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, method_type FROM t_crime_method;')
    rows = cur.fetchall()
    data = [{'id': row[0], 'method_type': row[1]} for row in rows]
    cur.close()
    conn.close()
    return jsonify(data)

import psycopg2
import configparser

import os
config = configparser.ConfigParser()
config.read(os.path.join(os.path.dirname(__file__), 'db.properties'))

def get_db_connection():
    conn = psycopg2.connect(
        host=config['postgres']['host'],
        dbname=config['postgres']['dbname'],
        user=config['postgres']['user'],
        password=config['postgres']['password']
    )
    return conn

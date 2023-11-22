from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import mysql.connector
from mysql.connector import Error

# Connect to MySQL database
conn = mysql.connector.connect(
    host='localhost',
    database='sql_project',
    user='root',
    password=''
)

app = Flask(__name__)
CORS(app)
@app.route('/root', methods=['GET'])
@cross_origin()

def root():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            database='sql_project',
            user='root',
            password=''
        )
        # Check if database is empty 
        if conn.is_connected():
            print('Connected to MySQL database')
            cursor = conn.cursor()
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            if len(tables) != 0:
                for table in tables:
                    cursor.execute("DROP TABLE " + table[0])

        return jsonify({
            "code": 200,
            "message": "Database ready"
        })
    except Error as e:
        return jsonify({
            "code": 500,
            "message": "Internal server error"
        })

@app.route('/execute', methods=['POST'])
@cross_origin()

def execute():
    # Return POST request data
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        return jsonify({
            "code": 200,
            "message": "Success",
            "data": json
        })
    else:
        return jsonify({
            "code": 400,
            "message": "Bad request"
        })

if __name__ == '__main__':
    app.run()
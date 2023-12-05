from email.iterators import _structure
from turtle import st
from colorama import Cursor
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from collections.abc import Iterable
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
        # Check if database is empty 
        if conn.is_connected():
            print('Connected to MySQL database')
            cursor = conn.cursor()
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            if len(tables) == 5:
                tables = [["contenu"], ["commandes"], ["panier"], ["produits"], ["utilisateurs"]]
            if len(tables) != 0:
                for table in tables:
                    print("Dropping table " + str(table[0]))
                    cursor.execute("DROP TABLE " + str(table[0]))
        return jsonify({
            "code": 200,
            "message": "Database ready"
        })
    except Error as e:
        return jsonify({
            "code": 500,
            "message": "Internal server error",
            "result": str(e)
        })

@app.route('/execute', methods=['POST'])
@cross_origin()

def execute():
    # Return POST request data
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        sql = request.json
        cursor = conn.cursor()
        try:
            cursor.execute(str(sql)) # Creation of table
            structure = cursor.description 
            return jsonify({
                "code": 200,
                "message": "Query executed successfully",
                "result": [
                    structure,
                    cursor.fetchall()
                ]
            })
        except Error as e:
            return jsonify({
                "code": 400,
                "message": "Bad request",
                "result": str(e)
            })
    else:
        return jsonify({
            "code": 400,
            "message": "Bad request"
        })

if __name__ == '__main__':
    app.run()
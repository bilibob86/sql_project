from flask import Flask, jsonify
import mysql.connector
from mysql.connector import Error

# Show all the data in the database

app = Flask(__name__)
@app.route('/', methods=['GET'])

def search_all():
    # Connexion to the database
    conn = mysql.connector.connect(
        host='localhost',
        database='word_quest',
        user='root',
        password=''
    )
    if conn.is_connected():
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()
        return jsonify(rows)


if __name__ == '__main__':
    app.run(debug=True)
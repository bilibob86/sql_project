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

app = Flask(__name__) # Create Flask app    
CORS(app) # Enable CORS
@app.route('/root', methods=['GET']) # Create route
@cross_origin()

def root():
    """
    Returns a JSON response which indicates if the server is running and if the database is ready.
    
    This function handles the '/root' endpoint of the API. It expects a GET request.
    The function checks if the server is running and if the database is ready.
    The function returns a JSON response with a status code, a message, and a result.
    If the server is running and the database is ready, the result is 'Server is running and database is ready'.
    If the server is running but the database is not ready, the result is 'Server is running but database is not ready'.
    If the server is not running, the result is 'Server is not running'.

    Returns:
        JSON response containing the server status. The response has the following structure:
        {
            "code": <status_code>,
            "message": <message>,
            "result": <result>
        }
        - <status_code>: The status code of the response (200 for success, 500 for internal server error).
        - <message>: A message describing the status of the server.
        - <result>: The result of the server status check.
    """
    try:
        # Check if server is running
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
                    cursor.execute("DROP TABLE " + str(table[0])) # Delete table
        # Return JSON response
        return jsonify({
            "code": 200,
            "message": "Database ready"
        })
    except Error as e:
        # Return JSON response
        return jsonify({
            "code": 500,
            "message": "Internal server error",
            "result": str(e)
        })

@app.route('/execute', methods=['POST'])
@cross_origin()
def execute():
    """
    Executes a SQL query received through a POST request.

    This function handles the '/execute' endpoint of the API. It expects a POST request with a JSON body containing a SQL query.
    The function checks if the request is in JSON format and then executes the SQL query using a cursor object.
    If the query is executed successfully, the function retrieves the query structure and the result set.
    The function returns a JSON response with a status code, a message, and the query structure along with the result set.
    If there is an error executing the query, the function returns a JSON response with a status code, a message, and the error message.

    Returns:
        JSON response containing the execution result. The response has the following structure:
        {
            "code": <status_code>,
            "message": <message>,
            "result": [
                <query_structure>,
                <result_set>
            ]
        }
        - <status_code>: The status code of the response (200 for success, 400 for bad request).
        - <message>: A message describing the status of the execution.
        - <query_structure>: The structure of the executed query.
        - <result_set>: The result set of the executed query.
    """
    # Check if request is JSON
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        sql = request.json
        cursor = conn.cursor() # Create cursor
        try:
            cursor.execute(str(sql)) # Execute query
            structure = cursor.description # Get query structure
            # Return JSON response
            return jsonify({
                "code": 200,
                "message": "Query executed successfully",
                "result": [
                    structure,
                    cursor.fetchall()
                ]
            })
        except Error as e:
            # Return JSON response if error with mysql error
            return jsonify({
                "code": 400,
                "message": "Bad request",
                "result": str(e)
            })
    else:
        # Return JSON response if request is not JSON
        return jsonify({
            "code": 400,
            "message": "Bad request"
        })

if __name__ == '__main__':
    # Run server
    app.run()
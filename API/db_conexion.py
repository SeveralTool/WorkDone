from flask import Flask, request
import mysql.connector
from flask import jsonify
from flask_cors import CORS
from datetime import datetime

# Crea una conexión a la base de datos
connection = mysql.connector.connect(
  host='127.0.0.1',
  user='root',
  password='',
  database='tasks-app',
  charset="utf8mb4",  # Establecer la codificación de caracteres
)

# Crea la aplicación Flask
app = Flask(__name__)
CORS(app)


#TRAER TAREAS DEL USUARIO
@app.route('/getTasks/<int:id>', methods=['GET'])
def UserTasks(id):
    with connection.cursor() as cursor:
        sql = 'SELECT description, status, user_id, task_id, tasks.create_date FROM tasks WHERE user_id = %s ORDER BY tasks.create_date DESC;'
        cursor.execute(sql,(id,))
        results = cursor.fetchall()
        print(results)
        return results

#DELETE DE TAREAS
@app.route('/deleteTask/<int:user_id>/<int:task_id>')
def DelTasks(user_id, task_id):
    with connection.cursor() as cursor:
        sql = 'DELETE FROM tasks WHERE user_id = %s AND task_id = %s;'
        cursor.execute(sql, (user_id, task_id))
        connection.commit()
        return 'Task deleted successfully'

#CAMBIAR STATUS DE TAREAS
@app.route('/changeStatus/<int:user_id>/<int:task_id>')
def changeStatus(user_id, task_id):
    with connection.cursor() as cursor:
        sql = 'UPDATE tasks SET status = CASE WHEN status = 0 THEN 1 ELSE 0 END WHERE tasks.user_id= %s AND tasks.task_id= %s;'
        cursor.execute(sql, (user_id, task_id))
        connection.commit()
        return 'Status update successfuly'


#AGREGAR TAREAS
@app.route('/addTask/<int:user_id>/<string:description>', methods=['GET'])
def addTask(user_id, description):
    date_now = datetime.now()
    with connection.cursor() as cursor:
        sql = 'INSERT INTO tasks (user_id, task_id, description, create_date, status) VALUES (%s, "", %s, %s,0);'
        cursor.execute(sql, (user_id, description, date_now))
        connection.commit()
        return 'Task add successfully'

# MALA FORMA!!!!
# #OBTENER DATOS DEL USUARIO
# @app.route('/getuserdata/<string:email>', methods=['GET'])
# def get_user_data(email):
#     with connection.cursor() as cursor:
#         sql = 'SELECT id, email, password, name FROM users WHERE users.email LIKE %s;'
#         cursor.execute(sql, (email,))
#         results = cursor.fetchall()
#         print(results)
#         return results
    
# BUENA FORMA!!!!
@app.route('/getuserdata', methods=['GET'])
def get_user_data():
    email = request.args.get('email')
    with connection.cursor() as cursor:
        sql = 'SELECT id, email, password, name FROM users WHERE email = %s;'
        cursor.execute(sql, (email,))
        results = cursor.fetchall()
        user_data = results
        return jsonify(user_data), 200

#CREAR NUEVOS USUARIOS
@app.route('/pushnewuser', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    with connection.cursor() as cursor:
        sql = 'INSERT INTO users (name, email, password) VALUES(%s, %s, %s);'
        cursor.execute(sql, (name, email, password))
        connection.commit()
    return jsonify("sql execute successfuly"), 200


# Ejecuta la aplicación Flask
if __name__ == '__main__':
  app.run(debug=True)
  app.config['JSON_AS_ASCII'] = False

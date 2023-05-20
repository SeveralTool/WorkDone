from flask import Flask, request
import mysql.connector
from flask import jsonify
from flask_cors import CORS

# Crea una conexión a la base de datos
connection = mysql.connector.connect(
  host='127.0.0.1',
  user='root',
  password='',
  database='tasks-app'
)

# Crea la aplicación Flask
app = Flask(__name__)
CORS(app)


#TRAER TAREAS DEL USUARIO
@app.route('/getTasks/<int:id>')
def UserTasks(id):
    with connection.cursor() as cursor:
        sql = 'SELECT description, status, user_id, task_id, tasks.create_date FROM tasks WHERE user_id = %s ORDER BY tasks.create_date DESC;'
        cursor.execute(sql,(id,))
        results = cursor.fetchall()
        print(results)
        return jsonify(results)

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


# Ejecuta la aplicación Flask
if __name__ == '__main__':
  app.run(debug=True)

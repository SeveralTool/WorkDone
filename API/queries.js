// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: '',
//   password: '',
//   database: 'tasks-app'
// });

// connection.connect((error) => {
//   if (error) {
//     console.error('Error de conexión:', error);
//   } else {
//     console.log('Conexión exitosa a la base de datos!');
//   }
// });

// const query = 'SELECT * FROM tu_tabla';

// var res = connection.query(query, (error, results) => {
//   if (error) {
//     console.error('Error en la consulta:', error);
//   } else {
//     console.log('Resultados de la consulta:', results);
//   }
// });

// const http = require('http');

// const server = http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write(res);
//   response.end();
// });

// const port = 5000;

// server.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });

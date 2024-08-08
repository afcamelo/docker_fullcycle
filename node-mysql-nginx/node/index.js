const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'pancadadb'
}

const names = ['Ana', 'Manu', 'Julia', 'Maíra'];

const connection = mysql.createConnection(dbConfig);

app.get('/', (req, res) => {  
  let template = '<h1>Full Cycle Rocks!</h1>';

  const insertQuery = 'INSERT INTO people(name) VALUES ?';
  const values = names.map(name => [name]);
  connection.query(insertQuery, [values])

  connection.query('select * from people', (err, result, fields) => {
    result.forEach(person => template += `<h4>${ person.id } - ${ person.name }</h4>`);

    res.send(template);
  })
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
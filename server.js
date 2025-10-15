const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect or create DB
const db = new sqlite3.Database('./todo.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL
)`);

// Get all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

//  Add todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  db.run('INSERT INTO todos (task) VALUES (?)', [task], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID, task });
  });
});

//  Update todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  db.run('UPDATE todos SET task = ? WHERE id = ?', [task, id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ updated: this.changes });
  });
});

//  Delete todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

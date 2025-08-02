const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbPath = path.resolve(__dirname, '../api/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// API Routes

// Get all chamados
app.get('/post/read.php', (req, res) => {
    const sql = 'SELECT * FROM chamados ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get a single chamado by ID
app.get('/post/read_one.php', (req, res) => {
    const id = req.query.id;
    const sql = 'SELECT * FROM chamados WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Create a new chamado
app.post('/post/create.php', (req, res) => {
    const { titulo, setor, nome, categoria, justificativa, metrica, descricao, previsao_entrega, status } = req.body;
    const sql = `INSERT INTO chamados (titulo, setor, nome, categoria, justificativa, metrica, descricao, previsao_entrega, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [titulo, setor, nome, categoria, justificativa, metrica, descricao, previsao_entrega, status];
    
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Chamado Criado',
            id: this.lastID
        });
    });
});

// Update a chamado
app.put('/post/update.php', (req, res) => {
    const { id, previsao_entrega, status } = req.body;
    const sql = `UPDATE chamados set 
                 previsao_entrega = COALESCE(?, previsao_entrega), 
                 status = COALESCE(?, status) 
                 WHERE id = ?`;
    const params = [previsao_entrega, status, id];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Chamado Atualizado', changes: this.changes });
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

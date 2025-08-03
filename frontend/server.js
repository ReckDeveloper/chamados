const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

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

// === User Routes ===

// Register a new user (used by Admin Panel)
app.post('/api/register', (req, res) => {
    const { name, login, password, papel } = req.body;
    if (!name || !login || !password) {
        return res.status(400).json({ error: 'Please provide name, login, and password' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const sql = `INSERT INTO users (name, login, password, papel) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, login, hashedPassword, papel], function(err) {
        if (err) {
            res.status(400).json({ error: 'Login already exists' });
            return;
        }
        res.json({ message: 'User registered successfully', id: this.lastID });
    });
});

// Login a user
app.post('/api/login', (req, res) => {
    const { login, password } = req.body;
    const sql = `SELECT * FROM users WHERE login = ?`;
    db.get(sql, [login], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user || user.status === 0) { // Check if user exists and is active
            return res.status(400).json({ error: 'Invalid credentials or user deactivated' });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', user: { id: user.id, name: user.name, login: user.login, papel: user.papel } });
    });
});

// Get all users (for Admin Panel)
app.get('/api/users', (req, res) => {
    const sql = 'SELECT id, name, login, papel, status FROM users ORDER BY name';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Update a user (for Admin Panel)
app.put('/api/users/:id', (req, res) => {
    const { name, login, papel, status } = req.body;
    const sql = `UPDATE users SET name = ?, login = ?, papel = ?, status = ? WHERE id = ?`;
    db.run(sql, [name, login, papel, status, req.params.id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});


// === Chamado Routes ===

// Get all chamados
app.get('/api/post/read.php', (req, res) => {
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
app.get('/api/post/read_one.php', (req, res) => {
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
app.post('/api/post/create.php', (req, res) => {
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
app.put('/api/post/update.php', (req, res) => {
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

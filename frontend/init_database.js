const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
    try {
        const dbPath = path.resolve(__dirname, '../api/database.sqlite');
        
        // Open the database
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log('Connected to the SQLite database.');

        // Create chamados table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS chamados (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                setor TEXT NOT NULL,
                nome TEXT NOT NULL,
                categoria TEXT,
                justificativa TEXT,
                metrica TEXT,
                descricao TEXT,
                previsao_entrega DATE,
                status TEXT DEFAULT 'Pendente',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                titulo TEXT
            );
        `);
        console.log('Table "chamados" created or already exists.');

        // Create users table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                login TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                papel INTEGER DEFAULT 2,
                status INTEGER DEFAULT 1
            );
        `);
        console.log('Table "users" created or already exists.');

        // Add a default admin user if the table is empty
        const userCount = await db.get(`SELECT count(*) as count FROM users`);
        if (userCount.count === 0) {
            const name = 'admin';
            const login = 'admin';
            const password = 'admin';
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const papel = 1; // 1 for admin, 2 for regular user
            const status = 1; // 1 for activated, 0 for deactivated
            
            await db.run(`INSERT INTO users (name, login, password, papel, status) VALUES (?, ?, ?, ?, ?)`, [name, login, hashedPassword, papel, status]);
            console.log("Created default admin user (login: admin, password: admin, papel: 1, status: 1).");
        }

        // Close the database
        await db.close();
        console.log('Closed the database connection.');

    } catch (err) {
        console.error('Database setup failed:', err.message);
    }
}

setupDatabase();

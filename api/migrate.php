<?php
/**
 * Database Schema Migration Script
 *
 * This script is responsible for initializing or updating the database schema.
 * It should be run from the CLI manually during deployment or development setup.
 * It ensures that the application's database structure is correctly defined.
 */

// Include the refactored database connector.
require_once __DIR__ . '/config/database.php';

try {
    // Obtain the PDO instance using the Singleton pattern.
    $pdo = Database::getInstance();

    echo "Successfully connected to the database.\n";

    // SQL statement for creating the 'chamados' table.
    // Using 'IF NOT EXISTS' makes the script safe to run multiple times.
    $query = "
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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );";

    // Execute the schema creation query.
    $pdo->exec($query);

    echo "Table 'chamados' created or already exists successfully.\n";

    // Add 'titulo' column if it doesn't exist
    $alter_query = "ALTER TABLE chamados ADD COLUMN titulo TEXT";
    try {
        $pdo->exec($alter_query);
        echo "Column 'titulo' added successfully or already exists.\n";
    } catch (PDOException $e) {
        // This will fail if the column already exists, which is fine.
        if (strpos($e->getMessage(), 'duplicate column name') === false) {
            throw $e; // Re-throw if it's a different error
        }
        echo "Column 'titulo' already exists.\n";
    }

} catch (PDOException $e) {
    // If the connection or query fails, output the error to STDERR.
    // The script will exit with a non-zero status code, which is a standard
    // practice for signaling failure in shell environments.
    fwrite(STDERR, "Database migration failed: " . $e->getMessage() . "\n");
    exit(1);
}
?>

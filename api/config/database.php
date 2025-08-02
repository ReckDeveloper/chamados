<?php
/**
 * Database Connection Manager
 *
 * Implements a Singleton pattern to ensure a single, shared PDO connection
 * instance throughout the application's lifecycle. This approach conserves
 * resources by preventing multiple, redundant database connections.
 *
 * Configuration is centralized here, making it easy to manage different
 * environments (development, production) in the future.
 */
class Database {
    // Holds the single instance of the PDO connection.
    private static $instance = null;
    
    // Database configuration. Could be moved to an external .env or .ini file.
    private $db_file;

    /**
     * The constructor is private to prevent direct creation of objects.
     */
    private function __construct() {
        $this->db_file = __DIR__ . '/../database.sqlite';
    }

    /**
     * The clone method is private to prevent cloning of the instance.
     */
    private function __clone() {}

    /**
     * The wakeup method is private to prevent unserialization of the instance.
     */
    public function __wakeup() {}

    /**
     * Provides the global access point to the PDO instance.
     * Creates the connection on the first call and returns the existing
     * instance on subsequent calls.
     *
     * @return PDO The active PDO connection instance.
     * @throws PDOException if the connection fails.
     */
    public static function getInstance() {
        if (self::$instance === null) {
            try {
                // Late static binding to instantiate the class.
                $db = new self();
                $dsn = "sqlite:" . $db->db_file;
                
                self::$instance = new PDO($dsn);
                
                // Set PDO attributes for robust error handling and performance.
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                self::$instance->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

            } catch (PDOException $e) {
                // In a real application, this should be logged to a file, not echoed.
                // For now, re-throwing allows a global handler to catch it.
                throw new PDOException($e->getMessage(), (int)$e->getCode());
            }
        }
        return self::$instance;
    }
}
?>

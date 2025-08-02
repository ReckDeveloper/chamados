<?php
include_once 'api/config/database.php';

$database = new Database();
$db = $database->connect();

if ($db) {
    echo "Banco de dados inicializado com sucesso via CLI.";
} else {
    echo "Erro ao inicializar o banco de dados via CLI.";
}
?>

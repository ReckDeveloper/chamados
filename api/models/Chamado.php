<?php
class Chamado {
    private $conn;
    private $table = 'chamados';

    public $id;
    public $setor;
    public $nome;
    public $categoria;
    public $justificativa;
    public $metrica;
    public $descricao;
    public $previsao_entrega;
    public $status;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT id, setor, nome, categoria, justificativa, metrica, descricao, previsao_entrega, status, created_at FROM ' . $this->table . ' ORDER BY created_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' (setor, nome, categoria, justificativa, metrica, descricao, previsao_entrega, status) VALUES (:setor, :nome, :categoria, :justificativa, :metrica, :descricao, :previsao_entrega, :status)';
        $stmt = $this->conn->prepare($query);

        $this->setor = htmlspecialchars(strip_tags($this->setor));
        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->categoria = htmlspecialchars(strip_tags($this->categoria));
        $this->justificativa = htmlspecialchars(strip_tags($this->justificativa));
        $this->metrica = htmlspecialchars(strip_tags($this->metrica));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->previsao_entrega = htmlspecialchars(strip_tags($this->previsao_entrega));
        $this->status = htmlspecialchars(strip_tags($this->status));

        $stmt->bindParam(':setor', $this->setor);
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':categoria', $this->categoria);
        $stmt->bindParam(':justificativa', $this->justificativa);
        $stmt->bindParam(':metrica', $this->metrica);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':previsao_entrega', $this->previsao_entrega);
        $stmt->bindParam(':status', $this->status);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    public function update() {
        $query = 'UPDATE ' . $this->table . ' SET previsao_entrega = :previsao_entrega, status = :status WHERE id = :id';
        $stmt = $this->conn->prepare($query);

        $this->previsao_entrega = htmlspecialchars(strip_tags($this->previsao_entrega));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':previsao_entrega', $this->previsao_entrega);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
}
?>

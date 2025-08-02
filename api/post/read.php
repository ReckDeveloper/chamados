<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../models/Chamado.php';

try {
    $db = Database::getInstance();
    $chamado = new Chamado($db);

    $result = $chamado->read();
    $num = $result->rowCount();

    if ($num > 0) {
        $chamados_arr = array();
        $chamados_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $chamado_item = array(
                'id' => $id,
                'setor' => $setor,
                'nome' => $nome,
                'categoria' => $categoria,
                'justificativa' => $justificativa,
                'metrica' => $metrica,
                'descricao' => $descricao,
                'previsao_entrega' => $previsao_entrega,
                'status' => $status,
                'created_at' => $created_at
            );
            array_push($chamados_arr['data'], $chamado_item);
        }
        echo json_encode($chamados_arr);
    } else {
        echo json_encode(
            array('data' => array())
        );
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(
        array(
            'message' => 'Database Connection Error: ' . $e->getMessage(),
            'data' => [] 
        )
    );
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(
        array(
            'message' => 'An unexpected error occurred: ' . $e->getMessage(),
            'data' => []
        )
    );
}
?>

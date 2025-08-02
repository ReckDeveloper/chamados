<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/database.php';
include_once '../models/Chamado.php';

$db = Database::getInstance();

$chamado = new Chamado($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $chamado->id = $data->id;
    $chamado->previsao_entrega = $data->previsao_entrega;
    $chamado->status = $data->status;

    if($chamado->update()) {
        echo json_encode(
            array('message' => 'Chamado Atualizado')
        );
    } else {
        echo json_encode(
            array('message' => 'Chamado Nao Atualizado')
        );
    }
} else {
    echo json_encode(
        array('message' => 'Dados incompletos.')
    );
}
?>

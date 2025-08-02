<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/database.php';
include_once '../models/Chamado.php';

$db = Database::getInstance();

$chamado = new Chamado($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->setor) && !empty($data->nome)) {
    $chamado->setor = $data->setor;
    $chamado->nome = $data->nome;
    $chamado->categoria = $data->categoria;
    $chamado->justificativa = $data->justificativa;
    $chamado->metrica = $data->metrica;
    $chamado->descricao = $data->descricao;
    $chamado->previsao_entrega = $data->previsao_entrega;
    $chamado->status = $data->status;

    if($chamado->create()) {
        echo json_encode(
            array('message' => 'Chamado Criado')
        );
    } else {
        echo json_encode(
            array('message' => 'Chamado Nao Criado')
        );
    }
} else {
    echo json_encode(
        array('message' => 'Dados incompletos.')
    );
}
?>

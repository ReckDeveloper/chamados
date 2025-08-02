<?php
$url = 'http://localhost:8000/post/create.php';
$data = array(
    'setor' => 'TI',
    'nome' => 'Teste',
    'categoria' => 'Teste',
    'justificativa' => 'Teste',
    'metrica' => 'Teste',
    'descricao' => 'Teste',
    'previsao_entrega' => '2025-12-31',
    'status' => 'Pendente'
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    echo "Erro ao inicializar o banco de dados.";
} else {
    echo "Banco de dados inicializado com sucesso.";
    echo $result;
}
?>

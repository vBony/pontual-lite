<?php
require '../txtdb.class.php';
if($_POST['action'] && $_POST['action'] == 'getMeses'){
    $db = new txtdb();
    $meses = array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');


    $registros = $db->select('registros');
    $datas = array();
    
    foreach($registros as $registro){
        $data = $meses[$registro['mes'] - 1].' de '.$registro['ano'];
        $datas[$data] = $registro['mes'].';'.$registro['ano'];
    }

    $datas = array_unique($datas, SORT_REGULAR);

    echo json_encode($datas);
}

if($_POST['action'] && $_POST['action'] == 'getRegistroMes'){
    $db = new txtdb();

    if($_POST['mesAno']){
        $mes_ano = explode(';',$_POST['mesAno']);
        $mes = $mes_ano[0];
        $ano = $mes_ano[1];

        $registros = $db->select('registros', array('mes' => $mes, 'ano' => $ano));
        $response = array();
        $i = 0;

        foreach($registros as $registro){
            $i++;
            $response[$i]['registros'] = explode(';', $registro['horarios']);
            $response[$i]['data'] = $registro['dia'].'-'.$registro['mes'];
        }

        echo json_encode($response);
    }
}
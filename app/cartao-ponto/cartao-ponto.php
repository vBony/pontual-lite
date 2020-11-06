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
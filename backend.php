<?php
require 'txtdb.class.php';
if($_POST['registros']){
    $registros_novos = $_POST['registros'];
    $data = $_POST['data'];

    $registros_novos = implode(';', $registros_novos);

    $db = new txtdb();
    
    if($db->select('registros', array('data' => $data))){
        $registros = $db->select('registros', array('data' => $data));
        $id = key($registros);

        $db->update('registros', [
            'horarios' => $registros_novos
        ], $id);
    }else{
        $db->insert('registros', [
            'data' => $data,
            'horarios' => $registros_novos
        ]);
    }
    // $teste = $db->select('registros');

    // print_r($teste);


    // print_r($teste);
}
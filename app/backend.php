<?php
require 'txtdb.class.php';
if($_POST['registros']){
    $registros_novos = $_POST['registros'];
    $data = explode('-', $_POST['data']);
    $dia = $data[0];
    $mes = $data[1];
    $ano = $data[2];

    $registros_novos = implode(';', $registros_novos);

    $db = new txtdb();
    
    if($db->select('registros', array('dia' => $dia,'mes' => $mes,'ano' => $ano))){
        $registros = $db->select('registros', array(
            'dia' => $dia,
            'mes' => $mes,
            'ano' => $ano
        ));

        $id = key($registros);

        $db->update('registros', [
            'horarios' => $registros_novos
        ], $id);
    }else{
        $db->insert('registros', [
            'dia' => $dia,
            'mes' => $mes,
            'ano' => $ano,
            'horarios' => $registros_novos
        ]);
    }
}
    // $teste = $db->select('registros');

    // print_r($teste);


    // print_r($teste);

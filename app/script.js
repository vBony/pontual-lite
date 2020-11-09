$( document ).ready(function(){
    const zeroFill = n => {
        return ('0' + n).slice(-2);
    }
    
    var agora = moment()
    agora.locale('pt-br')
    var horas = agora.format('HH:mm:ss')
    var data = agora.format('DD-MM-YYYY')
    // var data = '09-03-2022';

    document.getElementById('hora').innerHTML = horas;
    document.getElementById('data').innerHTML = data;
    
    var registros = new Array()
    
    setInterval(() => {
        var agora = moment()
        agora.locale('pt-br')

    
        horas = agora.format('HH:mm:ss')
        data = agora.format('DD-MM-YYYY')
    
        document.getElementById('hora').innerHTML = horas;
        document.getElementById('data').innerHTML = data;
    }, 1000)
    
    if(window.localStorage.getItem('registros_'+data) === null || window.localStorage.getItem('registros_'+data) === '[]'){

        $.ajax({
            url: '/app/backend.php',
            method: 'POST',
            data: {action: 'getRegistros', data: data},
            success: function(resp){
                if(resp){

                    var horariosDb = JSON.parse(resp);
                    var key = Object.keys(horariosDb)
                    horariosDb = horariosDb[key]['horarios'].split(';');
                    dbForLocalStorage(horariosDb)
                    renderMarcacoes(horariosDb);

                }else{
                    if(window.localStorage.getItem('registros_'+data) === null){

                        window.localStorage.setItem('registros_'+data, '[]')
                        registros = JSON.parse(window.localStorage.getItem('registros_'+data))
                    
                        var mainElement = document.getElementById('horaRegistrada');
                        var element = document.createElement('p')
                        element.innerHTML = "Nenhum registro encontrado!"
                        mainElement.appendChild(element)

                    }else{

                        registros = JSON.parse(window.localStorage.getItem('registros_'+data))
                    
                        var mainElement = document.getElementById('horaRegistrada');
                        var element = document.createElement('p')
                        element.innerHTML = "Nenhum registro encontrado!"
                        mainElement.appendChild(element)

                    }
                }
            }
        })
    
    }else{
        registros = JSON.parse(window.localStorage.getItem('registros_'+data))
        renderMarcacoes(registros);
    }
    
    
    
    $('#botaoRegistrarHora').on('click', function(){
        registros.push(horas);
        registrarDia();
        window.localStorage.setItem('registros_'+data, JSON.stringify(registros))
    
    
        var mainElement = document.getElementById('horaRegistrada');
        var item = registros[registros.length - 1]
        var element = document.createElement('p')
        element.value = item
        element.innerHTML = "Marcação registrada às: "+item
        mainElement.appendChild(element)
    })
    
    function registrarDia(){
        registrosDia = registros
        // window.localStorage.getItem('registros_'+data)

        $.ajax({
            url: '/app/backend.php',
            method: 'POST',
            data: {registros: registrosDia, data: data},
            dataType: 'json',
            success: function(json){
                console.log(json);
            }

        })
    }

    $('#botaoCartaoPonto').on('click', function(){
        window.location.href = "app/cartao-ponto/";
    });

    function dbForLocalStorage(horarios){
        var jsonHorarios = JSON.stringify(horarios);
        window.localStorage.setItem('registros_'+data, jsonHorarios)
    }

    function renderMarcacoes(marcacoes){
        $('#horasRegistrada').html('');
        for(var i = 0; i < marcacoes.length; i++){
            var mainElement = document.getElementById('horaRegistrada');
            var item = marcacoes[i]
            var element = document.createElement('p')
            element.value = item
            element.innerHTML = "Marcação registrada às: "+item
            mainElement.appendChild(element)
        }
    }
    
})


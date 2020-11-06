$( document ).ready(function(){
    const zeroFill = n => {
        return ('0' + n).slice(-2);
    }
    
    var agora = moment()
    agora.locale('pt-br')
    var horas = agora.format('HH:mm:ss')
    var data = agora.format('DD-MM-YYYY')
    // var data = '06-11-2020';

    document.getElementById('hora').innerHTML = horas;
    document.getElementById('hora-btn').innerHTML = horas;
    document.getElementById('data').innerHTML = data;
    
    var registros = new Array()
    
    setInterval(() => {
        var agora = moment()
        agora.locale('pt-br')

    
        horas = agora.format('HH:mm:ss')
        data = agora.format('DD-MM-YYYY')
    
        document.getElementById('hora').innerHTML = horas;
        document.getElementById('hora-btn').innerHTML = horas;
        document.getElementById('data').innerHTML = data;
    }, 1000)
    
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
    
        for(var i = 0; i < registros.length; i++){
            var mainElement = document.getElementById('horaRegistrada');
            var item = registros[i]
            var element = document.createElement('p')
            element.value = item
            element.innerHTML = "Marcação registrada às: "+item
            mainElement.appendChild(element)
        }
    }
    
    
    
    $('#botaoRegistrarHora').on('click', function(){
        registros.push(horas);
        window.localStorage.setItem('registros_'+data, JSON.stringify(registros))
    
    
        var mainElement = document.getElementById('horaRegistrada');
        var item = registros[registros.length - 1]
        var element = document.createElement('p')
        element.value = item
        element.innerHTML = "Marcação registrada às: "+item
        mainElement.appendChild(element)
    })
    
    $('#botaoFecharDia').on('click', function(){
        registrosDia = registros
        // window.localStorage.getItem('registros_'+data)

        $.ajax({
            url: './backend.php',
            method: 'POST',
            data: {registros: registrosDia, data: data},
            dataType: 'json',
            success: function(json){
                console.log(json);
            }

        })
    })

    $('#hora').on('click', function(){
        var agora = moment()
        console.log(agora.format('DD-MM-YYYY'));
        console.log(agora.format('HH:MM:SS'));
    })
    
})


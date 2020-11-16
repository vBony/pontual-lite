$( document ).ready(function(){
    $.ajax({
        url: '/app/cartao-ponto/cartao-ponto.php',
        method: 'POST',
        data: {action: 'getMeses'},
        success: function(resp){
            var meses = JSON.parse(resp);

            $.each(meses, function(index, value){
                var option = new Option(index, value);
                $(option).html(index, value);
                $('#select-mes').append(option);
            })

        }
    })

    $('#voltar').on('click', function(){
        window.location.href = '/';
    })

    $('#select-mes').on('change', function(){
        var value = $(this).val();

        $.ajax({
            url: '/app/cartao-ponto/cartao-ponto.php',
            method: 'POST',
            data: {mesAno: value, action: 'getRegistroMes'},
            success: function(resp){
                if(resp){
                    var registros = JSON.parse(resp);
                    $('#area-registros').html('');
                    // var horarios = registros['registros'].join('   ');

                    $.each(registros, function(index, value){
                        $('#area-registros').append(
                            "<div class='row-registros'>"+
                                "<div class='data-registros'>"+value['data']+"</div>"+
                                "<div class='horarios-registros'>"+value['registros'].join("     ")+"</div>"
                            +"</div>")
                    });

                    $('#area-registros-wrapper').slideDown('fast')
                }else{
                    $('#area-registros-wrapper').slideUp('fast')
                }
            }
        })
    })



})
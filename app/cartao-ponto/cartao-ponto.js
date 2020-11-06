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
    })



})
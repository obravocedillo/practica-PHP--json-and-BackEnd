/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
let min = 200;
let max = 80000;

function saveData(data){
    min = data.from;
    max = data.to;


}

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/




/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/


function contains(array, obj) {
    var j = array.length;
    let contador = 0;
    if(j == 0){
        array.push(obj)
    }else{
        for(let k=0; k<j; k++){
                if(array[k] == obj){
                    contador += 1;
                }
            }
            if(contador == 0){
                array.push(obj);
            }
        }
    }

function initialize(){
    $.ajax({
        url: "buscador.php",
        method: "POST",
        dataType: "json",
        data:{ busqueda: "todo"},

    }).done(function(response){
        let city = [];
        let tipo = [];
        for(let i=0; i<response.length;i++){
            contains(city,response[i].Ciudad);
            contains(tipo,response[i].Tipo);
        }

        for(let l=0;l<city.length;l++){
            $("#selectCiudad").append("<option value="+city[l]+">"+city[l]+"</option>");
        }

        for(let m=0;m<tipo.length;m++){
            $("#selectTipo").append("<option value="+tipo[m]+">"+tipo[m]+"</option>");
        }
            $('select').material_select();
    });
}

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    onChange: saveData,
    prefix: "$"
  });


}



$( document ).ready(function() {

    inicializarSlider();
    initialize();
    $('select').material_select();


    $("#mostrarTodos").click(function(){
        $(".thing").remove();
        $.ajax({
            url: "buscador.php",
            method: "POST",
            dataType: "json",
            data:{ busqueda: "todo"},

        }).done(function(response){
            let city = [];
            let tipo = [];
            console.log(response);
            for(let i=0; i<response.length;i++){
                $(".colContenido").append("<div class=thing >"+"<div class=card >"+
                "<div class=img-card>"+"<img src=img/home.jpg class=image-1>"+ "</div>"+
                "<div class=card-second-part>"+"<div class=card-content>"+
                "<span><strong>Dirección:</strong>"+response[i].Direccion+"</span>"+
                "<br>"+
                "<span><strong>Ciudad:</strong>"+response[i].Ciudad+"</span>"+
                "<br>"+
                "<span><strong>Teléfono:</strong>"+response[i].Telefono+"</span>"+
                "<br>"+
                "<span><strong>Código Postal:</strong>"+response[i].Codigo_Postal+"</span>"+
                "<br>"+
                "<span><strong>Tipo:</strong>"+response[i].Tipo+"</span>"+
                "<br>"+
                "<span><strong>Precio:</strong>"+response[i].Precio+"</span>"+
                "<br>"+
                "</div>"+ "<div class=card-action>"+ "<a href=#>Ver más</a>"+"</div>"+
                "</div>"+"</div>"+"</div>");
                contains(city,response[i].Ciudad);
                contains(tipo,response[i].Tipo);


            }

            for(let l=0;l<city.length;l++){
                $("#selectCiudad").append("<option value="+city[l]+">"+city[l]+"</option>");

            }

            for(let m=0;m<tipo.length;m++){
                $("#selectTipo").append("<option value="+tipo[m]+">"+tipo[m]+"</option>");


            }

                $('select').material_select();
        });
    });

    $("#buscar").click(function(){
        let citySelected = $('#selectCiudad').find(":selected").text();
        let tipoSelected = $('#selectTipo').find(":selected").text();
        $(".thing").remove();
        $.ajax({
            url: "buscador.php",
            method: "POST",
            dataType: "json",
            data:{
                busqueda: "seleccionada",
                ciudad: citySelected,
                tipo: tipoSelected,
                maximo: max,
                minimo: min,
            },

        }).done(function(response){
            console.log(response);
            for(let i=0; i<response.length;i++){
                $(".colContenido").append("<div class=thing>"+"<div class=card>"+
                "<div class=img-card>"+"<img src=img/home.jpg class=image-1>"+ "</div>"+
                "<div class=card-second-part>"+"<div class=card-content>"+
                "<span><strong>Dirección:</strong>"+response[i].Direccion+"</span>"+
                "<br>"+
                "<span><strong>Ciudad:</strong>"+response[i].Ciudad+"</span>"+
                "<br>"+
                "<span><strong>Teléfono:</strong>"+response[i].Telefono+"</span>"+
                "<br>"+
                "<span><strong>Código Postal:</strong>"+response[i].Codigo_Postal+"</span>"+
                "<br>"+
                "<span><strong>Tipo:</strong>"+response[i].Tipo+"</span>"+
                "<br>"+
                "<span><strong>Precio:</strong>"+response[i].Precio+"</span>"+
                "<br>"+
                "</div>"+ "<div class=card-action>"+ "<a href=#>Ver más</a>"+"</div>"+
                "</div>"+"</div>"+"</div>");
            }
        });

    });

});


$(document).ready(function(){
    
    $(".area-sprite").on("click", resaltarAreasSprite);
    $(".opcion-sprite").on("click", resaltarOpcionSprite);
    mostrarMenu();
    
});


diccionario_imagenes = { 1:"../img/cueva.jpg"
                        ,2:"../img/petroglifo.png"
                        ,3:"../img/amazonas.jpg"
                        ,4:"../img/falcon.jpg"
                        };

var url_imagen_elegida = "";
var dimension_x=3;
var dimension_y=3

function ocultarVistas(){
    $(".vista").css("display","none");
}

function mostrarMenu(){
    ocultarVistas();
    $("#vista-menu").css("display","block");
}

function mostrarDimensiones(){
    ocultarVistas();
    $("#vista-dimensiones").css("display","block");
}

function mostrarJuego(){
    ocultarVistas();
    $("#vista-juego").css("display","block");
}


function jugarYa(){
    
    $("#tablero").remove();
    $("#fila").prepend('<div id="tablero"></div>');
    alert("HOLA");
    dimX = dimension_x;
    dimY = dimension_y;
    url_imagen = url_imagen_elegida;
    alert(url_imagen_elegida);
    
    generarCeldas();
    prepararResponsive();
    comenzarPartida();
    
    mostrarJuego();
}

function seleccionarImagen(numeroImagen){
    
    url_imagen_elegida = diccionario_imagenes[numeroImagen];
}

function seleccionarDimension(x,y){
    dimension_x = parseInt(x,10);
    dimension_y = parseInt(y,10);
}

function resaltarAreasSprite(event){
    
    $(".area-sprite").css({
        "background-color":"initial",
        "opacity": "initial",
        "filter": "initial"
    });
    var areaTocada = $(event.target);
    areaTocada.css({
        "background-color":"white",
        "opacity": "0.5",
        "filter": "alpha(opacity=50)"
    });
    
}

function resaltarOpcionSprite(event){
    
    $(".opcion-sprite").css({
        "background-color":"initial",
        "opacity": "initial",
        "filter": "initial"
    });
    var areaTocada = $(event.target);
    areaTocada.css({
        "background-color":"white",
        "opacity": "0.5",
        "filter": "alpha(opacity=50)"
    });
}


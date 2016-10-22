
$(document).ready(function(){
    
    $(".area-sprite").on("click", resaltarAreasSprite);
    $(".opcion-sprite").on("click", resaltarOpcionSprite);
    mostrarMenu();
    
});


diccionario_imagenes = { 1:"../img/petroglifo.png"
                        ,2:"../img/amazonas.jpg"
                        ,3:"../img/cueva.jpg"
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
    $("#puzzles-deslizantes-educativos-tabla-juego").prepend(
        '<div id="tablero"\
              style="width:100%;\
                     height:100%;\
                     position:relative;\
                     left:0%;\
                     top:0%;\
                     margin: 2.5%;\
                     overflow:hidden;">\
         </div>');
    dimX = dimension_x;
    dimY = dimension_y;
    url_imagen = url_imagen_elegida;
    
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


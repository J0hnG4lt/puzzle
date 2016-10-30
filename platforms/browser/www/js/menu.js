
$(document).ready(function(){
    
    $(".area-sprite").on("click", resaltarAreasSprite);
    $(".opcion-sprite").on("click", resaltarOpcionSprite);
    mostrarMenu();
    
});



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
                <img src="#" alt="icon" id="imagen_seleccionada_tablero"\
                 width="100%" height="100%"\
                 style="position:absolute; top: 0; left: 0;" />\
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
    
    imagenSeleccionadaIndex = numeroImagen;
    url_imagen_elegida = diccionario_imagenes[numeroImagen];
}

function seleccionarDimension(x,y){
    dimension_x = parseInt(x,10);
    dimension_y = parseInt(y,10);
    if ((dimension_x === 3) && (dimension_y === 3)){
        diccionario_posicion_blanca = diccionario_posicion_blanca_3x3;
    }
    else if ((dimension_x === 4) && (dimension_y === 4)){
        diccionario_posicion_blanca = diccionario_posicion_blanca_4x4;
    }
    else if ((dimension_x === 6) && (dimension_y === 6)){
        diccionario_posicion_blanca = diccionario_posicion_blanca_6x6;
    }
    
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


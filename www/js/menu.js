
$(document).ready(function(){
    
    mostrarMenu();
    
});



function ocultarVistas(){
    $(".vista").css("display","none");
}

function mostrarMenu(){
    ocultarVistas();
    $("#vista-menu").css("display","block");
}

function mostrarJuego(){
    alert("ENTRE");
    ocultarVistas();
    $("#vista-juego").css("display","block");
}


function jugarYa(){
    
    $("#tablero").remove();
    $("#fila").append('<div id="tablero"></div>');
    
    var url_imagen_elegida = $("#select-imagen").val();
    var dimension_x = parseInt($("#select-dimension-x").val(),10);
    var dimension_y = parseInt($("#select-dimension-y").val(),10);
    
    dimX = dimension_x;
    dimY = dimension_y;
    url_imagen = url_imagen_elegida;
    
    generarCeldas();
    prepararResponsive();
    comenzarPartida();
    
    mostrarJuego();
}
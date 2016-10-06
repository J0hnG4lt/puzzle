
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
    ocultarVistas();
    $("#vista-juego").css("display","block");
}



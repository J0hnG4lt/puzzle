/*
 *    Universidad Simón Bolívar
 *    Tutora Académica: Angela Di Serio
 *    Representante de la Comunidad y diseñadora: Ruby de Valencia
 *    Programador: Georvic Tur (12-11402)
 *    
 *    Proyecto de Servicio Comunitario
 *        Puzzles Deslizantes Educativos: Manifestaciones Rupestres Venezolanas
*/

var almacen = window.localStorage;

function guardarEstadoAplicacion(){
    
    almacen.setItem("dimX", dimX);
    almacen.setItem("dimY", dimY);
    almacen.setItem("dimension_x", dimension_x);
    almacen.setItem("dimension_y", dimension_y);
    almacen.setItem("dimY", dimY);
    almacen.setItem("url_imagen", url_imagen);
    almacen.setItem("url_imagen_elegida", url_imagen_elegida);
    almacen.setItem("numMovidas", numMovidas);
    almacen.setItem("tipoRepresentacion", tipoRepresentacion);
    almacen.setItem("imagenSeleccionadaIndex", imagenSeleccionadaIndex);
    
    almacen.setItem("vistaActual", vistaActual);
    
    var numeroMovidas = document.getElementById("juego-contador-movidass").innerHTML;
    var tiempoSegundos = $("#juego-segundos").text();
    var tiempoMinutos = $("#juego-minutos").text();
    
    almacen.setItem("numeroMovidas", numeroMovidas);
    almacen.setItem("tiempoSegundos", tiempoSegundos);
    almacen.setItem("tiempoMinutos", tiempoMinutos);
    
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            var celda = $("#celda-"+i+"-"+j);
            var orden = celda.attr("data-order");
            almacen.setItem("celda-"+i+"-"+j+"-data-order", orden);
            
        }
        
    }
    
    
}



function borrarEstadoAplicacion(){
    
    almacen.removeItem("dimX");
    almacen.removeItem("dimY");
    almacen.removeItem("url_imagen");
    almacen.removeItem("url_imagen_elegida");
    almacen.removeItem("numMovidas");
    almacen.removeItem("tipoRepresentacion");
    
    
    almacen.removeItem("imagenSeleccionadaIndex");
    almacen.removeItem("vistaActual");
    
    
    almacen.removeItem("numeroMovidas");
    almacen.removeItem("tiempoSegundos");
    almacen.removeItem("tiempoMinutos");
    
    for (var i = 0; i < dimX; i++){
        for (var j = 0; j < dimY; j++){
            var celda = $("#celda-"+i+"-"+j);
            almacen.removeItem("celda-"+i+"-"+j+"-data-order");
            
        }
        
    }
    
    var value = almacen.getItem("celda-0-2-data-order");
    
}


function cargarUltimoJuegoGuardado(){
    
    tipoRepresentacion = almacen.getItem("tipoRepresentacion");
    seleccionarTipoRepresentacion(tipoRepresentacion);
    
    if (!tipoRepresentacion){
        return null;
    }
    
    dimX = almacen.getItem("dimX");
    dimY = almacen.getItem("dimY");
    seleccionarDimension(dimX,dimY);
    
    
    url_imagen = almacen.getItem("url_imagen");
    url_imagen_elegida = almacen.getItem("url_imagen_elegida");
    numMovidas = almacen.getItem("numMovidas");
    
    imagenSeleccionadaIndex = almacen.getItem("imagenSeleccionadaIndex");
    seleccionarImagen(imagenSeleccionadaIndex);
    
    
    vistaActual = almacen.getItem("vistaActual");
    
    jugarYa();
    

    
    var numeroMovidas = almacen.getItem("numeroMovidas");
    var tiempoSegundos = almacen.getItem("tiempoSegundos");
    var tiempoMinutos = almacen.getItem("tiempoMinutos");
    
    document.getElementById("juego-contador-movidass").innerHTML = numeroMovidas;
    $("#juego-segundos").text(tiempoSegundos);
    $("#juego-minutos").text(tiempoMinutos);
    
    for (var i = 0; i < dimX; i++){
        for (var j = 0; j < dimY; j++){
            var celda = $("#celda-"+i+"-"+j);
            var ordenCelda = almacen.getItem("celda-"+i+"-"+j+"-data-order");
            celda.attr("data-order", ordenCelda);
            actualizarPosicionCelda(celda, ordenCelda);
            
        }
        
    }
    var value = almacen.getItem("celda-0-2-data-order");
    
}


function actualizarPosicionCelda(celda, ordenCelda){
    
    var orden = parseInt(ordenCelda, 10);
    var i = Math.floor(orden/dimY);
    var j = Math.floor(orden%dimY);
    
    var tamanoCelda = 100/(dimY);
    var posicionCeldaX = tamanoCelda*j;
    var posicionCeldaY = tamanoCelda*i;
    
    celda.css({
        'left' : ""+posicionCeldaX+"%",
        'top':""+posicionCeldaY+"%"
    });
    
}


function actualizarDatosDePartida(numeroMovidas, minutos, segundos){
    
    document.getElementById("juego-contador-movidass").innerHTML = numeroMovidas;
    $("#juego-segundos").text(segundos);
    $("#juego-minutos").text(minutos);
    
}
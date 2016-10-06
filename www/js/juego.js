// /* El juego que se está implementando es una versión de éste:
// *    en.wikipedia.org/wiki/15_puzzle
// *  
// *  Se van a usar imágenes de arte rupestre y se va a añadir contenido educativo
// *  adicional.
// *
// *  Para comenzar este PROTOTIPO se usó como base una implementación del juego 2048
// *  que se puede conseguir aquí: https://github.com/coolfishstudio/game-2048
// * 
// *
// *   Secuencia de Actividades del Juego
// *   
// *   1- Se carga el DOM.
// *   2- Se agregan las celdas al #tablero
// *   3- Se cambia el estilo de acuerdo a las dimensiones del dispositivo.
// *   4- Se inicializan las celdas con la imagen
// *   5- Se desordenan las celdas.
// *   6- Se registran los manejadores de eventos.
// *   7- El usuario juega, pide ayuda o resetea. 
// *      Los manejadores de eventos se activan.
// *   8- Se detecta que la imagen ha sido reconstruida.
// *   9- Termina el juego.
// */



// /*
// * Se espera a que la página se cargue para inicializar el juego
// */
$(document).ready(function(){
    
    //generarCeldas();
    //prepararResponsive();
    //comenzarPartida();
    
});

// /*
// * 
// * Se desordenan las celdas
// *
// */
function resetear(){
    
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var elemento = $("#celda-"+i+"-"+j)
            var order = (i*dimY+j).toString(10);
            elemento.css("order", order);
            elemento.attr("data-order", order);
        }
    }
    
    //Notar que esta función asume que la blanca está arriba a la izquierda
    desordenar();
}

// /*
// * 
// * Muestra por un breve intervalo de tiempo el número de las celdas.
// * Se empieza a contar desde la celda superior izquierda hacia la derecha y
// * abajo. El objetivo es tener una cuadrícula ordenada: 
// * 0 -> 1 -> 2 -> ... -> (dimX * dimY - 1)
// *
// */
function ayudar(){
    
    var anchoDeCelda = parseInt($("#celda-0-0").css("width"),10);
    
    $(".celda").css({
        "font-size":""+Math.floor(0.2*anchoDeCelda)+"px"
    });
    
    setTimeout(function(){
                    $(".celda").css({
                        "font-size":"0px"
                    });
                },250);
}

// /*
// * 
// * Se insertan elementos div al elemento identificado como #tablero.
// * Estos elementos div representan a las celdas que se podrán mover
// * durante el juego
// *
// */
function generarCeldas(){
    
    var tablero = $("#tablero");
    
    for(var i = 0 ; i < dimX ; i++){
        for(var j = 0 ; j < dimY ; j++){
            
            var orden = (i*dimY+j);
            var contenido = "<div id='celda-"+i+"-"+j+"' class='celda' data-order='"+orden+"' >"+orden+"</div>";
            tablero.append(contenido);
        }
    }
}

// /*
// * 
// * Prepara el juego para adaptarse al tamaño de la pantalla.
// * También inicializa las propiedades asociadas a flexbox de css.
// *
// */
function prepararResponsive(){
    
    
    var tablero = $("#tablero");
    
    $('#tablero').css({
        'width': anchoDeTablero - 2*espacioDeCelda,
        'height': anchoDeTablero - 2*espacioDeCelda,
        'padding': espacioDeCelda
    });
    
    tablero.css({
        "display": "flex",
        "flex-direction": "row",
        "flex-wrap":"wrap"
    });
    
    
    $(".celda").css({
        "flex-basis":(""+Math.floor((100/dimY))+"%")
    });
    

}


// /*
// * 
// * Añade las celdas con imágenes y las desordena.
// *
// */
function comenzarPartida(){
    
    inicializarTablero();
    desordenar();
    
}

// /*
// * 
// * Desordena las celdas del tablero. Asume que la blanca está en la
// * esquina superior izquierda y se deja en su lugar.
// * 
// */
function desordenar(){
    
    var permutacion = [];
    
    //Se colocan los demás valores de order de las celdas distintas a blanca
    for(var i = 0; i < dimX; i++){
        
        for(var j = 0; j < dimY; j++){
            
            if (i + j === 0) {continue;}
            
            var indice = i*dimY + j;
            permutacion[indice -1] = indice;
        }
    }
    
    permutacion = _.shuffle(permutacion); // Se desordenan
    permutacion.unshift(0); //Se coloca la blanca en su sitio
    
    //Se ejecuta el cambio de posiciones
    for(var i = 0; i < dimX; i++){
        
        for(var j = 0; j < dimY; j++){
            
            if (i + j === 0) {continue;}
            
            var order1 = i*dimY + j;
            var order2 = permutacion[order1];
            
            intercambiarElementos(order1,order2);
        }
    }
    
}


// /*
// * 
// * Dados los valores únicos de los atributos 'order' de css pertenecientes
// * a dos celdas, se intercambian sus posiciones en el tablero usando
// * dichos valores.
// *
// */
function intercambiarElementos(order1, order2){
    
        var elemento1 = $(".celda[data-order="+order1+"]");
        var elemento2 = $(".celda[data-order="+order2+"]");
        
        elemento1.css("order", order2.toString(10));
        elemento2.css("order", order1.toString(10));
        
        elemento1.attr("data-order", order2.toString(10));
        elemento2.attr("data-order", order1.toString(10));
}


// /*
// * 
// * Ya creadas las celdas y asignados los valores de 'order', se colocan
// * las partes correspondientes de la imagen de fondo.
// *
// */
function inicializarTablero(){
    alert("url("+url_imagen+")");
    for(var i = 0; i < dimX; i++){
        
        for(var j = 0; j < dimY; j++){
            
            var celdaImagen = $("#celda-"+i+"-"+j);
            
            //Se posiciona correctamente la parte correspondiente de la imagen
            celdaImagen.css({
                'background-repeat': 'no-repeat',
                'background-image': "url('"+url_imagen+"')",
                'background-position-x': -getPosLeft(i,j), 
                'background-position-y': -getPosTop(i,j),
                'order': ""+(i*dimY+j)+""
            });
            
            //No se muestra la celda de la esquina superior izquierda
            if ((i==0)&&(j==0)){celdaImagen.css({"background-image": "none"});}
            
        }
        
    }
    
}


//Cuando el usuario comienza a tocar la pantalla 
document.addEventListener('touchstart', function(event){
    
    //Se guardan las coordenadas de la posición tocada
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;

    //Se obtiene el elemento tocado
    var nombreElemTocado = event.target.getAttribute('id');
    elemTocado = $('#'+nombreElemTocado);
    

});

//Cuando mueve el dedo por la pantalla
document.addEventListener('touchmove', function(event){
    event.preventDefault();
});

//Cuando quita el dedo de la pantalla
document.addEventListener('touchend', function(event){
    
    //Coordenadas de la posición donde se deja de tocar la pantalla
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;
    
    //Permiten saber la dirección del movimiento
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    
    //Si no se mueve mucho el dedo, entonces no se ejecuta el manejador de eventos
    if(Math.abs(deltaX) < 0.08 * anchoDePantalla && Math.abs(deltaY) < 0.08 * anchoDePantalla){
        return;
    }
    
    //1- Se determina cuál fue la dirección del movimiento
    //2- Se ejecuta el manejador de ser permitido el movimiento
    //3- Se determina si la imagen fue ordenada
    if(Math.abs(deltaX) >= Math.abs(deltaY)){
        if(deltaX > 0){
            
            if(moverDerecha()){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }else{
            
            if(moverIzquierda()){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }
    }else{
        if(deltaY > 0){
            
            if(moverAbajo()){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }else{
            
            if(moverArriba()){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }
    }

});



// /*
// * 
// * Mueve hacia arriba el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// *
// */
function moverArriba(){
    
    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.css("order"),10);
    var orderVecino = orderCeldaTocada - dimY;
    
    //Determino si puedo moverlo hacia arriba
    if (orderVecino < 0){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    //Determino si es el vacío
    if (vecino.attr("id") !== "celda-0-0"){
        return false;
    }
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}


// /*
// * 
// * Mueve hacia abajo el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// *
// */
function moverAbajo(){
    
    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.css("order"),10);
    var orderVecino = orderCeldaTocada + dimY;
    
    //Determino si puedo moverlo hacia aabajo
    if (orderVecino > dimX*dimY){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    //Determino si es el vacío
    if (vecino.attr("id") !== "celda-0-0"){
        return false;
    }
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}


// /*
// * 
// * Mueve hacia la derecha el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// *
// */
function moverDerecha(){

    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.css("order"),10);
    var orderVecino = orderCeldaTocada + 1;
    
    //Determino si puedo moverlo hacia la derecha
    if (((orderCeldaTocada+1) % dimY) === 0){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    //Determino si es el vacío
    if (vecino.attr("id") !== "celda-0-0"){
        return false;
    }
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}


// /*
// * 
// * Mueve hacia la izquierda el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// *
// */
function moverIzquierda(){
    
    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.css("order"),10);
    var orderVecino = orderCeldaTocada - 1;
    
    //Determino si puedo moverlo hacia la izquierda
    if ((orderCeldaTocada % dimY) === 0){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    //Determino si es el vacío
    if (vecino.attr("id") !== "celda-0-0"){
        return false;
    }
    
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}

// /*
// * 
// * Determina si las celdas están ordenadas. Si lo están, se emite un mensaje
// * y se devuelve true. De lo contrario, se devuelve false.
// *
// */
function haTerminadoLaPartida(){
    
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var order = $("#celda-"+i+"-"+j).attr("data-order");
            
            if ((i*dimY + j) !== order) { return false; }
        }
    }
    
    alert("¡Ha ganado!");
    
    return true;
}
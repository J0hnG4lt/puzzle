

//Aquí inicia el juego
$(document).ready(function(){
    
    generarCeldas();
    prepararResponsive();
    
    comenzarPartida();
    
});


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

//Debe adaptar la vista a las características del dispositivo
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


//Añade las celdas con la imagen y las desordena
function comenzarPartida(){
    
    inicializarTablero();
    desordenar();
    
}

function desordenar(){
    
    var permutacion = [];
    
    for(var i = 0; i < dimX; i++){
        
        for(var j = 0; j < dimY; j++){
            
            if (i + j === 0) {continue;}
            
            var indice = i*dimY + j;
            permutacion[indice -1] = indice;
        }
    }
    
    permutacion = _.shuffle(permutacion);
    permutacion.unshift(0);
    
    for(var i = 0; i < dimX; i++){
        
        for(var j = 0; j < dimY; j++){
            
            if (i + j === 0) {continue;}
            
            var order1 = i*dimY + j;
            var order2 = permutacion[order1];
            
            intercambiarElementos(order1,order2);
        }
    }
    
}


function intercambiarElementos(order1, order2){
    
        var elemento1 = $(".celda[data-order="+order1+"]");
        var elemento2 = $(".celda[data-order="+order2+"]");
        
        elemento1.css("order", order2.toString(10));
        elemento2.css("order", order1.toString(10));
        
        elemento1.attr("data-order", order2.toString(10));
        elemento2.attr("data-order", order1.toString(10));
}

//Se añaden las celdas con las imágenes y se registran sus coordenadas
function inicializarTablero(){

        
    //Se resetea si el usuario ya había jugado
    //$('.celda').remove();
    
    //Se añaden las celdas
    //generarCeldas();
    
    for(var i = 0; i < dimX; i++){
        
        for(var j = 0; j < dimY; j++){
            
            //Se guarda la posición actual de la celda en data-xpos y data-ypos
            // j e i representan los índices del tablero
            
            var celdaImagen = $("#celda-"+i+"-"+j);
            
            //Se posiciona correctamente cada celda
            celdaImagen.css({
                'background-repeat': 'no-repeat',
                'background-image': "url('../img/cueva.jpg')",
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


function haTerminadoLaPartida(){
    
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var order = $("#celda-"+i+"-"+j).attr("data-order");
            
            if ((i*dimY + j) !== order) { return false; }
        }
    }
    
    return true;
}

//Para comenzar este prototipo se usó como base una implementación del juego 2048
// que se puede conseguir aquí: https://github.com/coolfishstudio/game-2048


var permutacion = [1,2,3,4,5,6,7,8]; //Se permutará para desordenar el tablero


//Los índices de estas tablas representan el id de los elementos #celda-imagen-i-j
var tabla = [];
var posicionCeldaImagen = []; //Arreglo de objetos con coordenadas absolutas x,y


var startX = 0; //Inicio del touch event
var startY = 0;
var endX = 0; //Fin del touch event
var endY = 0;

var dimTablero = 3; //Dimensión del tablero


//Aquí inicia el juego
$(document).ready(function(){
    
    prepararResponsive();
    
    comenzarPartida();
    
});


//Debe adaptar la vista a las características del dispositivo
function prepararResponsive(){
    
    //Si el dispositivo es grande
    if(anchoDePantalla > 500){
        anchoDeTablero = 500;
        anchoDeCelda = 100;
        espacioDeCelda = 20;
    }
    
    //El tablero casi llena la pantalla de un dispositivo pequeño
    $('#tablero').css({
        'width': anchoDePantalla - 2*espacioDeCelda,
        'height': anchoDePantalla - 2*espacioDeCelda,
        'padding': espacioDeCelda
    });
}


//Añade las celdas con la imagen y las desordena
function comenzarPartida(){
    
    inicializarTablero();
    desordenar();
    
}


//Se añaden las celdas con las imágenes y se registran sus coordenadas
function inicializarTablero(){

    for(var i = 0; i < dimTablero; i++){
        
        tabla[i] = [];
        posicionCeldaImagen[i] = [];

        for(var j = 0; j < dimTablero; j++){
            
            //Se le asigna un único número a cada celda desde 0 hasta dimTablero
            tabla[i][j] = i*dimTablero + j;
            
            //Coordenadas de la esquina superior izquierda de cada celda
            posicionCeldaImagen[i][j] = { x: getPosLeft(i,j), y: getPosTop(i,j) };

        }
    }
    
    //Se resetea si el usuario ya había jugado
    $('.celda-imagen').remove();
    
    //Se añaden las celdas
    for(var i = 0; i < dimTablero; i++){
        
        for(var j = 0; j < dimTablero; j++){
            
            //Se guarda la posición actual de la celda en data-xpos y data-ypos
            // j e i representan los índices del tablero
            $('#tablero').append('<div class="celda-imagen" data-xpos='+i+' data-ypos='+j+' id="celda-imagen-' + i + '-' + j + '"></div>');
            var celdaImagen = $('#celda-imagen-' + i + '-' + j);
            
            //Se posiciona correctamente cada celda
            celdaImagen.css({
                'width' : anchoDeCelda,
                'height' : anchoDeCelda,
                'top' : getPosTop(i, j),
                'left' : getPosLeft(i, j),
                'background-repeat': 'no-repeat',
                'background-image': "url('../img/cueva.jpg')",
                'background-position-x': -getPosLeft(i,j), 
                'background-position-y': -getPosTop(i,j)
            });
            
            //No se muestra la celda de la esquina superior izquierda
            if ((i==0)&&(j==0)){celdaImagen.css({"background-image": "none"});}
            
        }
        
    }
    
}


//Se permutan las celdas
function desordenar(){
    
    //Se usa la librería externa underscore.js para permutar
    var nuevaPermutacion = _.shuffle(permutacion);
    
    for(var i = 0; i < dimTablero; i++){
        
        for(var j = 0; j < dimTablero; j++){
            
            if ((i==0) && (j==0)) {continue;}
            
            //Se guarda la permutacion en tabla preservando la correspondencia
            tabla[i][j] = nuevaPermutacion[j + i*dimTablero - 1];
            
            
            //Se intercambian los objetos de posicion de las celdas permutadas
            //para mantener la correspondencia
            
            var swapVar = posicionCeldaImagen[i][j];
            var swap_i = Math.floor(tabla[i][j]/dimTablero);
            var swap_j = tabla[i][j] % dimTablero;
            
            //Se intercambian las posiciones absolutas de los elementos
            posicionCeldaImagen[i][j] = posicionCeldaImagen[swap_i][swap_j];
            posicionCeldaImagen[swap_i][swap_j] = swapVar;
            
            //Se obtiene el elemento a ser intercambiado distinto al actual
            var nombreImagenSwap = "celda-imagen-"+swap_i.toString(10)+'-'+swap_j.toString(10);
            
            //Posición actual en el tablero del elemento a ser intercambiado
            var pos_x_swap = $('#'+nombreImagenSwap).attr("data-xpos");
            var pos_y_swap = $('#'+nombreImagenSwap).attr("data-ypos");
            
            //Posición en el tablero del elemento actual
            var pos_x = $('#celda-imagen-'+i+'-'+j).attr("data-xpos");
            var pos_y = $('#celda-imagen-'+i+'-'+j).attr("data-ypos");
            
            
            //Se intercambian
            
            $('#'+nombreImagenSwap).attr("data-xpos", pos_x);
            $('#'+nombreImagenSwap).attr("data-ypos", pos_y);
            
            $('#celda-imagen-'+i+'-'+j).attr("data-xpos", pos_x_swap);
            $('#celda-imagen-'+i+'-'+j).attr("data-ypos", pos_y_swap);
            //
            
            //Se ejecuta el intercambio
            
            var celdaImagen = $('#celda-imagen-' + i + '-' + j);
            celdaImagen.css({
                'top' : posicionCeldaImagen[i][j].y,
                'left' : posicionCeldaImagen[i][j].x
            });
            
            var celdaImagen = $('#celda-imagen-' + swap_i + '-' + swap_j);
            celdaImagen.css({
                'top' : posicionCeldaImagen[swap_i][swap_j].y,
                'left' : posicionCeldaImagen[swap_i][swap_j].x
            });
            
            
        }
    }
    
}

/******************************************************************************
 ******************************************************************************
 ******************************  EVENTOS  *************************************
 ******************************************************************************
 ******************************************************************************
 */


//Cuando el usuario comienza a tocar la pantalla 
document.addEventListener('touchstart', function(event){
    
    //Se guardan las coordenadas de la posición tocada
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
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
            
            if(moverDerecha(event)){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }else{
            
            if(moverIzquierda(event)){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }
    }else{
        if(deltaY > 0){
            
            if(moverAbajo(event)){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }else{
            
            if(moverArriba(event)){
                setTimeout(function(){
                     haTerminadoLaPartida();
                },250);
            }
        }
    }

});


//1- Determina si el movimiento es posible
//2- Intercambia las celdas si es posible
function moverDerecha(event){
    
    //Se obtiene el elemento tocado
    var elementoTocado = event.target;
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var elemTocadoJQuery = $('#'+nombreElemTocado);
    var esquinaSupIzq_X = parseInt(elemTocadoJQuery.css('left'), 10);
    
    //Si la celda está en la última columna de la derecha -> no se puede mover
    if (esquinaSupIzq_X + espacioDeCelda + anchoDeCelda + 1 >= anchoDeTablero){
        return false;
    }
    
    //Se obtiene la identidad de la celda tocada
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[2];
    var nombre_j = nombreParseado[3];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    //Se obtiene la posición actual del elemento tocado
    var xpos_tocado = elemTocadoJQuery.attr("data-xpos");
    var ypos_tocado = elemTocadoJQuery.attr("data-ypos");
    
    //Se obtiene la posición del elemento con el que será intercambiado (blanco)
    var ypos_der = (parseInt(ypos_tocado,10) + 1).toString(10);
    var xpos_der = xpos_tocado;
    
    //Se obtiene el elemento de la derecha (blanco)
    var elemDerJQuery = $(".celda-imagen[data-xpos="+xpos_der+"][data-ypos="+ypos_der+"]");
    
    //Se obtiene la identidad de la celda de la derecha
    var i_der = parseInt(elemDerJQuery.attr("id").split("-")[2],10);
    var j_der = parseInt(elemDerJQuery.attr("id").split("-")[3],10);
    
    //Se continua si realmente el elemento de la derecha es blanco
    // blanco es celda-imagen-0-0
    if (i_der + j_der > 0){
        
        return false;}
    
    //Se intercambian las posiciones actuales en el tablero lógico
    
    elemDerJQuery.attr("data-xpos", xpos_tocado);
    elemDerJQuery.attr("data-ypos", ypos_tocado);
    
    elemTocadoJQuery.attr("data-xpos", xpos_der);
    elemTocadoJQuery.attr("data-ypos", ypos_der);
    
    //Se intercambian las posiciones absolutas de las celdas
    
    var swap_pos = posicionCeldaImagen[i][j];
    posicionCeldaImagen[i][j] = posicionCeldaImagen[i_der][j_der];
    posicionCeldaImagen[i_der][j_der] = swap_pos;
    
    
    //Se ejecutan los cambios
    
    var celdaImagenTocada = $('#celda-imagen-' + i + '-' + j);
    celdaImagenTocada.css({
        'top' : posicionCeldaImagen[i][j].y,
        'left' : posicionCeldaImagen[i][j].x
    });
    
    var celdaImagenVacia = $('#celda-imagen-' + i_der.toString(10)+ '-' + j_der.toString(10));
    celdaImagenVacia.css({
        'top' : posicionCeldaImagen[i_der][j_der].y,
        'left' : posicionCeldaImagen[i_der][j_der].x
    });
    return true;
}


function moverIzquierda(event){
    
    
    var elementoTocado = event.target;
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var elemTocadoJQuery = $('#'+nombreElemTocado);
    var esquinaSupIzq_X = parseInt(elemTocadoJQuery.css('left'), 10);
    
    if (esquinaSupIzq_X - espacioDeCelda -1 <= 0){
        return false;
    }
    
    
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[2];
    var nombre_j = nombreParseado[3];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    
    var xpos_tocado = elemTocadoJQuery.attr("data-xpos");
    var ypos_tocado = elemTocadoJQuery.attr("data-ypos");
    
    var ypos_izq = (parseInt(ypos_tocado,10) - 1).toString(10);
    var xpos_izq = xpos_tocado;
    
    var elemIzqJQuery = $(".celda-imagen[data-xpos="+xpos_izq+"][data-ypos="+ypos_izq+"]");
    
    var i_izq = parseInt(elemIzqJQuery.attr("id").split("-")[2],10);
    var j_izq = parseInt(elemIzqJQuery.attr("id").split("-")[3],10);
    
    if (i_izq + j_izq > 0){
        
        return false;}
    
    elemIzqJQuery.attr("data-xpos", xpos_tocado);
    elemIzqJQuery.attr("data-ypos", ypos_tocado);
    
    elemTocadoJQuery.attr("data-xpos", xpos_izq);
    elemTocadoJQuery.attr("data-ypos", ypos_izq);
    
    
    var swap_pos = posicionCeldaImagen[i][j];
    posicionCeldaImagen[i][j] = posicionCeldaImagen[i_izq][j_izq];
    posicionCeldaImagen[i_izq][j_izq] = swap_pos;
    
    var celdaImagenTocada = $('#celda-imagen-' + i + '-' + j);
    celdaImagenTocada.css({
        'top' : posicionCeldaImagen[i][j].y,
        'left' : posicionCeldaImagen[i][j].x
    });
    
    var celdaImagenVacia = $('#celda-imagen-' + i_izq.toString(10)+ '-' + j_izq.toString(10));
    celdaImagenVacia.css({
        'top' : posicionCeldaImagen[i_izq][j_izq].y,
        'left' : posicionCeldaImagen[i_izq][j_izq].x
    });
    return true;
}


function moverAbajo(event){
    
    
    var elementoTocado = event.target;
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var elemTocadoJQuery = $('#'+nombreElemTocado);
    var esquinaSupIzq_Y = parseInt(elemTocadoJQuery.css('top'), 10);
    
    if (esquinaSupIzq_Y + espacioDeCelda + anchoDeCelda +1 >= anchoDeTablero){
        return false;
    }
    
    
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[2];
    var nombre_j = nombreParseado[3];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    
    var xpos_tocado = elemTocadoJQuery.attr("data-xpos");
    var ypos_tocado = elemTocadoJQuery.attr("data-ypos");
    
    var xpos_abj = (parseInt(xpos_tocado,10) + 1).toString(10);
    var ypos_abj = ypos_tocado;
    
    var elemIzqJQuery = $(".celda-imagen[data-xpos="+xpos_abj+"][data-ypos="+ypos_abj+"]");
    
    var i_abj = parseInt(elemIzqJQuery.attr("id").split("-")[2],10);
    var j_abj = parseInt(elemIzqJQuery.attr("id").split("-")[3],10);
    
    if (i_abj + j_abj > 0){
        
        return false;}
    
    elemIzqJQuery.attr("data-xpos", xpos_tocado);
    elemIzqJQuery.attr("data-ypos", ypos_tocado);
    
    elemTocadoJQuery.attr("data-xpos", xpos_abj);
    elemTocadoJQuery.attr("data-ypos", ypos_abj);
    
    
    var swap_pos = posicionCeldaImagen[i][j];
    posicionCeldaImagen[i][j] = posicionCeldaImagen[i_abj][j_abj];
    posicionCeldaImagen[i_abj][j_abj] = swap_pos;
    
    var celdaImagenTocada = $('#celda-imagen-' + i + '-' + j);
    celdaImagenTocada.css({
        'top' : posicionCeldaImagen[i][j].y,
        'left' : posicionCeldaImagen[i][j].x
    });
    
    var celdaImagenVacia = $('#celda-imagen-' + i_abj.toString(10)+ '-' + j_abj.toString(10));
    celdaImagenVacia.css({
        'top' : posicionCeldaImagen[i_abj][j_abj].y,
        'left' : posicionCeldaImagen[i_abj][j_abj].x
    });
    return true;
    
}


function moverArriba(event){
    
    var elementoTocado = event.target;
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var elemTocadoJQuery = $('#'+nombreElemTocado);
    var esquinaSupIzq_Y = parseInt(elemTocadoJQuery.css('top'), 10);
    
    if (esquinaSupIzq_Y - espacioDeCelda -1 <= 0){
        return false;
    }
    
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[2];
    var nombre_j = nombreParseado[3];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    
    var xpos_tocado = elemTocadoJQuery.attr("data-xpos");
    var ypos_tocado = elemTocadoJQuery.attr("data-ypos");
    
    var xpos_arrb = (parseInt(xpos_tocado,10) - 1).toString(10);
    var ypos_arrb = ypos_tocado;
    
    var elemIzqJQuery = $(".celda-imagen[data-xpos="+xpos_arrb+"][data-ypos="+ypos_arrb+"]");
    
    var i_arrb = parseInt(elemIzqJQuery.attr("id").split("-")[2],10);
    var j_arrb = parseInt(elemIzqJQuery.attr("id").split("-")[3],10);
    
    if (i_arrb + j_arrb > 0){
        
        return false;}
    
    elemIzqJQuery.attr("data-xpos", xpos_tocado);
    elemIzqJQuery.attr("data-ypos", ypos_tocado);
    
    elemTocadoJQuery.attr("data-xpos", xpos_arrb);
    elemTocadoJQuery.attr("data-ypos", ypos_arrb);
    
    
    var swap_pos = posicionCeldaImagen[i][j];
    posicionCeldaImagen[i][j] = posicionCeldaImagen[i_arrb][j_arrb];
    posicionCeldaImagen[i_arrb][j_arrb] = swap_pos;
    
    var celdaImagenTocada = $('#celda-imagen-' + i + '-' + j);
    celdaImagenTocada.css({
        'top' : posicionCeldaImagen[i][j].y,
        'left' : posicionCeldaImagen[i][j].x
    });
    
    var celdaImagenVacia = $('#celda-imagen-' + i_arrb.toString(10)+ '-' + j_arrb.toString(10));
    celdaImagenVacia.css({
        'top' : posicionCeldaImagen[i_arrb][j_arrb].y,
        'left' : posicionCeldaImagen[i_arrb][j_arrb].x
    });
    return true;
    
}


//La partida ha terminado si las celdas están ordenadas
// ej: celda-imagen-0-0 < celda-imagen-0-1 < ... < celda-imagen-2-2 (dimTablero = 3)
function haTerminadoLaPartida(){
    
    for(var i = 0; i<dimTablero; i++){
        
        for(var j = 0; j<dimTablero; j++){
            
            var celda_imagen = $("celda-imagen-"+i+"-"+j);
            var xpos = celda_imagen.attr("data-xpos");
            var ypos = celda_imagen.attr("data-ypos");
            
            if ((Math.abs(xpos - i) + Math.abs(ypos - j)) == 0){
                alert('¡Ha Ganado!');
                
                return true;
            }
        }
        
    }
    return false;
}
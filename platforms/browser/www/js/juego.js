var tabla = [];
var permutacion = [1,2,3,4,5,6,7,8];
var posicionCeldaImagen = [];


var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

var dimTablero = 3;

$(document).ready(function(){
    
    prepararResponsive();
    
    comenzarPartida();
    
});

function prepararResponsive(){
    
    if(anchoDePantalla > 500){
        anchoDeTablero = 500;
        anchoDeCelda = 100;
        espacioDeCelda = 20;
    }
    
    $('#tablero').css({
        'width': anchoDePantalla - 2*espacioDeCelda,
        'height': anchoDePantalla - 2*espacioDeCelda,
        'padding': espacioDeCelda
    });
}

function comenzarPartida(){
    
    inicializarTablero();
    desordenar();
    
}

function inicializarTablero(){

    for(var i = 0; i < 3; i++){
        
        tabla[i] = [];
        posicionCeldaImagen[i] = [];

        for(var j = 0; j < 3; j++){
            
            tabla[i][j] = i*dimTablero + j;
            posicionCeldaImagen[i][j] = { x: getPosLeft(i,j), y: getPosTop(i,j) };

        }
    }
    
    $('.celda-imagen').remove();
    
    for(var i = 0; i < 3; i++){
        
        for(var j = 0; j < 3; j++){
            
            $('#tablero').append('<div class="celda-imagen" data-xpos='+i+' data-ypos='+j+' id="celda-imagen-' + i + '-' + j + '"></div>');
            var celdaImagen = $('#celda-imagen-' + i + '-' + j);
            
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
            
            if ((i==0)&&(j==0)){celdaImagen.css({"background-image": "none"});}
            
        }
        
    }
    
    
}



function desordenar(){
    
    var nuevaPermutacion = _.shuffle(permutacion);
    
    for(var i = 0; i < 3; i++){
        
        for(var j = 0; j < 3; j++){
            
            if ((i==0) && (j==0)) {continue;}
            
            tabla[i][j] = nuevaPermutacion[j + i*dimTablero - 1];
            
            var swapVar = posicionCeldaImagen[i][j];
            var swap_i = Math.floor(tabla[i][j]/dimTablero);
            var swap_j = tabla[i][j] % dimTablero;
            
            posicionCeldaImagen[i][j] = posicionCeldaImagen[swap_i][swap_j];
            posicionCeldaImagen[swap_i][swap_j] = swapVar;
            

            var nombreImagenSwap = "celda-imagen-"+swap_i.toString(10)+'-'+swap_j.toString(10);
            var pos_x_swap = $('#'+nombreImagenSwap).attr("data-xpos");
            var pos_y_swap = $('#'+nombreImagenSwap).attr("data-ypos");
            
            var pos_x = $('#celda-imagen-'+i+'-'+j).attr("data-xpos");
            var pos_y = $('#celda-imagen-'+i+'-'+j).attr("data-ypos");
            
            $('#'+nombreImagenSwap).attr("data-xpos", pos_x);
            $('#'+nombreImagenSwap).attr("data-ypos", pos_y);
            
            $('#celda-imagen-'+i+'-'+j).attr("data-xpos", pos_x_swap);
            $('#celda-imagen-'+i+'-'+j).attr("data-ypos", pos_y_swap);
            //
            
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

document.addEventListener('touchstart', function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', function(event){
    event.preventDefault();
});


document.addEventListener('touchend', function(event){
    
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;
    
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    
    if(Math.abs(deltaX) < 0.08 * anchoDePantalla && Math.abs(deltaY) < 0.08 * anchoDePantalla){
        return;
    }

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


function moverDerecha(event){
    
    var elementoTocado = event.target;
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var elemTocadoJQuery = $('#'+nombreElemTocado);
    var esquinaSupIzq_X = parseInt(elemTocadoJQuery.css('left'), 10);
    
    if (esquinaSupIzq_X + espacioDeCelda + anchoDeCelda + 1 >= anchoDeTablero){
        return false;
    }
    
    
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[2];
    var nombre_j = nombreParseado[3];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    
    var xpos_tocado = elemTocadoJQuery.attr("data-xpos");
    var ypos_tocado = elemTocadoJQuery.attr("data-ypos");
    
    var ypos_der = (parseInt(ypos_tocado,10) + 1).toString(10);
    var xpos_der = xpos_tocado;
    
    var elemIzqJQuery = $(".celda-imagen[data-xpos="+xpos_der+"][data-ypos="+ypos_der+"]");
    
    var i_der = parseInt(elemIzqJQuery.attr("id").split("-")[2],10);
    var j_der = parseInt(elemIzqJQuery.attr("id").split("-")[3],10);
    
    if (i_der + j_der > 0){
        
        return false;}
    
    elemIzqJQuery.attr("data-xpos", xpos_tocado);
    elemIzqJQuery.attr("data-ypos", ypos_tocado);
    
    elemTocadoJQuery.attr("data-xpos", xpos_der);
    elemTocadoJQuery.attr("data-ypos", ypos_der);
    
    
    var swap_pos = posicionCeldaImagen[i][j];
    posicionCeldaImagen[i][j] = posicionCeldaImagen[i_der][j_der];
    posicionCeldaImagen[i_der][j_der] = swap_pos;
    
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
function haTerminadoLaPartida(){return true;}
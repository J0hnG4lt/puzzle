var tabla = [];
var esCeldaActualizable = [];
var permutacion = [1,2,3,4,5,6,7,8];
var posicionCeldaImagen = [];
var posicionCelda = [];
var celdaPosicion = [];

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
    
    $('.tablero-celda').css({
        'width': anchoDeCelda,
        'height': anchoDeCelda
    });
}

function comenzarPartida(){
    
    inicializarTablero();
    desordenar();
    
}

function inicializarTablero(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var tableroCelda = $('#tablero-celda-' + i + '-' + j);
            tableroCelda.css('top', getPosTop(i, j));
            tableroCelda.css('left', getPosLeft(i, j));
        }
    }

    for(var i = 0; i < 3; i++){
        tabla[i] = [];
        esCeldaActualizable[i] = [];
        posicionCeldaImagen[i] = [];
        posicionCelda[i] = [];
        celdaPosicion[i] = []
        for(var j = 0; j < 3; j++){
            tabla[i][j] = i*dimTablero + j;
            esCeldaActualizable[i][j] = false;
            posicionCeldaImagen[i][j] = { x: getPosLeft(i,j), y: getPosTop(i,j) };
            posicionCelda[i][j] = {i_elem:i,j_elem:j};
            celdaPosicion[i][j] = {i:i,j:j};
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
	
    
    //actualizarVistaTablero();
    
}

/*
function actualizarVistaTablero(){
    
    $('.celda-imagen').remove();
    
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			
			$('#tablero').append('<div class="celda-imagen" id="celda-imagen-' + i + '-' + j + '"></div>');
			var celdaImagen = $('#celda-imagen-' + i + '-' + j);
			celdaImagen.css({
				'width' : cellSideLength,
				'height' : cellSideLength,
				'top' : getPosTop(i, j),
				'left' : getPosLeft(i, j),
				'background-repeat': 'no-repeat',
        		'background-image': "url('../img/cueva.jpg')",
        		'background-position-x': -getPosLeft(i,j), 
        		'background-position-y': -getPosTop(i,j)
			});
			
			
			esCeldaActualizable[i][j] = false;
		}
	}
}
*/

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
            
            posicionCelda[i][j] = {i_elem:swap_i,j_elem:swap_j};
            posicionCelda[swap_i][swap_j] = {i_elem:i,j_elem:j};
            
            celdaPosicion[i][j] = {i_elem:swap_i,j_elem:swap_j};
            celdaPosicion[swap_i][swap_j] = {i_elem:i,j_elem:j};
            
            //
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


function moverDerecha(event){
    
    var elementoTocado = event.target;
    var esquinaSupIzq_X = parseInt(elementoTocado.css('left'), 10);
    
    if (esquinaSupIzq_X + anchoDeCelda + 1 >= anchoDeTablero){
        return false;
    }
    
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[1];
    var nombre_j = nombreParseado[2];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    var swapPos = posicionCeldaImagen[i][j+1]
    posicionCeldaImagen[i][j+1] = posicionCeldaImagen[i][j];
    posicionCeldaImageb[i][j] = swapPos;
    
    var celdaImagenTocada = $('#celda-imagen-' + i + '-' + j);
    celdaImagenTocada.css({
		'top' : posicionCeldaImagen[i][j].y,
		'left' : posicionCeldaImagen[i][j].x
    });
    
    var celdaImagenVacia = $('#celda-imagen-' + i + '-' + (j+1));
    celdaImagenVacia.css({
		'top' : posicionCeldaImagen[i][j+1].y,
		'left' : posicionCeldaImagen[i][j+1].x
    });
    return true;
}


function moverIzquierda(event){
    
    
    var elementoTocado = event.target;
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var elemTocadoJQuery = $('#'+nombreElemTocado)
    var esquinaSupIzq_X = parseInt(elemTocadoJQuery.css('left'), 10);
    
    if (esquinaSupIzq_X - espacioDeCelda -1 <= 0){
        return false;
    }
    
    
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[2];
    var nombre_j = nombreParseado[3];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    /*
    var x = posicionCelda[i][j].i_elem;
    var y = posicionCelda[i][j].j_elem;
    
    //var i_izq = Math.floor(tabla[x][y-1]/dimTablero);
    //var j_izq = tabla[x][y-1] % dimTablero;
    
    var i_izq = celdaPosicion[x][y-1].i;
    var j_izq = celdaPosicion[x][y-1].j;
    
    var swap_num = tabla[x][y];
    tabla[x][y] = tabla[x][y -1];
    tabla[x][y -1] = swap_num;
    
    var swapPos = posicionCeldaImagen[i_izq][j_izq];
    posicionCeldaImagen[i_izq][j_izq] = posicionCeldaImagen[i][j];
    posicionCeldaImagen[i][j] = swapPos;
    
    var new_i = posicionCelda[i_izq][j_izq].elem_i;
    var new_j = posicionCelda[i_izq][j_izq].elem_j;
    posicionCelda[i_izq][j_izq]={elem_i:x,elem_j:y};
    posicionCelda[i][j]={elem_i:(x-1),elem_j:y};
    
    var swap_me = celdaPosicion[x][y];
    celdaPosicion[x][y] = celdaPosicion[x][y-1];
    celdaPosicion[x][y-1] = swap_me;
    */
    
    
    var xpos_tocado = elemTocadoJQuery.attr("data-xpos");
    var ypos_tocado = elemTocadoJQuery.attr("data-ypos");
    
    var ypos_izq = (parseInt(ypos_tocado,10) - 1).toString(10);
    var xpos_izq = xpos_tocado;
    
    var elemIzqJQuery = $(".celda-imagen[data-xpos="+xpos_izq+"][data-ypos="+ypos_izq+"]");
    elemIzqJQuery.attr("data-xpos", xpos_tocado);
    elemIzqJQuery.attr("data-ypos", ypos_tocado);
    
    elemTocadoJQuery.attr("data-xpos", xpos_izq);
    elemTocadoJQuery.attr("data-ypos", ypos_izq);
    
    var i_izq = parseInt(elemIzqJQuery.attr("id").split("-")[2],10);
    var j_izq = parseInt(elemIzqJQuery.attr("id").split("-")[3],10);
    
    var swap_pos = posicionCeldaImagen[i][j];
    posicionCeldaImagen[i][j] = posicionCeldaImagen[i_izq][j_izq];
    posicionCeldaImagen[i_izq][j_izq] = swap_pos
    
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
function moverAbajo(){return false;}
function moverArriba(){return false;}
function haTerminadoLaPartida(){}
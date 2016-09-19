var tabla = [];
var esCeldaActualizable = [];
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
        for(var j = 0; j < 3; j++){
            tabla[i][j] = i*dimTablero + j;
            esCeldaActualizable[i][j] = false;
            posicionCeldaImagen[i][j] = { x: getPosLeft(i,j), y: getPosTop(i,j) }
        }
    }
    
    
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			$('#tablero').append('<div class="celda-imagen" id="celda-imagen-' + i + '-' + j + '"></div>');
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
    
}


function moverIzquierda(event){
    
    var elementoTocado = event.target;
    var esquinaSupIzq_X = parseInt(elementoTocado.css('left'), 10);
    
    if (esquinaSupIzq_X - 1 <= 0){
        return false;
    }
    
    var nombreElemTocado = elementoTocado.getAttribute('id');
    var nombreParseado = nombreElemTocado.split("-");
    var nombre_i = nombreParseado[1];
    var nombre_j = nombreParseado[2];
    
    var i = parseInt(nombre_i, 10);
    var j = parseInt(nombre_j, 10);
    
    var swapPos = posicionCeldaImagen[i][j-1]
    posicionCeldaImagen[i][j-1] = posicionCeldaImagen[i][j];
    posicionCeldaImageb[i][j] = swapPos;
    
    var celdaImagenTocada = $('#celda-imagen-' + i + '-' + j);
    celdaImagenTocada.css({
		'top' : posicionCeldaImagen[i][j].y,
		'left' : posicionCeldaImagen[i][j].x
    });
    
    var celdaImagenVacia = $('#celda-imagen-' + i + '-' + (j-1));
    celdaImagenVacia.css({
		'top' : posicionCeldaImagen[i][j-1].y,
		'left' : posicionCeldaImagen[i][j-1].x
    });
    
}
function moverAbajo(){return false;}
function moverArriba(){return false;}
function haTerminadoLaPartida(){}
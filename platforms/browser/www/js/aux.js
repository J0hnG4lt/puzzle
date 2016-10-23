var dimX = 3; //Dimensiones del tablero
var dimY = 4;

var startX; //Punto donde se toca la pantalla
var startY;
var endX; //Punto donde se deja la pantalla
var endY;

var url_imagen;

//El tamaño de la pantalla del dispositivo determina los demás tamaños
var anchoDePantalla = window.screen.availWidth;
var anchoDeTablero = 0.92 * anchoDePantalla;
var anchoDeCelda = 0.32 * anchoDePantalla;
var espacioDeCelda = 0.01 * anchoDePantalla;

var elemTocado; //Elemento que recibe el touch event

var intervaloDeTiempoID = null;



var imagenSeleccionadaIndex = 0;
diccionario_imagenes = { 1:"../img/petroglifo.png"
                        ,2:"../img/amazonas.jpg"
                        ,3:"../img/cueva.jpg"
                        ,4:"../img/falcon.jpg"
                        };

/*
Posiciones sugeridas para la blanca
0 1 2
3   5
6 7 8

diccionario_posicion_blanca
    Su índice hace referencia a la identidad de la imagen
    en diccionario_imagenes
    Su valor hace referencia a la posición sugerida.
*/
diccionario_posicion_blanca = {0:0 //Opción por default
                              ,1:7
                              ,2:2
                              ,3:8
                              ,4:6
                               };


//Estas funciones calculan la posicion relativo al padre para colocar la parte
//de la imagen que le corresponde a la celda (i,j)

function getPosTop(i, j){
    return Math.floor((anchoDeTablero/dimX))*i;
}
function getPosLeft(i, j){
    return Math.floor((anchoDeTablero/dimY))*j;
}
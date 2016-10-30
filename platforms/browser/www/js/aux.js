var dimX = 3; //Dimensiones del tablero
var dimY = 4;

var startX; //Punto donde se toca la pantalla
var startY;
var endX; //Punto donde se deja la pantalla
var endY;

var url_imagen;

//El tamaño de la pantalla del dispositivo determina los demás tamaños
var anchoDePantalla = window.screen.availWidth;
//var anchoDeTablero = 0.92 * anchoDePantalla;
var anchoDeTablero = parseInt($("#imagen_seleccionada_tablero").css("background-size-x"),10);
var anchoDeCelda = 0.32 * anchoDePantalla;
var espacioDeCelda = 0.01 * anchoDePantalla;

var elemTocado; //Elemento que recibe el touch event

var intervaloDeTiempoID = null;

var numMovidas = 0;

var imagenSeleccionadaIndex = 0;
var diccionario_imagenes = { 1:"../img/petroglifo.png"
                        ,2:"../img/amazonas.jpg"
                        ,3:"../img/cueva.jpg"
                        ,4:"../img/falcon.jpg"
                        };
var diccionario_tamanos = {1 : {x:"348px",y:"303px"},
                           2 : {x:"167px",y:"167px"},
                           3 : {x:"558px",y:"552px"},
                           4 : {x:"167px",y:"167px"}
                           }
/*
Posiciones sugeridas para la blanca
0 1 2
3   5
6 7 8

diccionario_posicion_blanca para el nivel 3x3
    Su índice hace referencia a la identidad de la imagen
    en diccionario_imagenes
    Su valor hace referencia a la posición sugerida.
*/
var diccionario_posicion_blanca_3x3 = {0:0 //Opción por default
                              ,1:7
                              ,2:2
                              ,3:8
                              ,4:6
                               };

/*
0  1  2  3
4        7
8        11
12 13 14 15
*/
var diccionario_posicion_blanca_4x4 = {0:0 //Opción por default
                              ,1:13
                              ,2:3
                              ,3:15
                              ,4:12
                               };

var diccionario_posicion_blanca = {};

//Estas funciones calculan la posicion relativo al padre para colocar la parte
//de la imagen que le corresponde a la celda (i,j)

function getPosTop(i, j){
    return Math.floor((anchoDeTablero/dimX))*i;
}

function getPosLeft(i, j){
    return Math.floor((anchoDeTablero/dimY))*j;
}
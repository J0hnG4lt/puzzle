var dimX = 3; //Dimensiones del tablero
var dimY = 4;

var startX; //Punto donde se toca la pantalla
var startY;
var endX; //Punto donde se deja la pantalla
var endY;

//El tamaño de la pantalla del dispositivo determina los demás tamaños
var anchoDePantalla = window.screen.availWidth;
var anchoDeTablero = 0.92 * anchoDePantalla;
var anchoDeCelda = 0.32 * anchoDePantalla;
var espacioDeCelda = 0.01 * anchoDePantalla;

var elemTocado; //Elemento que recibe el touch event


//Estas funciones calculan la posicion relativo al padre para colocar la parte
//de la imagen que le corresponde a la celda (i,j)

function getPosTop(i, j){
    return Math.floor((anchoDeTablero/dimX))*i;
}
function getPosLeft(i, j){
    return Math.floor((anchoDeTablero/dimY))*j;
}
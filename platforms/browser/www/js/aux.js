var anchoDePantalla = window.screen.availWidth;
var anchoDeTablero = 0.92 * anchoDePantalla;
var anchoDeCelda = 0.32 * anchoDeTablero;
var espacioDeCelda = 0.01 * anchoDeTablero;

function getPosTop(i, j){
	return espacioDeCelda + i * (anchoDeCelda + espacioDeCelda);
}
function getPosLeft(i, j){
	return espacioDeCelda + j * (anchoDeCelda + espacioDeCelda);
}
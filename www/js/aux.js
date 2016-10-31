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

var tipoRepresentacion = 0;

var imagenSeleccionadaIndex = 0;
var diccionario_imagenes = {};

var diccionario_imagenes_petroglifos = {
                        1 : "../img/representaciones/petroglifos/petroglifo.png",
                        2 : "../img/representaciones/petroglifos/amazonas.jpg",
                        3 : "../img/representaciones/petroglifos/cueva.jpg",
                        4 : "../img/representaciones/petroglifos/falcon.jpg"
                        };

var diccionario_imagenes_amolador = {
                        1 : "../img/representaciones/amolador/AMOLADORES-Sto-Rosario-de-Agua-Linda.jpg"
                        }

var diccionario_imagenes_batea = {
                        1 : "../img/representaciones/batea/BATEA-Laja-de-Tigre-Río-Ocamo-edo-Amazonas.jpg"
                        }

var diccionario_imagenes_cerro_mitico = {
                        1 : "../img/representaciones/cerro_mitico/CERRO-MITICO-NATURAL-Cerro-AUTANA.jpg"
                        }

var diccionario_imagenes_cupula = {
                        1 : "../img/representaciones/cupula/CUPULAS-Mariara-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_dolmen = {
                        1 : "../img/representaciones/dolmen/DOLMEN-PINTAO-Edo-Amazonas.jpg"
                        }

var diccionario_imagenes_esfera_litica = {
                        1 : "../img/representaciones/esfera_litica/Esfera-lítica-edo-Anzoátegui.jpg"
                        }

var diccionario_imagenes_geoglifos = {
                        1 : "../img/representaciones/geoglifos/GEOGLIFO-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_menhires = {
                        1 : "../img/representaciones/menhires/MM-MENHIRES.jpg"
                        }

var diccionario_imagenes_micropetroglifo = {
                        1 : "../img/representaciones/micropetroglifo/MICROPETROGLIFOS-Sn-Pablo-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_monolitos = {
                        1 : "../img/representaciones/monolitos/MM-MONOLITOS-Río-Vigirima-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_piedras_miticas = {
                        1 : "../img/representaciones/piedras_miticas/PIEDRA-MÍTICA-NATURAL-Olla-de-Napiruli-edo-Amazonas.jpg"
                        }

var diccionario_imagenes_pinturas_rupestres = {
                        1 : "../img/representaciones/pinturas_rupestres/PR-Cueva-del-Carmen-edo-Bolivar.jpg"
                        }

var diccionario_imagenes_puntos_acoplados = {
                        1 : "../img/representaciones/puntos_acoplados/PUNTOS-ACOPLADOS.jpg"
                        }


var diccionario_tamanos = {1 : {x:"348px",y:"303px"},
                           2 : {x:"167px",y:"167px"},
                           3 : {x:"558px",y:"552px"},
                           4 : {x:"167px",y:"167px"}
                           };

var diccionario_imagen_info = {};

var diccionario_imagen_info_petroglifos = {
                        1 : "../img/vistas/info_representaciones/petroglifo_zulia_info.jpg",
                        2 : "../img/vistas/info_representaciones/pintaito_amazonas_info.jpg",
                        3 : "../img/vistas/info_representaciones/cueva_bolivar_info.jpg",
                        4 : "../img/vistas/info_representaciones/chipaque_falcon_info.jpg"
                        };


var diccionario_tipo_representacion_mapa = {
                        1 : "../img/mapas/5-Mapa-ampliado-con-estados-PETROGLIFOS.png",
                        2 : "../img/mapas/4-Mapa-ampliado-con-estados-PR.png",
                        3 : "../img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
                        4 : "../img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
                        5 : "../img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
                        6 : "../img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        7 : "../img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        8 : "../img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        9 : "../img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        10 : "../img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES.png",
                        11 : "../img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES.png",
                        12 : "../img/mapas/6-Mapa-ampliado-ESFERAS-LÍTICAS.png",
                        13 : "../img/mapas/7-Mapa-ampliado-con-estado-GEOGLIFO.png",
                        14 : "../img/mapas/8-Mapa-ampliado-con-estados-MICROPETROGLIFOS.png"
                        };

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

/*
0  1  2  3  4  5
6              11
12             17
18             23
24             29
30 31 32 33 34 35
*/
var diccionario_posicion_blanca_6x6 = {0:0 //Opción por default
                              ,1:31
                              ,2:5
                              ,3:35
                              ,4:30
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
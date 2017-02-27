/*
 *    Universidad Simón Bolívar
 *    Tutora Académica: Angela Di Serio
 *    Representante de la Comunidad y diseñadora: Ruby de Valencia
 *    Programador: Georvic Tur (12-11402)
 *    
 *    Proyecto de Servicio Comunitario
 *        Puzzles Deslizantes Educativos: Manifestaciones Rupestres Venezolanas
*/


// Muestra la Presentación y luego de cierto tiempo la primera vista
$(document).ready(function(){
    
    // Registra evento para resaltar selecciones
    $(".area-sprite").on("click", resaltarAreasSprite);
    
    
    verPortada();
    //setTimeout(function(){
    //            cerrarPortada();
    //            },20000);

});


var url_imagen_elegida = "";
var dimension_x=3;
var dimension_y=3;


// /*
// * Oculta todas las vistas de la aplicación
// */
function ocultarVistas(){
    ultimaVista = vistaActual;
    $(".vista").css("display","none");
}

function mostrarVistaAnterior(){
    $("#"+ultimaVista).css("display","block");
}


// /*
// * Sólo muestra la primera vista. Allí se selecciona el tipo de representación
// */
function mostrarTipoRepresentacion(){
    ocultarVistas();
    $("#vista-seleccionar-tipo-manifestacion").css("display","block");
    seleccionarTipoRepresentacion("2"); //Caso por defecto
    vistaActual = "vista-seleccionar-tipo-manifestacion";

}

// /*
// * Sólo muestra la última vista. Allí se juega.
// */
function mostrarJuego(){
    ocultarVistas();
    $("#vista-juego").css("display","block");
    vistaActual = "vista-juego";
}

// /*
// * Crea el nuevo tablero con los parámetros introducidos por el usuario
// */
function jugarYa(){
    
    $("#tablero").remove();
    $("#puzzles-deslizantes-educativos-tabla-juego").prepend(
        '<div id="tablero"\
              style="width:100%;\
                     height:100%;\
                     position:relative;\
                     left:0%;\
                     top:0%;\
                     margin: 0%;\
                     overflow:hidden;">\
         </div>');
    dimX = dimension_x;
    dimY = dimension_y;
    url_imagen = url_imagen_elegida;
    diccionario_posicion_blanca_juego = diccionario_posicion_blanca; 
    mostrarJuego();
    comenzarPartida();
    
    desbloquearCeldas(); //Esto evita que el tablero quede bloqueado si el usuario
                         //había terminado el juego y quiera volver a empezar
}

// /*
// * Obtiene el path de la imagen seleccionada
// */
function seleccionarImagen(numeroImagen){
    
    imagenSeleccionadaIndex = numeroImagen;
    url_imagen_elegida = diccionario_imagenes[numeroImagen];
}

// /*
// * Obtiene la posición de la blanca para la imagen seleccionada dadas sus dimensiones
// */
function seleccionarDimension(x,y){
    dimension_x = parseInt(x,10);
    dimension_y = parseInt(y,10);
    if ((dimension_x === 3) && (dimension_y === 3)){
        diccionario_posicion_blanca = diccionario_blancas_tipos_3x3[tipoRepresentacion];
    }
    else if ((dimension_x === 4) && (dimension_y === 4)){
        diccionario_posicion_blanca = diccionario_blancas_tipos_4x4[tipoRepresentacion];
    }
    else if ((dimension_x === 6) && (dimension_y === 6)){
        diccionario_posicion_blanca = diccionario_blancas_tipos_4x4[tipoRepresentacion];
    }
    
}


// /*
// * Resalta las áreas interactivas seleccionadas por el usuario
// */
function resaltarAreasSprite(event){
    
    $(".area-sprite").css({
        "background-color":"initial",
        "opacity": "initial",
        "filter": "initial"
    });
    var areaTocada = $(event.target);
    areaTocada.css({
        "background-color":"white",
        "opacity": "0.5",
        "filter": "alpha(opacity=50)"
    });
    
}


// /*
// * Muestra la vista educativa de la representación seleccionada
// */
function mostrarImagenInfo(){
    
    seleccionarImagen("1"); // Accion por defecto
    seleccionarDimension(dimension_x.toString(10),dimension_y.toString(10)); 
    
    // Si no existe contenido educativo, entonces proceder con el juego
    if ($.isEmptyObject(diccionario_imagen_info)){
        
        jugarYa();
        return;
    }
    
    // Se obtiene el path de la vista de información
    var url_imagen_info = diccionario_imagen_info[imagenSeleccionadaIndex];
    $("#vista-imagen-seleccionada-info").css({
        'background-repeat': 'no-repeat',
        "background-image": "url("+url_imagen_info+")",
        'background-size':"100% 100%"
    });
    
    ocultarVistas();
    $("#vista-imagen-seleccionada-info").css("display","block");
    vistaActual = "vista-imagen-seleccionada-info";
}


// /*
// * Obtiene el diccionario de imágenes y su respectivo diccionario de información.
// * Se usan diccionarios de esta manera porque es posible que se agreguen más imagenes
// * para un tipo dado de representación. Actualmente sólo hay uno por cada tipo.
// * Estos diccionarios sólo guardan los paths.
// */
function seleccionarTipoRepresentacion(numeroTipoRepresentacionSeleccionada){
    
    tipoRepresentacion = parseInt(numeroTipoRepresentacionSeleccionada,10);
    diccionario_imagen_info = {};
    
    switch(tipoRepresentacion) {
        case 1:
            
            diccionario_imagenes = diccionario_imagenes_petroglifos;
            diccionario_imagen_info = diccionario_imagen_info_petroglifos;
            break;
        case 2:
            
            diccionario_imagenes = diccionario_imagenes_pinturas_rupestres;
            diccionario_imagen_info = diccionario_imagen_info_pintura_rupestre;
            break;
            
        case 3:
            
            diccionario_imagenes = diccionario_imagenes_dolmen;
            diccionario_imagen_info = diccionario_imagen_info_dolmen;
            break;
        
        case 4:
            
            diccionario_imagenes = diccionario_imagenes_menhires;
            diccionario_imagen_info = diccionario_imagen_info_menhires;
            break;
            
        case 5:
            
            diccionario_imagenes = diccionario_imagenes_monolitos;
            diccionario_imagen_info = diccionario_imagen_info_monolitos;
            break;
            
        case 6:
            
            diccionario_imagenes = diccionario_imagenes_amolador;
            diccionario_imagen_info = diccionario_imagen_info_amolador;
            break;
            
        case 7:
            
            diccionario_imagenes = diccionario_imagenes_cupula;
            diccionario_imagen_info = diccionario_imagen_info_cupula;
            break;
            
        case 8:
            
            diccionario_imagenes = diccionario_imagenes_batea;
            diccionario_imagen_info = diccionario_imagen_info_batea;
            break;
            
        case 9:
            
            diccionario_imagenes = diccionario_imagenes_puntos_acoplados;
            diccionario_imagen_info = diccionario_imagen_info_puntos_acoplados;
            break;
            
        case 10:
            
            diccionario_imagenes = diccionario_imagenes_piedras_miticas;
            diccionario_imagen_info = diccionario_imagen_info_piedras_miticas;
            break;
            
        case 11:
            
            diccionario_imagenes = diccionario_imagenes_cerro_mitico;
            diccionario_imagen_info = diccionario_imagen_info_cerro_mitico;
            break;
            
        case 12:
            
            diccionario_imagenes = diccionario_imagenes_esfera_litica;
            diccionario_imagen_info = diccionario_imagen_info_esfera_litica;
            break;
            
        case 13:
            
            diccionario_imagenes = diccionario_imagenes_geoglifos;
            diccionario_imagen_info = diccionario_imagen_info_geoglifos;
            break;
            
        case 14:
            
            diccionario_imagenes = diccionario_imagenes_micropetroglifo;
            diccionario_imagen_info = diccionario_imagen_info_micropetroglifo;
            break;
        default:
            diccionario_imagenes = diccionario_imagenes_pinturas_rupestres;
            diccionario_imagen_info = diccionario_imagen_info_pintura_rupestre;
    }
}


// /*
// * Muestra la vista del mapa para un tipo dado de representación
// */
function verMapaDeTipoRepresentacion(){
    var url_mapa = diccionario_tipo_representacion_mapa[tipoRepresentacion];
    
    $("#vista-mapa").append("<img id='imagen_mapa' src='"+url_mapa+"' \
                            width='100%' height='auto'\
                            style='position:absolute; top: 25%; left: 0;'\
                            >");
    
    ocultarVistas();
    $("#vista-mapa").css("display","block");
    vistaActual = "vista-mapa";
}

// /*
// * Borra de memoria el mapa del tipo de representación después de salir de
// * su vista
// */
function quitarMapa(){
    $("#imagen_mapa").remove();
}


// /*
// * Muestra el menú principal
// */
function abrirMenuEmergente(){
    $("#vista-menu-emergente").css("width", "70%");
    
}

// /*
// * Muestra el menú de configuración
// */
function abrirMenuConfiguracion(){
    $("#vista-menu-configuracion").css("width", "70%");
    
}

// /*
// * Cierra el menú principal
// */
function cerrarMenuEmergente(){
    $("#vista-menu-emergente").css("width", "0%");
}

// /*
// * Cierra el menú de configuración
// */
function cerrarMenuConfiguracion(){
    $("#vista-menu-configuracion").css("width", "0%");
}

function verPortada(){
    ocultarVistas();
    $("#vista-portada").css("display", "block");
    //vistaActual = "vista-portada";
}

function cerrarPortada(){
    $("#vista-portada").css("display", "none");
}

function verPresentacion(){
    ocultarVistas();
    $("#vista-presentacion").css("display", "block");
    //vistaActual = "vista-presentacion";
}

function cerrarPresentacion(){
    $("#vista-presentacion").css("display", "none");
}

function verInstrucciones(){
    ocultarVistas();
    $("#vista-instrucciones").css("display", "block");
    //vistaActual = "vista-instrucciones";
}

function cerrarInstrucciones(){
    $("#vista-instrucciones").css("display", "none");
}

function verPantallaSalir(){
    cerrarMenuEmergente();
    ocultarVistas();
    $("#vista-salir").css("display", "block");
    vistaActual = "vista-salir";
    
}

function cerrarPantallaSalir(){
    $("#vista-salir").css("display", "none");
}

function mostrarInfoZoom(){
    
    // Se obtiene el path de la vista de información
    var url_imagen_info_zoom = diccionario_info_zoom[tipoRepresentacion];
    $("#vista-imagen-seleccionada-info-zoom").css({
        'background-repeat': 'no-repeat',
        "background-image": "url("+url_imagen_info_zoom+")",
        'background-size':"100% 100%"
    });
    
    ocultarVistas();
    $("#vista-imagen-seleccionada-info-zoom").css("display","block");
    vistaActual = "vista-imagen-seleccionada-info-zoom";
}
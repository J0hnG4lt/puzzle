
$(document).ready(function(){
    
    $(".area-sprite").on("click", resaltarAreasSprite);
    $(".opcion-sprite").on("click", resaltarOpcionSprite);
    mostrarTipoRepresentacion();
    
});



var url_imagen_elegida = "";
var dimension_x=3;
var dimension_y=3;

function ocultarVistas(){
    $(".vista").css("display","none");
}

function mostrarMenu(){
    ocultarVistas();
    $("#vista-menu").css("display","block");
    var url_de_representacion_seleccionada = diccionario_imagenes[1];
    if ($("#tabla-seleccionar-representacion-imagen").length !== 0){
        $("#tabla-seleccionar-representacion-imagen").remove();
    }
    $("#puzzles-deslizantes-educativos-tabla-seleccionar").prepend(
        '<img src='+url_de_representacion_seleccionada+' \
              id=tabla-seleccionar-representacion-imagen \
              alt="icon" \
              width="100%" \
              height="170%" \
              style="position:absolute; top: -20%; left: 0;" />'
                                                                 );
}

function mostrarTipoRepresentacion(){
    ocultarVistas();
    $("#vista-seleccionar-tipo-manifestacion").css("display","block");
}

function mostrarDimensiones(){
    ocultarVistas();
    $("#vista-dimensiones").css("display","block");
}

function mostrarJuego(){
    ocultarVistas();
    $("#vista-juego").css("display","block");
}


function jugarYa(){
    
    $("#tablero").remove();
    $("#puzzles-deslizantes-educativos-tabla-juego").prepend(
        '<div id="tablero"\
              style="width:100%;\
                     height:100%;\
                     position:relative;\
                     left:0%;\
                     top:0%;\
                     margin: 2.5%;\
                     overflow:hidden;">\
                <img src="#" alt="icon" id="imagen_seleccionada_tablero"\
                 width="100%" height="100%"\
                 style="position:absolute; top: 0; left: 0;" />\
         </div>');
    dimX = dimension_x;
    dimY = dimension_y;
    url_imagen = url_imagen_elegida;
    
    generarCeldas();
    prepararResponsive();
    comenzarPartida();
    
    mostrarJuego();
}

function seleccionarImagen(numeroImagen){
    
    imagenSeleccionadaIndex = numeroImagen;
    url_imagen_elegida = diccionario_imagenes[numeroImagen];
}

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

function resaltarOpcionSprite(event){
    
    $(".opcion-sprite").css({
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



function mostrarImagenInfo(){
    
    
    if ($.isEmptyObject(diccionario_imagen_info)){
        
        jugarYa();
        return;
    }
    
    var url_imagen_info = diccionario_imagen_info[imagenSeleccionadaIndex];
    $("#vista-imagen-seleccionada-info").css({
        'background-repeat': 'no-repeat',
        "background-image": "url("+url_imagen_info+")",
        'background-size':"100% 100%"
    });
    
    ocultarVistas();
    $("#vista-imagen-seleccionada-info").css("display","block");
}


function seleccionarTipoRepresentacion(numeroTipoRepresentacionSeleccionada){
    
    tipoRepresentacion = parseInt(numeroTipoRepresentacionSeleccionada,10);
    
    switch(tipoRepresentacion) {
        case 1:
            
            diccionario_imagenes = diccionario_imagenes_petroglifos;
            break;
        case 2:
            
            diccionario_imagenes = diccionario_imagenes_pinturas_rupestres;
            break;
            
        case 3:
            
            diccionario_imagenes = diccionario_imagenes_dolmen;
            break;
        
        case 4:
            
            diccionario_imagenes = diccionario_imagenes_menhires;
            break;
            
        case 5:
            
            diccionario_imagenes = diccionario_imagenes_monolitos;
            break;
            
        case 6:
            
            diccionario_imagenes = diccionario_imagenes_amolador;
            break;
            
        case 7:
            
            diccionario_imagenes = diccionario_imagenes_cupulas;
            break;
            
        case 8:
            
            diccionario_imagenes = diccionario_imagenes_batea;
            break;
            
        case 9:
            
            diccionario_imagenes = diccionario_imagenes_puntos_acoplados;
            break;
            
        case 10:
            
            diccionario_imagenes = diccionario_imagenes_piedras_miticas;
            break;
            
        case 11:
            
            diccionario_imagenes = diccionario_imagenes_cerro_mitico;
            break;
            
        case 12:
            
            diccionario_imagenes = diccionario_imagenes_esfera_litica;
            break;
            
        case 13:
            
            diccionario_imagenes = diccionario_imagenes_geoglifos;
            break;
            
        case 14:
            
            diccionario_imagenes = diccionario_imagenes_micropetroglifo;
            break;
        default:
            diccionario_imagenes = diccionario_imagenes_petroglifos;
            diccionario_imagen_info = diccionario_imagen_info_petroglifos;
    }
}

function verMapaDeTipoRepresentacion(){
    var url_mapa = diccionario_tipo_representacion_mapa[tipoRepresentacion];
    
    $("#vista-mapa").append("<img id='imagen_mapa' src='"+url_mapa+"' \
                            width='100%' height='100%'\
                            style='position:absolute; top: 0; left: 0;'\
                            >");
    
    ocultarVistas();
    $("#vista-mapa").css("display","block");
    
}

function quitarMapa(){
    $("#imagen_mapa").remove();
}


function seleccionarAmolador(){
    
}
var productos = [];
var categorias = [];
var promociones = [];
var xmlDocProd = loadXMLDoc("xml/productos.xml");
var xmlDocPromos = loadXMLDoc("xml/promos.xml");
var prodActual;
var promActual = 0;




$(document).ready(function() { 
	cargarProductos();
	crearPromos();
	cargarPromo();
	$('#nextPromo').click(nextPromo);
	$('#prevPromo').click(prevPromo);
	$('#pedirPromo').click(crearDialogoPromo);
	actualizarPedido(true);
	$('#encargar').click(encargarPedido);
	$('#clear').click(limpiarPedido);
	$('div#loading').hide();
    $('#imgLoading').hide();
});











//CAMBIAR CSS
function cambiarHojaDeEstilos(title) {
    var i, a, main;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    	if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")){
            a.disabled = true;
            if(a.getAttribute("title") == title) a.disabled = false;
            if(a.getAttribute("title") == "main") a.disabled = false;
            if(a.getAttribute("title") == "mobile") a.disabled = false;
        }
    }
    
}



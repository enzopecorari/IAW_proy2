var productos = [];
var categorias = [];
var promociones = [];
var xmlDocProd = loadXMLDoc("xml/productos.xml");
var xmlDocPromos = loadXMLDoc("xml/promos.xml");
var prodActual;
var promActual = 0;
var style=1;




$(document).ready(function() { 
	if (localStorage.getItem('proy2-style'))
	{ 	
		style=localStorage.getItem('proy2-style');
	}
	$('#estilo0').attr('disabled','disabled');
	if(style==1) {
		$('#estilo1').removeAttr('disabled');
		$('#estilo2').attr('disabled','disabled');
	}
	else {
		$('#estilo1').attr('disabled','disabled');
		$('#estilo2').removeAttr('disabled');
	}
		

	
	cargarProductos();
	crearPromos();
	cargarPromo();
	$('#nextPromo').click(nextPromo);
	$('#prevPromo').click(prevPromo);
	$('#pedirPromo').click(crearDialogoPromo);
	actualizarPedido(true);
	$('#encargar').click(encargarPedido);
	$('#clear').click(limpiarPedido);
	$('.changeStyle').click(changeStyle);
	$('div#loading').hide('slow');
    $('#imgLoading').hide('slow');
});


//CAMBIAR CSS
function changeStyle() {
    /*var i, a, main;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    	if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")){
            a.disabled = true;
            if(a.getAttribute("title") == title) a.disabled = false;
            if(a.getAttribute("title") == "main") a.disabled = false;
            if(a.getAttribute("title") == "mobile") a.disabled = false;
        }
    }
    */
	if(style==1) {
		style=2;
		$('#estilo1').attr('disabled','disabled');
		$('#estilo2').removeAttr('disabled');
		
	}
	else {
		style=1;
		$('#estilo1').removeAttr('disabled');
		$('#estilo2').attr('disabled','disabled');
	}
	localStorage.setItem('proy2-style',style);
	
}



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
	aplicarEstilo();
	$('#encargar').click(encargarPedido);
	$('#clear').click(limpiarPedido);
	$('.changeStyle').click(changeStyle);
	$('a.autores').click(mostrarAutores);
	$('a.volverAutores').click(volverAutores);
	$('.menu a').click(ocultarCarteles);
	$('div#loading').hide('slow');
    $('#imgLoading').hide('slow');
});


//CAMBIAR CSS
function changeStyle() {

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
	aplicarEstilo();
	
	
}


function aplicarEstilo() {

	if(style==1) {
		$(".estilo1").show();
		$(".estilo2").hide();
		
	}
	else if (style==2) {
		$(".estilo2").show();
		$(".estilo1").hide();

		
	} 

}

function mostrarAutores() {
	var html = "<h2>Desarrolladores</h2>" +
			"<h3>Enzo A. Pecorari</h3>" +
			"<h4>LU: 89112 - enzo_pecorari@hotmail.com</h4>" +
			"<h3>Diego M. Schwindt</h3>" +
			"<h4>LU: 88993 - diego.sch21.com</h4>" +
			"<p>Ingenier&iacute;a de Aplicaciones Web - 2do cuatrimestre 2012</br>Universidad Nacional del Sur</p>"+
			"<p><strong>Un proyecto bien de machos!! =P</p>";
	$("#autores .contentAutores").html(html);
	$('div#loading').show();
	$("#autores").show();
}

function volverAutores(){
	$('div#loading').hide();
	$("#autores").hide();
}

function ocultarCarteles() {
	$('#prodAgregado').hide();
	$('#promoAgregada').hide();
}
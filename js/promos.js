
function crearPromos(){

	var promos = xmlDocPromos.getElementsByTagName("promo");
	var prods = xmlDocProd.getElementsByTagName("categoria");
	
	
	for (promoActual = 0; promoActual < promos.length; promoActual++){
		var nombre = promos[promoActual].childNodes[1].firstChild.nodeValue;
		var descrip = promos[promoActual].childNodes[3].firstChild.nodeValue;
		var descuento = Number(promos[promoActual].childNodes[5].firstChild.nodeValue);
		var promo = new Promocion (nombre, descrip, descuento);
		for(j = 1; j <promos[promoActual].childNodes[7].childNodes.length;j = j + 2){
			var _id = promos[promoActual].childNodes[7].childNodes[j].firstChild.nodeValue;
			var cant = Number(promos[promoActual].childNodes[7].childNodes[j].attributes[0].nodeValue);
			var prod;
	    	for (i=0;i<productos.length;i++){
	    		if (productos[i].getId()==_id){
	    			prod = productos[i];
	    			promo.addProducto(prod,cant);
	    		}    			
	    	}
		}
		promociones[promociones.length] = promo;
		
		
	}
}

function cargarPromo(){
	var prom=promociones[promActual];
	$(".tittleProm").text(prom.getNombre());
	$(".descProm").text(prom.getDescripcion());
	$(".imgProm").html("");
	var precioOrig=0;
	for(j = 0; j <promociones[promActual].getProductos().length;j++) {
		var p = promociones[promActual].getProductos()[j];
		for (k=0; k<promociones[promActual].getCantidadProducto(j)/p.getUnidEncargue();k++)
			$(".imgProm").append("<img class='small' src='img/"+p.getImgSmall()+"' alt='imagen promo'/>");
	}
	$(".precioProm").text("$"+prom.getPrecioProm());
	$(".precioOrig").text("$"+prom.getPrecioOrig());
}

function nextPromo() {
	promActual = (promActual +1) %promociones.length;
	$('#promoAgregada').hide();
	cargarPromo();
	
}

function prevPromo() {
	if(promActual==0) promActual= promociones.length-1;
	else promActual--;
	$('#promoAgregada').hide();
	cargarPromo();
}


function crearDialogoPromo(event) {
	var dialog = $('#promocion .agregar');
	var fondo = $('div#loading'); 
	var promo = promociones[promActual];
	$('#promocion .agregar .tittleProm').html(promo.getNombre());
	
	var options = "";
	for (i=1; i<=5;i++) {
		if (i== 1)
			options+= "<option value="+i+" selected>"+i+"</option>";
		else
			options+= "<option value="+i+">"+i+"</option>";
	}
	$('#promocion .agregar #selectCantProm').html(options).selectmenu('refresh');

	var html= "<ul class='listaProdPromo'>";
	for(j = 0; j <promo.getProductos().length;j++) {
		var p = promo.getProductos()[j];
		html+="<li><span class='cantProdPromo'>"+promo.getCantidadProducto(j)+"</span>x "+p.getNombre()+"</li>";
	}
	html+="</ul><span class='";
	$('#promocion .agregar .contentConfirm').html(html);
	
	
	$('#promocion .agregar .cancel').click(function() {
		fondo.hide();
		dialog.hide();
	});
	
	
	fondo.show();
	dialog.show();
}

function cambiarCantAgregarPromo(elem) {
	var promo = promociones[promActual];
	var newCant = Number($(elem).val());
	html="";
	for(j = 0; j <promo.getProductos().length;j++) {
		var p = promo.getProductos()[j];
		html+="<li><span class='cantProdPromo'>"+promo.getCantidadProducto(j)*newCant+"</span>x "+p.getNombre()+"</li>";
	}
	$(".listaProdPromo").html(html);
	$(".precioAgregarPromo").text(promo.getPrecioProm()*newCant);
		
		
	
}

function okAgregarPromo() {	
	var cant =  Number($('#promocion .agregar #selectCantProm').val());
	Pedido.addPromocion(promActual,cant);
	
	almacenarPedido();
	actualizarPedido(false);
	
	$('div#loading').hide();
	$('#promocion .agregar').hide();
	$('#promoAgregada').show('slow');
	setTimeout(ocultarCartelPromo,3500);
}

function ocultarCartelPromo() {
	$('#promoAgregada').hide('slow');
}
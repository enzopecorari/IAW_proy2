function actualizarPedido(almacenado) {
	if (almacenado && localStorage.getItem('pedidoIAW'))
	{ 	
		pedidoSerialized = localStorage.getItem('pedidoIAW');
		Pedido.data = JSON.parse(pedidoSerialized);
	}
	
	/*Productos*/
	var html = "";
	var lista1 = $('#productosPedido1');
	var lista2 = $('#productosPedido2');
	for (i=0; i<Pedido.data.productos.length;i++) {
		var posProd = Pedido.data.productos[i];
		if (posProd >=0) {
			var numCat = Math.floor(Number(posProd)/100);
			var numProd = Number(posProd)%100;
			var prod = categorias[numCat].getProducto(numProd);
			var cant = Pedido.data.productosCant[i];
			var options= "";
			var c= 0;
			for (j=0; j<15;j++) {
				c+= prod.getUnidEncargue();
				if ((j+1)*prod.getUnidEncargue()== cant)
					options+= "<option value="+c+" selected>"+c+"</option>";
				else
					options+= "<option value="+c+">"+c+"</option>";
			}
			
			html += "<li class='item' id='li"+i+"'> <img class='small' src='img/"+prod.getImgSmall()+"' alt='thumbnail'/>"+
			"<h4 class='nombreProducto'>"+prod.getNombre()+" </h4>" + "<span class='destroy' onclick='quitarProducto("+i+");'></span>"+
			"<span class='cantProd' data-role='fieldcontent'><label for='select-cant'>Cambiar cantidad </label><select id='selectCant' data-mini='true' data-inline='true' onchange='cambiarCant(this,"+i+")'>"+options+"</select></span>"+
			"<p class='infoProducto'><span class='cantProducto'>Cantidad: "+cant+ "</span><span class='precioProducto'>$"+prod.getPrecio()*cant+" </span>" +
			"<span class='pesoProducto'>"+prod.getPeso()*cant+" kg. </span>" +	"</p></li>";
		}		
	}
	lista1.html(html);
	lista2.html(html)
	try {
		$('#productosPedido1 .item #select-cant').selectmenu('refresh');
		$('#productosPedido2 .item #select-cant').selectmenu('refresh');
		//lista.listview();
		lista1.listview('refresh');
		lista2.listview('refresh');
	}
	catch(e) {}
	
	/*Promos*/
	html = "";
	lista1 = $('#promosPedido1');
	lista2 = $('#promosPedido2');
	for (i=0; i<Pedido.data.promociones.length;i++) {
		var posProm = Pedido.data.promociones[i];
		if (posProm >=0) {
			var prom = promociones[posProm];
			var cant = Pedido.data.promocionesCant[i];
			var options= "";
			for (k=1; k<=5;k++) {
				if (k== cant)
					options+= "<option value="+k+" selected>"+k+"</option>";
				else
					options+= "<option value="+k+">"+k+"</option>";
			}
			
			html += "<li data-role='list-divider' class='itemProm'  id='promPed"+i+"'>" +
			"<h3 class='nombrePromocion'>"+prom.getNombre()+" </h3>" + "<span class='destroy' onclick='quitarPromocion("+i+");'></span>"+
			"<span class='cantProd' data-role='fieldcontent'><label for='select-cant'>Cambiar cantidad </label><select id='selectCant' data-mini='true' data-inline='true' onchange='cambiarCantPromo(this,"+i+")'>"+options+"</select></span>"+
			"<span class='cantProducto'>Cantidad: "+cant+ "</span><span class='precioProducto'>$"+prom.getPrecioProm()*cant+" </span></li>";
			for(j = 0; j <prom.getProductos().length;j++) {
				var p = prom.getProductos()[j];
				html+= "<li class='itemProm promPed"+i+"'>" + "<img class='small' src='img/"+p.getImgSmall()+"' alt='thumbnail'/>"+
				"<h4 class='nombreProducto'>"+p.getNombre()+" </h4>" +
				"<p class='infoProducto'><span class='cantProducto'>Cantidad: "+prom.getCantidadProducto(j)*cant+" </span><span class='pesoProducto'>"+p.getPeso()*cant+" kg. </span>" +	"</p></li>";
			}

				
		}
		
		
	}
	lista1.html(html);
	lista2.html(html);
	try {
		$('#promosPedido1 .item #select-cant').selectmenu('refresh');
		$('#promosPedido2 .item #select-cant').selectmenu('refresh');
		//lista.listview();
		lista1.listview('refresh');
		lista2.listview('refresh');
	}
	catch(e) {}
	actualizarPeso();
	actualizarPrecio();
}

function almacenarPedido() {
	pedidoSerialized = JSON.stringify(Pedido.data);
	alert(pedidoSerialized);
	localStorage.setItem('pedidoIAW',pedidoSerialized);

}

function quitarProducto(index) {
	$('li#li'+index).remove();
	Pedido.removeProducto(index);
	almacenarPedido();
	actualizarPrecio();
	actualizarPeso();
}

function quitarPromocion(index) {
	$('li#promPed'+index).remove();
	$('li.promPed'+index).remove();
	Pedido.removePromocion(index);
	almacenarPedido();
	actualizarPrecio();
	actualizarPeso();
	
}

function cambiarCant(elem,index) {
	var newCant = $(elem).val();
	Pedido.cambiarCantProducto(index,newCant);
	almacenarPedido();
	actualizarPedido(false);
}

function cambiarCantPromo(elem,index) {
	var newCant = $(elem).val();
	Pedido.cambiarCantPromocion(index,newCant);
	almacenarPedido();
	actualizarPedido(false);
}

function actualizarPrecio() {
	$("#precioTotal").html(Pedido.getPrecioTotal());

}

function actualizarPeso() {
	$("#pesoTotal").html(Pedido.getPesoTotal());
}

function encargarPedido() {
	var conf = confirm("Desea encargar el pedido?");
	if (conf) {
		alert("Pedido encargado [[NO IMPLEMENTADO - Requiere comunicacion con servidor]]")
		Pedido.clear();
		actualizarPedido(false);
		localStorage.removeItem('pedidoIAW');
	}
}

function limpiarPedido() {
	var conf = confirm("Desea quitar todos los productos y promociones del pedido?");
	if (conf) {
		Pedido.clear();
		actualizarPedido(false);
		localStorage.removeItem('pedidoIAW');
	}
	
}
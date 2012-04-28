
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

/*PRODUCTOS*/
var productos = [];
var categorias = [];
function cargarProductos(){
	
	var xmlDoc = loadXMLDoc("xml/productos.xml");
	var prods = xmlDoc.getElementsByTagName("categoria");
	var div = $('#listaCat');
	div.collapsibleset();
	var nomCat, prodsCat, _nombre, _precio, _peso, _imgS, _imgL;
	for(j = 0; j <prods.length; j++){ //Por cada categoria
		cat = new Categoria(prods[j].childNodes[1].firstChild.nodeValue);
		nomCat = cat.getNombre();
		prodsCat="";
		
		
		for (l = 3; l < prods[j].childNodes.length; l = l + 2){
			var prod = prods[j].childNodes[l]; 
			_nombre = prod.childNodes[1].firstChild.nodeValue;
			_precio = prod.childNodes[3].firstChild.nodeValue;
			_peso = prod.childNodes[5].firstChild.nodeValue;
			_imgS = prod.childNodes[7].firstChild.nodeValue;
			_imgL = prod.childNodes[9].firstChild.nodeValue;
			_unidEncargue = Number(prod.childNodes[11].firstChild.nodeValue);

			_id = prod.attributes[0].nodeValue;
			produc = new Producto(_nombre,_precio,_peso,_imgS,_imgL,nomCat, _id, _unidEncargue);
			productos[productos.length] = produc;
			id= cat.getCantidad() + 100*categorias.length;
			cat.addProducto(produc);
			prodsCat += "<div class='item'><div class='producto' id=p"+id+">" + "<span class='nombreProducto'>"+_nombre+" </span>" +
					"<span class='precioProducto'>$"+_precio+" </span>" + "<span class='pesoProducto'>"+_peso+"gr. </span>" +
					"<div class='imgSmallProducto'><img src='img/"+_imgS+"' alt='small image'/></div>"+ "</div></div>"; 
			
			//prodsCat += "<div class='imgLargeProducto'><img src='img/"+_imgL+"' alt='large image'/></div>"
			
			
		}
		
		categorias[categorias.length] = cat;
		div.append("<div data-role='collapsible' data-theme='e' data-content-theme='e' class='categoria'><h2>"+nomCat+"</h2>"+prodsCat+"</div>")
	}
	//alert(categorias[1].getProductos()[1].getNombre());//alert ejemplo
	div.on("click",".item",crearDialogo);

	div.collapsibleset('refresh');
	

}

function crearDialogo(event) {
	var dialog = $('#productos .agregar');
	var fondo = $('div#loading'); 
	$('#productos .agregar .contentConfirm').html(this.innerHTML);
	var posProd = $(this.firstChild).attr("id").substring(1);
	var numCat = Math.floor(Number(posProd)/100);
	var numProd = Number(posProd)%100;
	var prod = categorias[numCat].getProducto(numProd);
	var options = "";
	var cant= 0;
	
	for (i=0; i<15;i++) {
		cant+= prod.getUnidEncargue();
		if (i== 0)
			options+= "<option value="+cant+" selected>"+cant+"</option>";
		else
			options+= "<option value="+cant+">"+cant+"</option>";
	}
	$('#productos .agregar #selectCant').html(options).selectmenu('refresh');
	
	$('#productos .agregar .cancel').click(function() {
		fondo.hide();
		dialog.hide();
	});
	
	
	fondo.show();
	dialog.show();
}

function okAgregar() {
	var posProd = $('#productos .agregar .producto').attr("id").substring(1);
	var cant =  Number($('#productos .agregar #selectCant').val());
	Pedido.addProducto(posProd,cant);
	almacenarPedido();
	actualizarPedido(false);
	
	$('div#loading').hide();
	$('#productos .agregar').hide();
	
}



/*PROMOCIONES*/

var promociones = [];
function crearPromos(){

	var xmlDoc = loadXMLDoc("xml/promos.xml");
	var promos = xmlDoc.getElementsByTagName("promo");
	var xmlDoc = loadXMLDoc("xml/productos.xml");
	var prods = xmlDoc.getElementsByTagName("categoria");
	
	
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

var promActual = 0;
function cargarPromo(){
	var prom=promociones[promActual];
	$(".tittleProm").text(prom.getNombre());
	$(".descProm").text(prom.getDescripcion());
	$(".imgProm").html("");
	var precioOrig=0;
	for(j = 0; j <promociones[promActual].getProductos().length;j++) {
		var p = promociones[promActual].getProductos()[j];
		$(".imgProm").append("<img src='img/"+p.getImgSmall()+"' alt='imagen promo'/>");
	}
	$(".precioProm").text("$"+prom.getPrecioProm());
	$(".precioOrig").text("$"+prom.getPrecioOrig());
}

function nextPromo() {
	promActual = (promActual +1) %promociones.length;
	cargarPromo();
	
}

function prevPromo() {
	if(promActual==0) promActual= promociones.length-1;
	else promActual--;
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
	$('#promocion .agregar #selectCant').html(options).selectmenu('refresh');

	var html= "<ul class='listaProdPromo'>";
	for(j = 0; j <promo.getProductos().length;j++) {
		var p = promo.getProductos()[j];
		html+="<li><span class='cantProdPromo'>+"promo.getCantidadProducto(j)+"</span>x "+p.getNombre()+"</li>";
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
	var newCant = $(elem).val();
	$(".cantProdPromo").text(promo.getCantidadProducto(j)*newCant);
	$(".precioAgregarPromo").text(promo.getPrecioProm()*newCant);
		
		
	
}

function okAgregarPromo() {	
	var cant =  Number($('#promocion .agregar #selectCant').val());
	Pedido.addPromocion(promActual,cant);
	
	almacenarPedido();
	actualizarPedido(false);
	
	$('div#loading').hide();
	$('#promocion .agregar').hide();
}



/*PEDIDO*/
function actualizarPedido(almacenado) {
	if (almacenado && localStorage.getItem('pedidoIAW'))
	{ 	
		pedidoSerialized = localStorage.getItem('pedidoIAW');
		Pedido.data = JSON.parse(pedidoSerialized);
	}
	
	/*Productos*/
	var html = "";
	var lista = $('#productosPedido');
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
			
			html += "<li class='item' id=li"+i+"> <img src='img/"+prod.getImgSmall()+"' alt='thumbnail'/>"+
			"<h4 class='nombreProducto'>"+prod.getNombre()+" </h4>" + "<span class='destroy' onclick='quitarProducto(this);'></span>"+
			"<span class='cantProd' data-role='fieldcontent'><label for='select-cant'>Cambiar cantidad</label><select id='selectCant' data-mini='true' data-inline='true' onchange='cambiarCant(this)'>"+options+"</select></span>"+
			"<p class='infoProducto'><span class='cantProducto'>Cantidad: "+cant+ "</span><span class='precioProducto'>$"+prod.getPrecio()*cant+" </span>" +
			"<span class='pesoProducto'>"+prod.getPeso()*cant+"gr. </span>" +	"</p></li>";
		}		
		$('#productos .item #select-cant').selectmenu('refresh');
	}
	try {
		lista.html(html);
		//lista.listview();
		lista.listview('refresh');
	}
	catch(e) {}
	
	/*Promos*/
	var html = "";
	var lista = $('#productosPedido');
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
			
			html += "<li class='item' id=li"+i+"> <img src='img/"+prod.getImgSmall()+"' alt='thumbnail'/>"+
			"<h4 class='nombreProducto'>"+prod.getNombre()+" </h4>" + "<span class='destroy' onclick='quitarProducto(this);'></span>"+
			"<span class='cantProd' data-role='fieldcontent'><label for='select-cant'>Cambiar cantidad:</label><select id='selectCant' data-mini='true' data-inline='true' onchange='cambiarCant(this)'>"+options+"</select></span>"+
			"<p class='infoProducto'><span class='cantProducto'>Cantidad: "+cant+ "</span><span class='precioProducto'>$"+prod.getPrecio()*cant+" </span>" +
			"<span class='pesoProducto'>"+prod.getPeso()*cant+"gr. </span>" +	"</p></li>";
		}		
		$('#productos .item #select-cant').selectmenu('refresh');
	}
	try {
		lista.html(html);
		//lista.listview();
		lista.listview('refresh');
	}
	catch(e) {}
    
}

function almacenarPedido() {
	pedidoSerialized = JSON.stringify(Pedido.data);
	alert(pedidoSerialized);
	localStorage.setItem('pedidoIAW',pedidoSerialized);

}

function quitarProducto(elem) {
	var li = elem.parentNode;
	var index = Number($(li).attr("id").substring(2));
	var padre = li.parentNode;
	padre.removeChild(li);
	Pedido.removeProducto(index);
	almacenarPedido();
	
}

function cambiarCant(elem) {
	var newCant = $(elem).val();
	var li = elem.parentNode.parentNode;
	var index = Number($(li).attr("id").substring(2));
	$(li).find('.cantProducto').html("Cantidad: "+newCant);
	Pedido.cambiarCantProducto(index,newCant);
	almacenarPedido();
}

function encargarPedido() {}

function limpiarPedido() {
	Pedido.clear();
	actualizarPedido();
	localStorage.removeItem('pedidoIAW');
	
}



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




$(document).ready(function() { 
	
	cargarPromos();
	$('#nextPromo').click(function() {
		cargarPromos();
	})

	cargarProductos();
	
	$('div#loading').hide();
    $('#imgLoading').hide();
})

/*PRODUCTOS*/

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
		//	_unidEncargue = prod.childNodes[11].firstChild.nodeValue;
			
			produc = new Producto(_nombre,_precio,_peso,_imgS,_imgL,nomCat);
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
	
	$('#productos .agregar .cancel').click(function() {
		fondo.hide();
		dialog.hide();
	});
	
	
	fondo.show();
	dialog.show();
}

function okAgregar() {
	var pid = $('#productos .agregar .producto').attr("id").substring(1);
	var cant =  Number($('#productos .agregar #cant').val());
	//alert($('#productos .agregar .nombreProducto').html() + " #prod="+Number(pid)%100+" #cat="+Math.floor(Number(pid)/100)+" cant:"+cant);
	var numCat = Math.floor(Number(pid)/100);
	var numProd = Number(pid)%100;
	
	var prod = categorias[numCat].getProducto(numProd);
	Pedido.addProducto(prod,cant);
	actualizarPedido();
	$('div#loading').hide();
	$('#productos .agregar').hide();
	
}

/*PROMOCIONES*/
var promoActual = -1;
function cargarPromos(){

	var xmlDoc = loadXMLDoc("xml/promos.xml");
	var promos = xmlDoc.getElementsByTagName("promo");
	promoActual = (promoActual +1) %promos.length;

	$("#tittleProm").text(promos[promoActual].childNodes[1].firstChild.nodeValue);
	$("#descProm").text(promos[promoActual].childNodes[3].firstChild.nodeValue);
	$("#precioProm").text(promos[promoActual].childNodes[5].firstChild.nodeValue);
	$("#imgProm").html("");
	for(j = 1; j <promos[promoActual].childNodes[9].childNodes.length;j = j + 2)
		$("#imgProm").append("<img src='img/"+promos[promoActual].childNodes[9].childNodes[j].firstChild.nodeValue+"' alt='imagen promo'/>");

}



/*PEDIDO*/
function actualizarPedido() {
	var lista = "";
	for (i=0; i<Pedido.productos.length;i++) {
		var prod = Pedido.productos[i];
		var cant = Pedido.productosCant[i];
		lista += "<li class='item'> <img src='img/"+prod.getImgSmall()+"' alt='thumbnail'/>"+
		"<h4 class='nombreProducto'>"+prod.getNombre()+" </h4>" + "<span class='destroy'></span>"+
		"<p class='infoProducto'>Cantidad: "+cant+ "<span class='precioProducto'>$"+prod.getPrecio()*cant+" </span>" +
		"<span class='pesoProducto'>"+prod.getPeso()*cant+"gr. </span>" +	"</p></li>"; 
	}
	$('#productosPedido').html(lista).listview('refresh');
    
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
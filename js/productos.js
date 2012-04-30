
function cargarProductos(){
	
	
	var prods = xmlDocProd.getElementsByTagName("categoria");
	var div1 = $('#listaCat1');
	var div2 = $('#listaCat2');
	div1.collapsibleset();
	div2.collapsibleset();
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
			prodsCat += "<div class='producto' id=p"+id+">" + "<span class='nombreProducto'>"+_nombre+" </span>" +
					"<div class='imgSmallProducto'><img class='small' src='img/"+_imgS+"' alt='small image'/></div>"+
					"<span class='precioProducto'>$"+_precio+" </span></div>"; 
			
			
			
			
		}
		
		categorias[categorias.length] = cat;
		div1.append("<div  data-role='collapsible' data-theme='e' data-content-theme='e' class='categoria'><h2>"+nomCat+"</h2>"+prodsCat+"</div>")
		div2.append("<div  data-role='collapsible' data-theme='b' data-content-theme='b' class='categoria'><h2>"+nomCat+"</h2>"+prodsCat+"</div>")
		
	}

	div1.on("click",".producto",crearDialogo);
	div2.on("click",".producto",crearDialogo);

	div1.collapsibleset('refresh');
	div2.collapsibleset('refresh');
	

}

function crearDialogo(event) {
	var dialog = $('#productos .agregar');
	var fondo = $('div#loading');
	var posProd = $(this).attr("id").substring(1);
	prodActual = posProd;
	var numCat = Math.floor(Number(posProd)/100);
	var numProd = Number(posProd)%100;
	var prod = categorias[numCat].getProducto(numProd);
	var html = "<span class='nombreProducto'>"+prod.getNombre()+"</span>" +
			"<div class='imgLargeProducto'><img class='large' src='img/"+prod.getImgLarge()+"' alt='large image'/></div>"; 
	$('#productos .agregar .contentConfirm').html(html);
	
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
	var peso = prod.getPeso()*prod.getUnidEncargue();
	peso  = Math.round(peso * Math.pow(10, 2)) / Math.pow(10, 2);
	html = "<span class='pesoProd'>"+peso+"kg.</span><span class='precioProd'>$"+prod.getPrecio()*prod.getUnidEncargue()+"</span>";
	$('#productos .agregar .totalProd').html(html);
	$('#productos .agregar .cancel').click(function() {
		fondo.hide();
		dialog.hide();
	});
	
	
	fondo.show();
	dialog.show();
}

function cambiarCantAgregarProd(elem) {
	var posProd = prodActual;
	var numCat = Math.floor(Number(posProd)/100);
	var numProd = Number(posProd)%100;
	var prod = categorias[numCat].getProducto(numProd);
	var newCant = Number($(elem).val());
	var peso = prod.getPeso()*newCant;
	peso  = Math.round(peso * Math.pow(10, 2)) / Math.pow(10, 2);
	var html = "<span class='pesoProd'>"+peso+"kg.</span><span class='precioProd'>$"+prod.getPrecio()*newCant+"</span>";
	$('#productos .agregar .totalProd').html(html);
	
}


function okAgregar() {
	var posProd = prodActual;
	var cant =  Number($('#productos .agregar #selectCant').val());
	Pedido.addProducto(posProd,cant);
	almacenarPedido();
	actualizarPedido(false);
	
	$('div#loading').hide();
	$('#productos .agregar').hide();
	$('#prodAgregado').show('slow');
	setTimeout(ocultarCartelProd,3500);
	
}

function ocultarCartelProd() {
	$('#prodAgregado').hide('slow');
}
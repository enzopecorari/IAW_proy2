function cargarProductos(){

	var categorias = []
	
	var xmlDoc = loadXMLDoc("xml/productos.xml");
	var prods = xmlDoc.getElementsByTagName("categoria");
	var div = $('#listaCat');
	var nomCat, prodsCat;
	for(j = 0; j <prods.length; j++){ //Por cada categoria
		cat = new Categoria(prods[j].childNodes[1].firstChild.nodeValue);
		nomCat = cat.getNombre();
		prodsCat="";
		
		for (l = 3; l < prods[j].childNodes.length; l = l + 2){
			prodsCat += "<div class='producto'>"
			var _nombre = prods[j].childNodes[l].childNodes[1].firstChild.nodeValue;
			prodsCat += "<span class='nombreProducto'>"+_nombre+" </span>" 
			var _precio = prods[j].childNodes[l].childNodes[3].firstChild.nodeValue;
			prodsCat += "<span class='precioProducto'>$"+_precio+" </span>"
			var _peso = prods[j].childNodes[l].childNodes[5].firstChild.nodeValue;
			prodsCat += "<span class='pesoProducto'>"+_peso+"gr. </span>"
			var _imgS = prods[j].childNodes[l].childNodes[7].firstChild.nodeValue;
			prodsCat += "<div class='imgSmallProducto'><img src='img/"+_imgS+"' alt='small image'/></div>"
			var _imgL = prods[j].childNodes[l].childNodes[9].firstChild.nodeValue;
			produc = new Producto(_nombre,_precio,_peso,_imgS,_imgL);
			//prodsCat += "<div class='imgLargeProducto'><img src='img/"+_imgL+"' alt='large image'/></div>"
			prodsCat += "</div>"
			cat.addProducto(produc);
		}
		
		categorias[categorias.length] = cat;
		div.append("<div data-role='collapsible' data-theme='e' data-content-theme='e' class='categoria'><h2>"+nomCat+"</h2>"+prodsCat+"</div>")
	}
	alert(categorias[1].getProductos()[1].getNombre());//alert ejemplo

}

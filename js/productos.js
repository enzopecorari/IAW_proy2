
function cargarProductos(){

	var categorias = []
	
	var xmlDoc = loadXMLDoc("xml/productos.xml");
	var prods = xmlDoc.getElementsByTagName("categoria");
	for(j = 0; j <prods.length; j++){ //Por cada categoria
		cat = new Caterogia(prods[j].childNodes[1].firstChild.nodeValue);
		
		for (l = 3; l < prods[j].childNodes.length; l = l + 2){
			var _nombre = prods[j].childNodes[l].childNodes[1].firstChild.nodeValue;
			var _precio = prods[j].childNodes[l].childNodes[3].firstChild.nodeValue;
			var _peso = prods[j].childNodes[l].childNodes[5].firstChild.nodeValue;
			var _imgS = prods[j].childNodes[l].childNodes[7].firstChild.nodeValue;
			var _imgL = prods[j].childNodes[l].childNodes[9].firstChild.nodeValue;
			produc = new Producto(_nombre,_precio,_peso,_imgS,_imgL);
			
			cat.addProducto(produc);
		}
		
		categorias[categorias.length] = cat;				
	}
	alert(categorias[1].getProductos()[1].getNombre());//alert ejemplo

}

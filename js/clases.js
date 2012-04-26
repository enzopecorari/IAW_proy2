/* Categoria */
function Categoria (_nombre){ 

    var nombre = _nombre;
    var productos = [];
    
    this.getNombre = function(){return  nombre}
    this.setNombre = function(_nombre){ nombre = _nombre} 
    this.addProducto = function(_producto){  productos[productos.length] = _producto } 
    this.getProductos = function(){ return productos} 
}

/* Producto */
function Producto (_nombre, _precio, _peso, _imgSmall,_imgLarge, _categoria){ 
    var nombre = _nombre;
    var precio = _precio;
    var peso = _peso;
    var imgSmall = _imgSmall;
    var imgLarge = _imgLarge;
    var categ = _categoria;
    var cantActual = 0;
    
    this.getNombre=function(){return  nombre;}
    this.setNombre = function(_nombre){ nombre = _nombre;} 
    this.getPrecio = function(){  return  precio; } 
    this.setPrecio = function(_precio){ precio = _precio;} 
    this.getPeso = function(){  return  peso; } 
    this.setPeso = function(_peso){ peso = _peso;} 
    this.setImgSmall = function(_imgSmall){ imgSmall = _imgSmall;} 
    this.getImgSmall = function(){return imgSmall;} 
    this.setImgLarge = function(_imgLarge){ imgLarge = _imgLarge;} 
    this.getImgLarge = function(){return imgLarge;} 
    this.getCategoria = function() { return categ; }
    this.getCantActual = function() { return cantActual; }
    this.setCantActual = function(_cant) { cantActual = _cant;}
}

/* Pedido: Singleton (solo hay un pedido en el sistema) */
var Pedido = {
	productos: [],
	promociones: [],
	precio: 0,
	addProducto: function(_prod) { productos[productos.length] = _prod },
	addPromocion: function(_promo) { promociones[promociones.length] = _promo }
	//removeProducto
	//removePromocion
	//clear
	
	
		
}

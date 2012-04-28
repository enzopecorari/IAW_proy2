/* Categoria */
function Categoria (_nombre){ 

    var nombre = _nombre;
    var productos = [];
    
    this.getNombre = function(){return  nombre}
    this.setNombre = function(_nombre){ nombre = _nombre} 
    this.addProducto = function(_producto){  productos[productos.length] = _producto } 
    this.getProducto = function(index){ return productos[index];} 
    this.getCantidad = function() { return productos.length; }
}

/* Producto */
function Producto (_nombre, _precio, _peso, _imgSmall,_imgLarge, _categoria){ 
    var nombre = _nombre;
    var precio = _precio;
    var peso = _peso;
    var imgSmall = _imgSmall;
    var imgLarge = _imgLarge;
    var categ = _categoria;

    
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

}

/* Pedido: Singleton (solo hay un pedido en el sistema) */
var Pedido = {
	data: {
		productos: [],
		productosCant: [],
		promociones: [], 
		productosCant: [],
		precioTotal: 0,
	},
	
	addProducto: function(_prod,_cant) { 
		var esta = false;
		var i;
		for (i=0; i<this.productos.length &&!esta;i++)  {
			esta = this.productos[i] == _prod;
		}
		if (esta) {
			--i;
			alert("ya est�. vieja cant: "+this.productosCant[i]);
			this.productosCant[i]+=_cant;
			alert("nueva cant: "+this.productosCant[i]);
		}
		else {
			this.productos[i] = _prod; this.productosCant[i] = _cant; 
		}
		return i;
	},
	addPromocion: function(_promo) { 
		var esta = false;
		for (i=0; i<this.promociones.length &&!esta;i++)  {
			esta = this.promociones[i] === _promo;
		}
		if (!esta) {
			this.promociones[this.promociones.length] = _promo;
		}
		else
			alert ("la promo ya est�, no se vuelve a agregar");
	}
	//removeProducto
	//removePromocion
	//clear
	
	
		
}

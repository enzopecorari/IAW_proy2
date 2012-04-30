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
function Producto (_nombre, _precio, _peso, _imgSmall,_imgLarge, _categoria, _id,_unidEncargue){ 
    var nombre = _nombre;
    var precio = _precio;
    var peso = _peso;
    var imgSmall = _imgSmall;
    var imgLarge = _imgLarge;
    var categ = _categoria;
    var id = _id;
    var unEncargue = _unidEncargue;
    
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
    this.setId = function(_id){ id = _id;} 
    this.getId = function(){return id;}
    this.setUnidEncargue = function(_un){ unEncargue = _un;} 
    this.getUnidEncargue = function(){return unEncargue;} 
    

}

/* Promocion */
function Promocion (_nombre, _descripcion, _descuento){ 
    var nombre = _nombre;
    var descripcion = _descripcion;
    var precioProm;
    var precioOrig =0;
    var descuento = _descuento;
    var peso=0;
    var productos = [];
    var cantProducto=[];
    
    this.getNombre=function(){return  nombre;}
    this.setNombre = function(_nombre){ nombre = _nombre;} 
    this.getDescripcion = function(){  return  descripcion; } 
    this.setDescripcion = function(_descripcion){ descripcion = _descripcion;} 
    this.getPrecioProm = function(){  return  precioProm; }  
    this.getPrecioOrig=function() { return precioOrig; }
    
    this.setDescuento = function(_descuento){ descuento = _descuento;} 
    this.getDescuento = function(){return descuento;} 
    this.addProducto = function(_producto,_cant){ 
    	productos[productos.length] = _producto;
    	cantProducto[cantProducto.length] = _cant;
    	precioOrig+=_producto.getPrecio()*_cant;
    	precioProm = Math.round(precioOrig*(100-descuento)/100);
    	peso+=_producto.getPeso()*_cant;
    }
    this.getProductos = function(){ return productos;} 
    this.getCantidadProducto = function(index) { return cantProducto[index]; }
    this.getCantidad = function() { return productos.length; }
    this.getPeso = function(){  return  peso; } 



}

/* Pedido: Singleton (solo hay un pedido en el sistema) */
var Pedido = {
	data: {
		productos: [],
		productosCant: [],
		promociones: [], 
		promocionesCant: [],
		pesoTotal: 0,
		precioTotal: 0
	},
	
	getProductos: function() { return this.data.productos;},
	getProductosCant: function() { return this.data.productosCant;},
	getPromociones: function() { return this.data.promociones;},
	getPromocionesCant: function() { return this.data.proocionesCant;},
	getPesoTotal: function() { return this.data.pesoTotal;},
	getPrecioTotal: function() { return this.data.precioTotal;},
	
	addProducto: function(_prod,_cant) { 
		var esta = false;
		var i;
		for (i=0; i<this.data.productos.length &&!esta;i++)  {
			esta = this.data.productos[i] == _prod;
		}
		if (esta) {
			--i;
			this.data.productosCant[i]+=_cant;
		}
		else {
			this.data.productos[i] = _prod;
			this.data.productosCant[i] = _cant; 
		}
		var numCat = Math.floor(Number(_prod)/100);
		var numProd = Number(_prod)%100;
		var prod = categorias[numCat].getProducto(numProd);
		this.data.pesoTotal += prod.getPeso() *_cant;
		this.data.precioTotal += prod.getPrecio() *_cant;

		return i;
	},
	addPromocion: function(_promo,_cant) { 
		var esta = false;
		for (i=0; i<this.data.promociones.length &&!esta;i++)  {
			esta = this.data.promociones[i] === _promo;
		}
		if (esta) {
			--i;
			this.data.promocionesCant[i]+=_cant;
		}
		else {
			this.data.promociones[i] = _promo;
			this.data.promocionesCant[i]=_cant;
		}
		this.data.pesoTotal += promociones[_promo].getPeso() *_cant;
		this.data.precioTotal += promociones[_promo].getPrecioProm() *_cant;

		return i;

	},
	removeProducto: function(index){
		var numCat = Math.floor(Number(this.data.productos[index])/100);
		var numProd = Number(this.data.productos[index])%100;
		var prod = categorias[numCat].getProducto(numProd);
		this.data.pesoTotal -= prod.getPeso() *this.data.productosCant[index];
		this.data.precioTotal -= prod.getPrecio() *this.data.productosCant[index];

		this.data.productos[index] = -1;
		this.data.productosCant[index] =-1;
		
	},
	cambiarCantProducto: function(index,cant) {
		var dif = cant - this.data.productosCant[index];
		var numCat = Math.floor(Number(this.data.productos[index])/100);
		var numProd = Number(this.data.productos[index])%100;
		var prod = categorias[numCat].getProducto(numProd);
		this.data.pesoTotal += prod.getPeso() *dif;
		this.data.precioTotal += prod.getPrecio() *dif;

		this.data.productosCant[index] =cant;
	},
	removePromocion: function(index){
		this.data.pesoTotal -= promociones[this.data.promociones[index]].getPeso() *this.data.promocionesCant[index];
		this.data.precioTotal -= promociones[this.data.promociones[index]].getPrecioProm() *this.data.promocionesCant[index];

		this.data.promociones[index] = -1;
		this.data.promocionesCant[index] =-1;
		
	},
	cambiarCantPromocion: function(index,cant) {
		var dif = cant - this.data.promocionesCant[index];
		this.data.pesoTotal += promociones[this.data.promociones[index]].getPeso() *dif;
		this.data.precioTotal += promociones[this.data.promociones[index]].getPrecioProm() *dif;
		this.data.promocionesCant[index] =cant;

	},
	clear: function() {
		this.data.productos = [];
		this.data.productosCant = [];
		this.data.promociones = [];
		this.data.promocionesCant = [];
		this.data.pesoTotal = 0;
		this.data.precioTotal = 0;
	}
	
	
		
}






function Caterogia (_nombre){ 

        var nombre = _nombre;
        var productos = [];
        
        this.getNombre = function(){return  nombre}
        this.setNombre = function(_nombre){ nombre = _nombre} 
        this.addProducto = function(_producto){  productos[productos.length] = _producto } 
        this.getProductos = function(){ return productos} 

}


function Producto (_nombre, _precio, _peso, _imgSmall,_imgLarge){ 
        var nombre = _nombre;
        var precio = _precio;
        var peso = _peso;
        var imgSmall = _imgSmall;
        var imgLarge = _imgLarge;
        
        this.getNombre=function(){return  nombre}
        this.setNombre = function(_nombre){ nombre = _nombre} 
        this.getPrecio = function(){  return  precio } 
        this.setPrecio = function(_precio){ precio = _precio} 
        this.getPeso = function(){  return  peso } 
        this.setPeso = function(_peso){ peso = _peso} 
        this.setImgSmall = function(_imgSmall){ imgSmall = _imgSmall} 
        this.getImgSmall = function(){return imgSmall} 
        this.setImgLarge = function(_imgLarge){ imgLarge = _imgLarge} 
        this.getImgLarge = function(){return imgLarge} 

}
/*
 * @param xmlFile, el nombre del archivo xml a cargar
 * @return devuelve un elemento con la estructura del archivo XML para recorrer utilizando la interfaz DOM
 **/
function loadXMLDoc(xmlFile){
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", xmlFile, false);
    xhttp.send();
    return xhttp.responseXML;
}

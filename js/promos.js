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

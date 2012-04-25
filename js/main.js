//function promos() {	

	var xmlDoc = loadXMLDoc("xml/promos.xml");
	var promos = xmlDoc.getElementsByTagName("promo");
	$("#promociones").html(promos[1]); //por q carajo sacaste jquery??? vi las importaciones en el index y creiq  andaba media hora probando giiiil
//}
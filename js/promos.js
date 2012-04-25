function cargarPromos(numPromo){
	var xmlDoc = loadXMLDoc("xml/promos.xml");
	var promos = xmlDoc.getElementsByTagName("promo");
	if (numPromo<promos.length){
		$("#tittleProm").text(promos[numPromo].children[0].firstChild.nodeValue);
		$("#descProm").text(promos[numPromo].children[1].firstChild.nodeValue);
		$("#precioProm").text(promos[numPromo].children[2].firstChild.nodeValue);
		$("#imgProm").html("");
		for(j = 0; j <promos[numPromo].children[4].children.length;j++)
			$("#imgProm").append("<img src='img/"+promos[numPromo].children[4].children[j].firstChild.nodeValue+"' alt='imagen promo'/>");
	}

}

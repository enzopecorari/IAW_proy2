$(document).ready(function() { 

	cargarPromos();
	$('#nextPromo').click(function() {
		cargarPromos();
	})
	cargarProductos();
	
	$('#loading').hide();
    $('#imgLoading').hide();
})

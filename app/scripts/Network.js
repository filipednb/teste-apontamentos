var Network = {
	//Alimenta o locar storage com dados ficticios
	init: function(){
		$.getJSON( 'data/apontamentos.json', function( data ) {
			if (typeof(Storage) !== 'undefined') {
			  localStorage.setItem('DadosApontamentos', data);
			} else {
			  alert('Storage nao definido');
			}		
		});
	}
}
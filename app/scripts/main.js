//Callback disparado quando a página está carregada
$(document).ready(function(){
	App.init();

	$('[data-toggle="offcanvas"]').click(function(){
		$("#navigation").toggleClass("hidden-xs");
	});

});


var App = {
	//Adiciona os 
  init: function() { 
		$("#app-main-content").load("views/login.html");

		//definindo ações dos botões do menu
		$("#menu-apontamentos").click(function() {
			$("#app-main-content").load("views/manutencao-de-apontamentos.html");			
		});
  }

}

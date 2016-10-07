//Callback disparado quando a página está carregada
$(document).ready(function(){
	Main.init();
	$('[data-toggle="offcanvas"]').click(function(){
       $("#navigation").toggleClass("hidden-xs");
   });
});


var Main = {
	init: function() { 
		//definindo ações dos botões do menu
		$('#app-main-content').load('views/apontamentos.html',function(){
			Apontamentos.init();
		});	
		$('#menu-apontamentos').click(function() {
			$('#app-main-content').load('views/apontamentos.html',function(){
				Apontamentos.init();
			});			
		});
		$('#menu-charts').click(function() {
			$('#app-main-content').load('views/graficos.html',function(){
				Graficos.init();
			});			
		});
		
		//Já alimenta o WebStorage com os dados...
		//Network.init();
	}
}

Number.prototype.toTime = function(){
  var hrs = Math.floor(this)
  var min = Math.round(this%1*60)
  min = min<10 ? "0"+min : min.toString();
  return hrs+":"+min;
}




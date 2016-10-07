
var Graficos = {
	init: function(){
		createChart(7);
		initChartButtons();
	}
}
//Função que define o onclick dos botoes
var initChartButtons = function () {
	$('#btn-init-chart-week').click(function(){
		createChart(7);
	});
	$('#btn-init-chart-twoweek').click(function(){
		createChart(14);
	});
	$('#btn-init-chart-month').click(function(){
		createChart(30);
	});
	$('#btn-init-chart-sixmonth').click(function(){
		createChart(180);
	});
	$('#btn-init-chart-yearly').click(function(){
		createChart(365);
	});
}

var currentChartData = '';

//define os dados dos gráficos de acordo com aquantidade de dias.
var setChartData = function(days) {
	var storedData = JSON.parse(localStorage.getItem('DadosApontamentos'));
	var arrLabels = [];
	var arrWorkedHours = [];
	
	//definindo media mensal
	var arrMonths = [];
	var mediaMensal = 0;
	var monthCount = 1;
	for(var key in storedData) {
		monthCount++;
		arrLabels.push(key);
		var workedHours = getWorkedHours(storedData[key].HE_1,storedData[key].HS_1,storedData[key].HE_2,storedData[key].HS_2);
		mediaMensal += workedHours;
		if(monthCount==30) {
			arrMonths.push((mediaMensal/30));
			monthCount = 0;
			mediaMensal = 0;
		}//
		arrWorkedHours.push(workedHours);
		if (key == (days))
			break;		
		
	}
	
	var arrLineData = [];
	if(days >=180) {
		var count = 0
		for (var key in arrWorkedHours) {
			if(key == 30) {
				count++	
			}
			arrLineData.push(arrMonths[count]);
		}
	}



	currentChartData = {
    	labels: arrLabels,
    	datasets: [{
      		label: 'Horas Trabalhadas',
      		backgroundColor: 'rgba(0,30,255,0.5)',
      		data: arrWorkedHours
    	}]
	};
	if(arrLineData.length > 0) {
		currentChartData.datasets.push({
    		label: 'Media comparativa mensal',
    		type: 'line',
    		backgroundColor: 'rgba(255,0,0,0.5)',
    		data:arrLineData
    	});
	}
}


var createChart = function(days) {
  setChartData(days);
  //Limpando o grafico
  if(window.workedTimeChart)
  		window.workedTimeChart.destroy();
  var ctx = document.getElementById('canvas').getContext('2d');
  window.workedTimeChart = new Chart(ctx, {
      type: 'bar',
      data: currentChartData,
      options: {
          elements: {
              rectangle: {
                  borderWidth: 2,
                  borderColor: 'rgb(0, 50, 255)',
                  borderSkipped: 'bottom'
              }
          },
          responsive: true,
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Gráfico de horas trabalhadas em ' + days + ' dias.'
          }
      }
  });

  window.workedTimeChart.update();   
};
//utilidade sobrescrevendo prototype





var Apontamentos = {
	//Inicializa os apontamentos
	init: function(){
		feedLocalStorage();
	}
};

//Pega json por ajax e armazena no localStorage
var feedLocalStorage = function () {
	$.getJSON( 'apontamentos.json', function( data ) {
		if (typeof(Storage) !== 'undefined') {
		  var dataString = JSON.stringify(data)
		  if(localStorage.getItem('DadosApontamentos')=='') {}
		  		localStorage.setItem('DadosApontamentos', dataString);
		  		drawTableTRs();
			}
		else {
		  alert('Storage nao definido');
		}		
	});
}

//Remove linha da tabela
var removeRowTable = function(that) {
	if(that) {
		var domTr = $(that).closest( 'tr' );
		var idTr = domTr.attr('id').replace('tr','');
		removeRowData(idTr);
		domTr.remove();
		//redesenha tabela
		drawTableTRs();
	}
}

//INsere dados no armazenamento
var insertRowData = function() { 
	//Pega os dados e serializa
	var storedData =  JSON.parse(localStorage.getItem('DadosApontamentos'));
	var arrayForm = $('#form-add-row').serializeArray(); //pega os dados do form e poe no array
	//define os dados a serem inseridos no storage
	var dataRow = {
					'HE_1': arrayForm[0].value,
					'HS_1': arrayForm[1].value,
					'HE_2': arrayForm[2].value,
					'HS_2': arrayForm[3].value
				}
	storedData.push( dataRow  );
	//insere de volta no storage
	var dataString = JSON.stringify(storedData)
	localStorage.setItem('DadosApontamentos', dataString);
	//redesenha tabela;
	drawTableTRs();
}

//Remove dos dados armazenados
var removeRowData = function (index) {
	var storedData =  JSON.parse(localStorage.getItem('DadosApontamentos'));
	storedData.splice(index,1);

	var dataString = JSON.stringify(storedData)
	localStorage.setItem('DadosApontamentos', dataString);
}
//retorna a diferença entre horarios time2-time1 + time4-time3
var getWorkedHours = function(time1,time2,time3,time4) {
	//diferenca entre entrada e saida antes do almoco
	var date1 = new Date('2000-01-01T'+time1+':00');
	var date2 = new Date('2000-01-01T'+time2+':00');
	var ht1 = Date.dateDiff('s',date1,date2);
	//diferenca entre entrada e saida após do almoco
	var date3 = new Date('2000-01-01T'+time3+':00');
	var date4 = new Date('2000-01-01T'+time4+':00');
	var ht2 = Date.dateDiff('s',date3,date4);		
	//soma os segundos do primeiro periodo com o segundo
	var htt = (((ht1 + ht2)/60)/60);//transforma em minuto/horas
	
	return htt;
}
//Adiciona uma linha na tabela 
var drawTableTRs = function() {
	var localData =  JSON.parse(localStorage.getItem('DadosApontamentos'));
	var lenData = localData.length;
	var totalHours=0
	//limpando a tabela  antes de inserir as linhas
	$('#table-apontamentos tbody').html('');
	for (var key in localData){
		//Fazendo a conta do total de tempo trabalhado
		var htt = getWorkedHours(localData[key].HE_1,localData[key].HS_1,localData[key].HE_2,localData[key].HS_2);
		totalHours += htt;

		$('#table-apontamentos tbody')
			.append(  
			  '<tr id="tr'+ key +'">'+
    			'<td><input type="checkbox" class="checkthis" /></td>' +
    			'<td>'+ localData[key].HE_1 +'</td>' +
    			'<td>'+ localData[key].HS_1 +'</td>' +
    			'<td>'+ localData[key].HE_2 +'</td>' +
    			'<td>'+ localData[key].HS_2 +'</td>' +
    			'<td class="worked-time">'+ htt.toTime() +'</td>'+
    			'<td>' +
      				'<p data-placement="top" data-toggle="tooltip" title="Editar">' +
        				'<button class="btn btn-primary btn-xs edit-row" data-title="Editar" data-toggle="modal" data-target="#edit_row" >' +
          					'<span class="glyphicon glyphicon-pencil"></span>' +
        				'</button>' +
      				'</p>' +
    			'</td>' +
    			'<td>' +
	              '<p data-placement="top" data-toggle="tooltip" title="Excluir">' +
	                '<button class="btn btn-danger btn-xs delete-row" data-title="Excluir" data-toggle="modal" data-target="#delete" >' +
	                  '<span class="glyphicon glyphicon-trash"></span>' +
	                '</button>' +
	              '</p>' +
	            '</td>' +
	          '</tr>'
	        );

	};
	$('.delete-row').click(function(){
		removeRowTable(this);
	});
	$('.edit-row').click(function(){
		openModalEditRow(this);
	});
	$('#btn-edit-row').click(function(){
		editRowData(this);
	})

	$('#total-hours').html(totalHours.toTime());
};
//Edita os dados do storage
var editRowData = function (that){
	var storedData =  JSON.parse(localStorage.getItem('DadosApontamentos'));
	var arrayForm = $('#form-edit-row').serializeArray(); //pega os dados do form e poe no array

	var dataRow = {
					'HE_1': arrayForm[1].value,
					'HS_1': arrayForm[2].value,
					'HE_2': arrayForm[3].value,
					'HS_2': arrayForm[4].value
				}
	storedData[arrayForm[0].value] = dataRow;
	
	var dataString = JSON.stringify(storedData)
	localStorage.setItem('DadosApontamentos', dataString);

	drawTableTRs();
}

var openModalEditRow = function(that) { 
	$('#edit-trId').attr('value', '0');
	$('#edit-he1').attr('value', '00:00');
	$('#edit-hs1').attr('value', '00:00');
	$('#edit-he2').attr('value', '00:00');
	$('#edit-hs2').attr('value', '00:00');
	var domTr = $(that).closest( 'tr' );
	var idTr = domTr.attr('id').replace('tr','');
	var arrTds = $(domTr).find('td');
	$('#edit-trId').attr('value', idTr);
	$('#edit-he1').attr('value', $(arrTds[1]).html());
	$('#edit-hs1').attr('value', $(arrTds[2]).html());
	$('#edit-he2').attr('value', $(arrTds[3]).html());
	$('#edit-hs2').attr('value', $(arrTds[4]).html());
}

//Utilidade diferença entre datas
Date.dateDiff = function(datepart, fromdate, todate) {	
  datepart = datepart.toLowerCase();	
  var diff = todate - fromdate;	
  var divideBy = { w:604800000, 
                   d:86400000, 
                   h:3600000, 
                   n:60000, 
                   s:1000 };	
  
  return Math.floor( diff/divideBy[datepart]);
}

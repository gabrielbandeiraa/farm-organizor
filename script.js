// JavaScript Document

var fazendas = [] //Farm Array

function addfazenda(nome, area, estado) {      //Function for adding Farm (name, area, estate)
		var fazenda = new Fazenda(fazendas.length + 1, nome, area, estado)
		fazendas.push(fazenda)
}

function Fazenda(idfazenda, nome, area, estado) { // Farm Object (Farm ID , Name, area, estado)
	this.idfazenda = idfazenda
	this.nome = nome
	this.area = area
	this.estado = estado
	this.compras = []
  this.lotesatuais = []
	this.vendas = []

	this.compralote = function(diadacompra, raca, arrobas, meses, qtdanimais, precototal) {
		var lote = new Lote(this.compras.length + 1, diadacompra, raca, arrobas, meses, qtdanimais, precototal)
		this.compras.push(lote)
		this.lotesatuais.push(lote)
	}


}

function Lote(idlote, diadacompra, raca, arrobas, meses, qtdanimais, precototal) {
  this.idlote = idlote
  this.diadacompra = diadacompra
  this.raca = raca
  this.arrobas = arrobas
	this.qtdanimais = qtdanimais
  this.totaldearrobas = this.arrobas * this.qtdanimais
  this.meses = meses
  this.precototal = precototal

	this.addboi = function(qtdnovosbois) {
    this.qtdanimais += qtdnovosbois
  }
  this.removeboi = function(qtdretirarboi) {
    this.qtdanimais -= qtdretirarboi
  }
}



// DOM part

$(window).on("load", function(){
	console.log("ok");;
//parte da fazenda
var $addfarmForm = $("#addfarm-form")

var $fazendas = $("#fazendas")

var fazendasSource = $("#fazendas-template").html()

var fazendasTemplate = Handlebars.compile(fazendasSource)

$addfarmForm.on("submit", function(){

	console.log("right");
	event.preventDefault()

	// how to only execute search if user has typed something in input field in this case with multiple imputs?

	 if ($("#nome-farm").val() && $("#area-farm").val() && $("#estado-farm").val()) {

	 // how to use an array as argument to a constructor in order to my code be more clean?

 addfazenda($("#nome-farm").val() , $("#area-farm").val() , $("#estado-farm").val())
 var length = fazendas.length - 1
 var chooseFarm = fazendas[length]
 appendfazendaResult(chooseFarm)
 displayFarm(chooseFarm)

 } else {
	 alert("no")
 }


		 //whats the best way to append this object inside the "compra" e "gado atual" using handlebars?

		 function appendfazendaResult(result){
			var resultElement = fazendasTemplate(result);
			$fazendas.append(resultElement);
		}
	})

// parte dos lotes
	var $addloteForm = $("#addlote-form")

	var $compras = $("#compras")
	var $atual = $("#gado-atual")
	var $vendas = $("#vendas")

	var comprasSource = $("#compras-template").html()
	var atualSource = $("#atual-template").html()
	var vendasSource = $("#vendas-template").html()

	var comprasTemplate = Handlebars.compile(comprasSource)
	var atualTemplate = Handlebars.compile(atualSource)
	var vendasTemplate = Handlebars.compile(vendasSource)

	var chooseFarm;

	$(document).on("click", ".display-more", function(){

		 var fazendaId = $(this).attr("data-fazenda-id") - 1
		 		 chooseFarm = fazendas[fazendaId]
		 console.log(chooseFarm);
		 displayFarm(chooseFarm)

		// whatever button i clicked, i want that fazenda's info
		// data attributes in the HTML + $(this) syntax
		// $(this).getAttribute("data-fazenda-id")
		// take that info and display in element

	})


	 function displayFarm(chooseFarm) {
		$("#choosed-farm").html(`fazenda: ${chooseFarm.nome}`)

		$("#compras").html(``)
	  $("#gado-atual").html(``)
	  $("#vendas").html(``)


	chooseFarm.compras.forEach((item, i) => {
		appendcompraResult(item)
		appendatualResult(item)
	});


}
$addloteForm.on("submit", function(event){
	 console.log("right");
	 event.preventDefault()

	 // how to only execute search if user has typed something in input field in this case with multiple imputs?

		if ($("#datecompra").val() && $("#lote-raca").val() && $("#lote-arrobas").val() && $("#lote-mesesnacompra").val() && $("#lote-quantidade").val() && $("#lote-valor").val()) {

		// how to use an array as argument to a constructor in order to my code be more clean?

	chooseFarm.compralote($("#datecompra").val(), $("#lote-raca").val(), $("#lote-arrobas").val(), $("#lote-mesesnacompra").val(), $("#lote-quantidade").val(), $("#lote-valor").val())
	var length = chooseFarm.compras.length - 1
	var result = chooseFarm.compras[length]
	console.log(chooseFarm);

	appendcompraResult(result)
	appendatualResult(result)

	} else {
		alert("no")
	}


			//whats the best way to append this object inside the "compra" e "gado atual" using handlebars?

})

function appendcompraResult(result){
 var resultElement = comprasTemplate(result);
 $compras.append(resultElement);
}

function appendatualResult(result){
var resultElement = atualTemplate(result);
$atual.append(resultElement);


}

})

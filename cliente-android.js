var http = require('http');

var configuracoes = {
	hotstname : 'localhost',
	port: 3000,
	path: '/produtos',
	method: 'post',
	headers: {
		'Accept':'application/json', //content negotiation para respostas - get
		'Content-type': 'application/json' //content negotiation para envio - post
	} 
};
/*
http.get(configuracoes, function(res){
	console.log(res.statusCode);
	res.on('data', function(body){
		console.log('Corpo: '+body);
	});
});
*/

var client = http.request(configuracoes, function(res){
	console.log(res.statusCode);
	res.on('data', function(body){
		console.log('Corpo: '+body);
	});
});

var produto = {
	titulo : 'validacao cliente json',
	descricao : '12312sdas bla',
	preco: 1122.233
}

client.end(JSON.stringify(produto));
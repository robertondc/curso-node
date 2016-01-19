var express = require('../config/express')();
var request = require('supertest')(express);


describe('#ProdutosController', function(){

	beforeEach(function(done){
		var conn = express.infra.connectionFactory(); 
		conn.query('delete from produtos;', function(err,res){
			if (!err){
				done();
			}
		});
	});

	it ('#listagem json', function(done){
		request.get('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-Type',/json/)
		.expect(200,done);
	});

	it ('#listagem html', function(done){
		request.get('/produtos')
		.set('Accept', 'text/html')
		.expect('Content-Type',/html/)
		.expect(200,done);
	});

	it('#cadastro de produtos HTML com dados invalidos', function(done){
		request.post('/produtos')
		.set('Accept', 'text/html')
		.send({titulo: "", descricao: "supertest das"})
		.expect(400, done);
	})

	it('#cadastro de produtos HTML com dados validos', function(done){
		request.post('/produtos')
		.set('Accept', 'text/html')
		.send({titulo: "supertest titulo asd", descricao: "supertest descdasd", preco: 10.50})
		.expect(302, done);
	})

	it('#cadastro de produtos JSON com dados invalidos', function(done){
		request.post('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-Type',/json/)
		.send({titulo: "", descricao: "supertest das"})
		.expect(400, done);
	})

	it('#cadastro de produtos JSON com dados validos', function(done){
		request.post('/produtos')
		.set('Accept', 'application/json')
		.send({titulo: "supertest titulo asd", descricao: "supertest descdasd", preco: 10.50})
		.expect(302, done);
	})

});
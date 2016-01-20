module.exports = function(app){
	app.get("/", function(req,res){

		var connection = app.infra.connectionFactory(); 
	    var produtosDao = new app.infra.ProdutosDAO(connection);
	      
	    produtosDao.lista(function(err,results){
	        if (err){
	          next(err);
	        }
	        res.render('home/index', {livros: results});
	     });

		connection.end();
	});
}
module.exports = function(app){
	app.get("/promocoes/form", function(req,res,next){
	  var connection = app.infra.connectionFactory(); 
      var produtosDao = new app.infra.ProdutosDAO(connection);
      
      produtosDao.lista(function(err,results){
        if (err){
          next(err);
        }
        res.render('promocoes/form',{lista: results});
      });

      connection.end();
	});


	app.post("/promocoes", function(req,res,next){
		var produto = req.body;
		console.log(produto);

		app.get('io').emit('novaPromocao',produto);

		res.redirect('/promocoes/form');
	});
}
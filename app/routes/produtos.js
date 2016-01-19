module.exports = function(app){
    app.get('/produtos', function (req,res,next){
      
      var connection = app.infra.connectionFactory(); 
      var produtosDao = new app.infra.ProdutosDAO(connection);
      
      produtosDao.lista(function(err,results){
        if (err){
          next(err);
        }
        res.format({
          html : function(){
            res.render('produtos/lista',{lista: results});
          },
          json : function(){
            res.json(results);
          }
        });
      });

      connection.end();
	});

  app.get('/produtos/form', function(req,res){
    res.render('produtos/form', {errosValidacao:[], produto: {}});
  });

  app.post('/produtos/', function(req,res,next){
    var produto = req.body;
    
    req.assert('titulo','Título é obrigatório').notEmpty();
    req.assert('preco','Formato preço inválido').isFloat();

    var errors = req.validationErrors();

    if (errors){

       res.format({
          html : function(){
            res.status(400).render('produtos/form', {errosValidacao : errors, produto: produto});
          },
          json : function(){
            res.status(400).json(errors);
          }
        });
      return;
    }

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.salva(produto, function(err, results){
      if (err){
        next(err);
      }
      res.redirect('/produtos');
    });

  });
}

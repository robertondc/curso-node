var mysql = require('mysql');

function createDbConnection(){ 
 
	if (!process.env.NODE_ENV){
		return connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'nodejs'
		});
	}

	if (process.env.NODE_ENV = 'test'){
		return connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'nodejs_test'
		});
	}

}

module.exports = function(){
	return createDbConnection;
}
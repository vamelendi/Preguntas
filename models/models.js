var path = require('path');
//Configurar bases de datos postgres y sqlite
//formato de urls
// Postgres: postgres://user:passwd@host:port/database
//SQLite: sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd	    = (url[3]||null);
var protocol= (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o postgres
var sequelize = new Sequelize(DB_name, user, pwd,
     {dialect:  dialect,
      protocol: protocol,
      port:     port,
      host:     host,
      storage:  storage,  //solo sqlite
      omitNull: true   //solo postgress
    });

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; //exportar la definicion de la tabla Quiz

//sequelize.sync() crea e inicializa la tabla de preguntas de la BBDD
sequelize.sync().then(function(){
	 //then(....)ejecuta el manejador una vez creada la tabla
	 Quiz.count().then(function(count){
		 if(count === 0){ //la tabla se incializa solo si está vacía
			 Quiz.create({pregunta: 'Capital de Italia',
						  respuesta:'Roma'
						});
			 Quiz.create({pregunta:  'Capital de Portugal',
						  respuesta: 'Lisboa'				
						})
			.then(function(){console.log('Base de datos inicializada')});
		 };
	 });
});


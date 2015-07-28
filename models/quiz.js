//Definicion del modelo de la base de datos Quiz

module.exports = function(sequelize, DataTypes)
			{
       			   return sequelize.define('Quiz',{pregunta:DataTypes.STRING,
					respuesta:DataTypes.STRING,
					});
			}

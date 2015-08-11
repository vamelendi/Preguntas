//Definicion del modelo de la base de datos Quiz
// Deficion del modelo de  la tabla Quiz
module.exports = function(sequelize, DataTypes)
			{
       			   return sequelize.define('Quiz',
				   {pregunta:{
					       type:DataTypes.STRING,
					       validate:{notEmpty:{msg:"Oops falta la pregunta!"}}
				   	     },
				    respuesta:{
						type:DataTypes.STRING,
						validate:{notEmpty:{msg:"Vaaaaya! se te olvidó la respuesta"}}
					      },
				    tema:{
						type:DataTypes.STRING,
						validate:{notEmpty:{msg:"uuuups! te falta el tema dela pregunta"}}
					 }	
				   }
			   );
			}

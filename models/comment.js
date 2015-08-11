//Definicion del modelo de la base de datos Quiz
// Definicion del modelo de la tabla Comment
module.exports = function(sequelize,DataTypes){
	return sequelize.define("Comment",
				{texto: {
				 type:DataTypes.STRING,
				 validate: {notEmpty:{msg:"vaya! te has olvidado comentarlo"}}
				  }
				}
			       );

}

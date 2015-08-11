var models = require('../models/models.js');

//GET /quizes/:quizId/commnents/new

exports.new = function(req,res){

	res.render('comments/new', {quizid: req.params.quizId, errors:[]});
};

//POST /quizes/:quizIde/comments

exports.create = function(req, res){
	var comment = models.Comment.build(
		{
		  texto:req.body.comment.texto,
		  QuizId:req.params.quizId
		}
	    );
	comment.validate().then(
				   function (err){
						    if(err){
							     res.render('comments/new', {comment: comment, quizid:req.params.quizId, errors:err.errors});
							   } else{ //se guarda el comentario en la tabla comment de la DB
								   comment.save().then(function(){res.redirect('/quizes/'+req.params.quizId)})				// res.redirect redirecciona de nuevo a la lista de preguntas
								 }
						  }
				). catch(function(error){next(error)});
};

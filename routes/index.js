var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller.js");// controlador de preguntas
var commentController = require("../controllers/comment_controller.js"); // controlador comentarios
var sessionController = require("../controllers/session_controller.js"); //controlador de sesiones

/* GET home page.(Pagina de inicio, home page) */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

/*GET pagina autor*/
router.get('/author', function(req,res){
	res.render('author', {title: 'Preguntas', errors:[]});
});
// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

//Definicion de rutas de sesion
router.get('/login', sessionController.new); //formulario login
router.post('/login', sessionController.create); //crear sesion;
router.get('/logout', sessionController.destroy); //destruir la sesion

/*GET controladores pregunta y respuesta. Definicion de rutas de quizes*/ 
router.get('/quizes',                quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                sessionController.loginRequired, quizController.new);
router.post('/quizes/create',            sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)' ,     sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',   sessionController.loginRequired, quizController.destroy);

//Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);//accede al formulario de crear comentario, asociado al quiz :id.
router.post('/quizes/:quizId(\\d+)/comments', commentController.create); //crea una entrada en la tabla comments, asociada a :quizId en Quiz

module.exports = router;

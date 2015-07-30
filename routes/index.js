var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller.js");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/*GET pagina autor*/
router.get('/author', function(req,res){
	res.render('author', {title: 'Preguntas'});
});
// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

/*GET controladores pregunta y respuesta. Definicion de rutas de quizes*/ 
router.get('/quizes',                quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


module.exports = router;

var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller.js");
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

/*GET controladores pregunta y respuesta. Definicion de rutas de quizes*/ 
router.get('/quizes',                quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',              quizController.new);
router.post('/quizes/create',          quizController.create);

module.exports = router;

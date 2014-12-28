var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));

var fortunes = [
	"Conquer your fears or they will conquer you.", 
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.", 
	"Whenever possible, keep it simple.",
];

app.get('/', function(req, res) {
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('home', {fortune:randomFortune});
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express Started on http://localhost:' + app.get('port'));
});


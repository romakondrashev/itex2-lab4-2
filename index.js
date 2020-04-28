var express = require("express"); // отдельная переменная для удобства
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); // указание каталога для статических ресурсов, в котором будет расположен подключаемый файл css.


// Request - Запрос
// Response - Ответ
app.get('/', function(request, response) {
  	response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('send message', function(data) {
		io.emit('receive message', {name: data.name, message: data.message, color: data.color});
  	});
});

// отслеживаем и вводим порт - 3000
http.listen(3000, function() {
	// Вывод в консоль
 	 console.log('listening on *:3000');
});
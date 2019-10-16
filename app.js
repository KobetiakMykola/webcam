let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let opencv4nodejs = require('opencv4nodejs');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
const FPS = 30;
let wCap = new opencv4nodejs.VideoCapture(0);

wCap.set(opencv4nodejs.CAP_PROP_FRAME_HEIGHT, 300);
wCap.set(opencv4nodejs.CAP_PROP_FRAME_WIDTH, 300);

setInterval( ()=>{
    const freame = wCap.read();
    const image = opencv4nodejs.imencode('.jpg', freame).toString('base64');
    io.emit('image', image)
}, 1000 / FPS)

http.listen(3000, function(){
    console.log('listening on *:3000');
});
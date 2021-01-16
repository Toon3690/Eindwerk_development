const server = require('./server.js');

server.listen(3100)
server.get('/', (req, res) => {
    res.send('hello world');
})
console.log('listerning at 3000');

exports.init = (io) => {
 
    const nsp = io.of('/chat');
nsp.on('connection', function(socket){
    console.log('someone connected');
    socket.on('selectRoom', (room) => socket.join(room))
});
}
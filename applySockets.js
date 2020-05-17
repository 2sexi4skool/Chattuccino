exports.init = (io) => {
 
    const nsp = io.of('/chat');
    nsp.on('connection', function (socket) {
    
        socket.on('hb', (data) => {
            console.log('heartbeat', data)
            socket.emit('hb')
        })

    console.log('someone connected');
        socket.on('selectRoom', (room) => {
            console.log('someone joined room', room)
            socket.join(room)
    })

        socket.on('chatMessage', (data) => {
        const {room} = data
        nsp.to(room).emit('chatMessage', data)
    })
});
}
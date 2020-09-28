const { io } = require('../index');

//Sockets Messages
io.on( 'connection', client => {
    console.log( 'Cliente conectado' );

    client.on('disconnect', () => { 

        console.log( 'Cliente desconectado' );
    });

    client.on('mensaje', ( payLoad ) =>{
        console.log( 'Mensaje', payLoad);
        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } )
    });
});
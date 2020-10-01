const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Metallica' ) );


//Sockets Messages
io.on( 'connection', client => {
    console.log( 'Cliente conectado' );

    client.emit( 'active-bands', bands.getBands() );

    client.on('disconnect', () => { 
        console.log( 'Cliente desconectado' );
    });

    client.on('vote-band', ( payLoad ) =>{
        bands.voteBand( payLoad.id );
        io.emit( 'active-bands', bands.getBands() );
    });

    client.on('emitir-mensaje', ( payLoad ) =>{
        //console.log( 'Mensaje a enviar', payLoad);
        //io.emit( 'nuevo-mensaje', payLoad);
        client.broadcast.emit( 'nuevo-mensaje', payLoad);
    });
});
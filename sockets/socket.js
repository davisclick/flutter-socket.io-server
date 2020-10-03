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

    client.on('add-band', ( payLoad ) =>{
      const newBand = new Band( payLoad.name );
      bands.addBand( newBand ); 
      io.emit( 'active-bands', bands.getBands() );
    });

    client.on('delete-band', ( payLoad ) =>{
        io.emit( 'active-bands', bands.deleteBand( payLoad.id) ) ;
    });
});
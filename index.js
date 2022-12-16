const express = require( 'express' );
const bodyParser = require( 'body-parser' );
require( 'dotenv' ).config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const todoRoute = require( './src/routes/todos' );

app.use( bodyParser.json() );
app.use(
	bodyParser.urlencoded( {
		extended: true,
	} )
);

app.get( '/', ( req, res ) => {
	res.json( { 'message': 'ok' } );
} );

app.use( '/todo', todoRoute );

/* Error handler middleware */
app.use( ( err, req, res ) => {
	const statusCode = err.statusCode || 500;
	console.error( err.message, err.stack );
	res.status( statusCode ).json( { 'message': err.message } );
  
	return;
} );

app.listen( port , host, () => {
	console.log( `Example app listening at http://localhost:${port}` );
} );
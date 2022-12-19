const auth = require( '../models/auth.model' );

async function login( req, res, next ) {
	try {
		res.json( await auth.login( req.body.email, req.body.password ) );
	} catch ( err ) {
		console.error( 'Error while login user', err.message );
		next( err );
	}
}

async function register( req, res, next ) {
	try {
		res.json( await auth.register( req.body ) );
	} catch ( err ) {
		console.error( 'Error while creating user', err.message );
		next( err );
	}
}

async function update( req, res, next ) {
	try {
		res.json( await auth.update( req.params.id, req.body ) );
	} catch ( err ) {
		console.error( 'Error while updating user', err.message );
		next( err );
	}
}


module.exports = {
	login,
	register,
	update,
};
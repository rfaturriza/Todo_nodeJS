const jwt = require( 'jsonwebtoken' );

const config = process.env;

const verifyToken = ( req, res, next ) => {
	let token = req.get( 'authorization' );
	token = token.slice( 7 );
	console.log( token );

	if ( !token ) {
		return res.status( 403 ).json( {
			success: false,
			message: 'Access Denied! Unauthorized User'
		} );
	}
	try {
		const decoded = jwt.verify( token, config.JWT_SECRET );
		req.user = decoded;
	} catch ( err ) {
		console.log( err );
		return res.status( 401 ).json( {
			success: false,
			message: 'Invalid Token! Unauthorized'
		} );
	}
	return next();
};

module.exports = verifyToken;

const todo = require( '../models/todos' );

async function get( req, res, next ) {
	try {
		res.json( await todo.getMultiple( req.query.page ) );
	} catch ( err ) {
		console.error( 'Error while getting todos', err.message );
		next( err );
	}
}

async function create( req, res, next ) {
	try {
		res.json( await todo.create( req.body ) );
	} catch ( err ) {
		console.error( 'Error while creating todos', err.message );
		next( err );
	}
}

async function update( req, res, next ) {
	try {
		res.json( await todo.update( req.params.id, req.body ) );
	} catch ( err ) {
		console.error( 'Error while updating todos', err.message );
		next( err );
	}
}

async function remove( req, res, next ) {
	try {
		res.json( await todo.remove( req.params.id ) );
	} catch ( err ) {
		console.error( 'Error while deleting todos', err.message );
		next( err );
	}
}

module.exports = {
	get,
	create,
	update,
	remove
};
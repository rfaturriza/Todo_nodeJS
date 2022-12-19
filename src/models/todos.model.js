const db = require( '../services/db.service' );
const helper = require( '../utils/helper' );
const config = require( '../configs/general.config' );

async function getMultiple( page = 1 ){
	const offset = helper.getOffset( page, config.listPerPage );
	const rows = await db.query(
		'SELECT * FROM todos ORDER BY created_at DESC LIMIT ?,?',
		[ offset, config.listPerPage ]
	);
	const data = helper.emptyOrRows( rows );
	const resultTotal = await db.query( 'SELECT COUNT(*) AS total FROM todos' );
	const total = resultTotal[ 0 ].total;
	const meta = { 
		current_page: parseInt( page ), 
		total_data: total, 
		per_page: config.listPerPage, 
	};

	return {
		data,
		meta
	};
}

async function create( todo ){
	const datetimeNow = new Date().toISOString().slice( 0, 19 ).replace( 'T', ' ' );
	const result = await db.query(
		`INSERT todos 
        (title, created_at)
        VALUES (?,?)`,
		[
			todo.title, datetimeNow,
		]
	);

	let message = 'Error in creating todos';
	let data = null;

	if ( result.affectedRows ) {
		message = 'todo created successfully';
		data = { id: result.insertId, ...todo };
	}

	return { message, data };
}

async function update( id, todo ){
	const datetimeNow = new Date().toISOString().slice( 0, 19 ).replace( 'T', ' ' );
	const result = await db.query(
		`UPDATE todos 
        SET title=?, updated_at=?
        WHERE id=?`, 
		[
			todo.title, datetimeNow, id
		]
	);

	let message = 'Error in updating todo';
	let data = null;

	if ( result.affectedRows ) {
		message = 'todo updated successfully';
		data = { id, ...todo };
	}

	return { message, data };
}

async function remove( id ){
	const result = await db.query(
		'DELETE FROM todos WHERE id=?', 
		[ id ]
	);

	let message = 'Error in deleting todo';

	if ( result.affectedRows ) {
		message = 'todo deleted successfully';
	}
	let data = { id };
	return { message, data };
}

module.exports = {
	getMultiple,
	create,
	update,
	remove
};
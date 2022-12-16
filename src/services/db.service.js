const mysql = require( 'mysql2/promise' );
const dbConfig = require( '../configs/dbconfig' );

async function query( sql, params ) {
	const connection = await mysql.createConnection( dbConfig );
	const [ results, ] = await connection.execute( sql, params );

	return results;
}

module.exports = {
	query
};
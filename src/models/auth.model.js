const db = require( '../services/db.service' );
const helper = require( '../utils/helper' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

async function login( email, password ){
	const rows = await db.query(
		'SELECT * FROM users WHERE email=?',
		[ email ]
	);
	const data = helper.emptyOrRows( rows );
	if ( data.length === 0 ) {
		return {
			message: 'Email is incorrect',
		};
	}
	const hash = data[0].password;
	if ( bcrypt.compareSync( password, hash ) ){

		const token = jwt.sign(
			{ user_id: data.id, email },
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN,
			}
		);

		return {
			message: 'Login successful',
			token: token,
		};
	} else{

		return {
			message: 'Password is incorrect',
		};
	}
}

async function register( user ){
	const datetimeNow = new Date().toISOString().slice( 0, 19 ).replace( 'T', ' ' );
	const hash = bcrypt.hashSync( user.password, 10 );
	const result = await db.query(
		`INSERT users 
        (email, password, created_at)
        VALUES (?,?,?)`,
		[
			user.email, hash, datetimeNow,
		]
	);

	let message = 'Error in creating user';
	let data = null;

	if ( result.affectedRows ) {
		message = 'user created successfully';
		data = { id: result.insertId, ...user };
	}

	return { message, data };
}

async function updateUser( id, user ){
	const datetimeNow = new Date().toISOString().slice( 0, 19 ).replace( 'T', ' ' );
	let hash = bcrypt.hashSync( user.password, 10 );

	const result = await db.query(
		`UPDATE users 
        SET email=?, password=?, updated_at=?
        WHERE id=?`, 
		[
			user.email, hash, datetimeNow, id
		]
	);

	let message = 'Error in updating user';
	let data = null;

	if ( result.affectedRows ) {
		message = 'user updated successfully';
		data = { id, ...user };
	}

	return { message, data };
}


module.exports = {
	login,
	register,
	updateUser
};
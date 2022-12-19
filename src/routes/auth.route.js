
const express = require( 'express' );
const router = express.Router();
const authController = require( '../controllers/auth.controller' );

/* GET TODO. */
router.post( '/login', authController.login );
  
/* POST TODO */
router.post( '/register', authController.register );

module.exports = router;

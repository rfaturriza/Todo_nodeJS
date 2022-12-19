
const express = require( 'express' );
const router = express.Router();
const todoController = require( '../controllers/todos.controller' );

/* GET TODO. */
router.get( '/', todoController.get );
  
/* POST TODO */
router.post( '/', todoController.create );

/* PUT TODO */
router.put( '/:id', todoController.update );

/* DELETE TODO */
router.delete( '/:id', todoController.remove );

module.exports = router;

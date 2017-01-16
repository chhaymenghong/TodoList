const express = require('express');
const mongojs = require('mongojs');
const router = express.Router();
const db = mongojs('mongodb://chhaymenghong:123456Ch@ds163718.mlab.com:63718/todo-angular2',
['todos']);

// Get all todos
router.get( '/todos', ( req, res, next) => {
  db.todos.find( ( err, listOfTodos ) =>
    err ? res.send( err ) : res.json( listOfTodos )
  );
} );

// Get a todo
router.get( '/todos/:id', ( req, res, next ) => {
  db.todos.findOne(
    { _id: mongojs.ObjectId( req.params.id ) },
    ( err, todo ) => err ? res.send( err ) : res.json( todo )
  )
} );

// Add a new todo
router.post('/todo', ( req, res, next ) => {
  var body = req.body;
  if ( !body.text || !( body.isCompleted.toString() ) ) {
    res.status('400');
    res.json( { 'error' : 'invalid data'} );
  } else {
    db.todos.save( body, ( err, result ) => {
      err ? res.send( err ) : res.json( result );
    } );
  }
} );

// Update a todo
router.put( '/todo/:id', ( req, res, next ) => {
  var updatedTodo = {};
  var originalTodo = req.body;
  if ( originalTodo.hasOwnProperty( 'isCompleted' ) ) { updatedTodo.isCompleted = originalTodo.isCompleted; }
  if ( originalTodo.hasOwnProperty( 'text') ) { updatedTodo.text = originalTodo.text; }

  db.todos.update(
    { _id : mongojs.ObjectId( req.params.id ) },
    updatedTodo,
    {},
    ( err, result ) => err ? res.send( err ) : res.json( result )
   )
} );

// Delete a todo
router.delete( '/todo:/id', ( req, res, next ) => {
  db.todos.remove(
    { _id : mongojs.ObjectId( req.params.id ) },
    '',
    ( err, result ) => err ? res.send( err ) : res.json( result )
  )
} );

module.exports = router;

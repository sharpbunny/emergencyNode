//TODO : rename file to usersRouter 
var express = require('express');
var bodyParser = require('body-parser');
var userRouter = express.Router();

var userModel = require('../models/userModel');


/**
 * Define URL : user's root 
 * <pre><code>
 * http://myurl/user
 * </code></pre>
 */
userRouter.route('/')

/**
 * Get all users
 * @param req request
 * @param res response
 * @param next go to the next
 */
.get(function(req,res,next)
{
    userModel.getAll(res);
})


/**
 * POST request to create a new user.  The user's elements are sent as json in request body. 
 * @param req request
 * @param res response
 * @param next go to the next
 */
.post(function(req, res, next)
{
    userModel.create(req.body, res);
});


/**
 * Define URL : user's id 
 * <pre><code>
 * http://myurl/user/userID
 * </code></pre>
 */
userRouter.route('/:id')


/**
 * Get the specific user with is id sent in the request parameters
 * @param req request
 * @param res response
 * @param next go to the next
 */
.get(function(req,res,next)
{
    //TODO : get element by req.params.userId
    userModel.get(req.params.id, res);
})

/**
 * Update a specific user with is id sent in the request parameters
 * @param req request
 * @param res response
 * @param next go to the next
 */
.put(function(req, res, next)
{
  //TODO : get element by req.params.userId
    userModel.update(req.body, res);
})

/**
 * Delete a specifi user with is id sent in the request parameters
 */
.delete(function(req, res, next)
{
    //TODO : get element by req.params.userId
    userModel.delete(req.params.id, res);
});

/**
 * Define URL : login
 * <pre><code>
 * http://myurl/user/login
 * </code></pre>
 */
userRouter.route('/login')

/**
 * POST a user to check if exists in the database. Login and password are sent as json in the request body
 * @param req request
 * @param res response
 * @param next go to the next
 *  * <pre><code>
 * {
 *      'email' : 'my@email.addr',
 *      'password : 'mypassword'
 * }
 * </code></pre>
 */
.post(function(req, res, next) 
{
    console.log('check login');
    userModel.checkLogin(req.body, res);
});
 

module.exports = userRouter;

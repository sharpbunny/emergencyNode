//TODO : rename file to usersRouter 
var express = require('express');
var bodyParser = require('body-parser');
var users = express.Router();

var user = require('../models/user');

/** get all and post a new user */
users.route('/')

.get(function(req,res,next)
{
    user.getAll(res);
})

.post(function(req, res, next)
{
    user.create(req.body, res);
});

/** get stuff from specific user */
users.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.userId
    user.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.userId
    user.update(req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.userId
    user.delete(req.params.id, res);
});

/** get elements from login */
users.route('/login')

.post(function(req, res, next) 
{
    console.log('check login');
    user.checkLogin(req.body, res);
});
 

module.exports = users;

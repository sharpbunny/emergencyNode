//TODO : rename file to typesRouter
var express = require('express');
var bodyParser = require('body-parser');
var types = express.Router();

var type = require('../models/typeModel');

/** get all and post a new type */
types.route('/')

.get(function(req,res,next)
{
    type.getAll(res);
})

.post(function(req, res, next)
{
    type.create(req.body, res);
});

/** get stuff from specific type */
types.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.typeId
    type.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.typeId
    type.update(req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.typeId
    type.delete(req.params.id, res);
});

/** get elements from login */
types.route('/login')

.post(function(req, res, next) 
{
    console.log('check login');
    type.checkLogin(req.body, res);
});
 

module.exports = types;

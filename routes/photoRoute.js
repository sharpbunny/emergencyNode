//TODO : rename file to photosRouter 
var express = require('express');
var bodyParser = require('body-parser');
var photos = express.Router();

var photo = require('../models/photoModel');

/** get all and post a new photo */
photos.route('/')

.get(function(req,res,next)
{
    photo.getAll(res);
})

.post(function(req, res, next)
{
    photo.create(req.body, res);
});

/** get stuff from specific photo */
photos.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.photoId
    photo.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.photoId
    photo.update(req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.photoId
    photo.delete(req.params.id, res);
});

/** get elements from login */
photos.route('/login')

.post(function(req, res, next) 
{
    console.log('check login');
    photo.checkLogin(req.body, res);
});
 

module.exports = photos;

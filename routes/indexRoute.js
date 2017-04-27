var express = require('express');
var indexRouter = express.Router();

/** 
 * GET home page which is used as the API's documentation
 * @param req request
 * @param res response
 * @param next go to the next
 * */
indexRouter.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Documentation API' });
});


module.exports = indexRouter;

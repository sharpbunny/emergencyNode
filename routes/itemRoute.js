var express = require('express');
var bodyParser = require('body-parser');
var itemRouter = express.Router();

var itemModel = require('../models/itemModel');


/**
 * Define URL : item's root 
 * <pre><code>
 * http://myurl/item
 * </code></pre>
 */
itemRouter.route('/')

/**
 * GET request to get all items
 * @param req request
 * @param res response
 * @param next go to the next 
 */
.get(function(req,res,next)
{
    itemModel.getAll(res);
})

/**
 * POST request to post a new item. The item's elements are sent as json in request body
 * @param req request
 * @param res response
 * @param next got to the next
 */
.post(function(req, res, next)
{
    //TODO : convert json to other json
    itemModel.create(req.body, res);
});

/**
 * Define URL :
 * <pre><code>
 * http://myurl/item/itemID
 * </code></pre>
 */
itemRouter.route('/:id')


/**
 * Get a specific item. The item's id is given in the request parameters
 * @param req request
 * @param res response
 * @param next go to the next
 */
.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    itemModel.get(req.params.id, res);
})

/**
 * Update a specific item. The item's id is given in the request parameters
 * @param req request
 * @param res response
 * @param next go to the next
 */
.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    itemModel.update(req.params.id, req.body, res);
})


/**
 * Delete a specifi item. The item's id is given in the request parameters
 */
.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    itemModel.delete(req.params.id, res);
});
 

module.exports = itemRouter;

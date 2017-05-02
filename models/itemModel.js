var connection = require('../connection');
 
function Item() 
{
    /**
     * Get ALL items from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from item', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Get a specific item
     * @params id item id 
     * @params res response
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from item where id = ?', [id], function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status : 1, message : 'Failed to find'});
                } 
                else 
                {
                    res.send({status : 0 , item : result});
                }
            });
        });
    };

    /**
     * Create a new item
     * @params item item json
     * @params res
     */
    this.create = function(item, res) 
    {
        console.log(item);
        connection.acquire(function(err, con) 
        {
            con.query('insert into item set ?', item, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'ITEM creation failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'ITEM created successfully'});
                }
            });
        });
    };

    /**
     * Update a specific item
     * @params id item's id
     * @params item item in json format
     * @params res response 
     */
    this.update = function(id, item, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update item set ? where id = ?', [item, id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'ITEM update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'ITEM updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific item
     * @params id item's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from item where id = ?', [id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Deleted successfully'});
                }
            });
        });
    };
    
}

module.exports = new Item();

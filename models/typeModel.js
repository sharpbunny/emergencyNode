var connection = require('../connection');

function Type() {
    /**
     * Get ALL types from table
     * @params res response 
     */
    this.getAll = function(res) {
        connection.acquire(function(err, con) {
            con.query('select id_Type, LabelType, descriptionType from type', function(err, result) {
                con.release();
                res.send({ status: 0, types: result });
            });
        });
    };

    /**
     * Get a specific type
     */
    this.get = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('select id_Type, LabelType, descriptionType from type where id_Type = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'Failed to find' });
                } else {
                    res.send({ status: 0, type: result });
                }
            });
        });
    };

    /**
     * Create a type
     * @params type type in json format
     * @params res response
     */
    this.create = function(type, res) {
        connection.acquire(function(err, con) {
            con.query('insert into type set ?', type, function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'type creation failed', error: err });
                } else {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * get the last id 
     * TODO : move it in logical file
     * @params res response
     */
    function getLastId(res) {
        console.log('get last id');
        connection.acquire(function(err, con) {
            con.query('SELECT  LAST_INSERT_ID() as id', function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'type creation failed', error: err });
                } else {
                    res.send({ status: 0, message: 'type created successfully', id: result[0].id });
                }
            });
        });
    }

    /**
     * Update a specific type
     * @params type type in json format
     */
    this.update = function(type, res) {
        connection.acquire(function(err, con) {
            con.query('update type set ? where id = ?', [type, type.id], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'type update failed', error: err });
                } else {
                    res.send({ status: 0, message: 'type updated successfully' });
                }
            });
        });
    };

    /**
     * Delete a specific type
     * @params id type's id
     * @params res response
     */
    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('delete from type where id_Type = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'Failed to delete' });
                } else {
                    res.send({ status: 0, message: 'Deleted successfully' });
                }
            });
        });
    };
}

module.exports = new Type();
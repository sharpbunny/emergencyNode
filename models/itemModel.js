var connection = require('../connection');

function Item() {
    /**
     * Get ALL items from table
     * @params res response 
     */
    this.getAll = function(res) {
        var callback = function(items) {
            res.send(items);
        }

        connection.acquire(function(err, con) {
            con.query('select i.idItem, i.commentaire, majItem, i.item_Lat, i.item_Lon, i.idUser, i.id_Type \
                        , u.idUser, u.nameUser, u.loginUser, u.firstnameUser, u.birthdateUser, u.emailUser, u.phoneUser \
                        , t.id_Type, t.LabelType, t.descriptionType \
                        from item as i \
                        left join user as u on u.idUser = i.idUser \
                        left join type as t on t.id_Type = i.id_Type', function(err, items, fields) {
                var pending = items.length;
                for (var i=0; i<items.length; i++) {
                    console.log("SELECT * FROM photo WHERE idItem=" + items[i].idItem);
                    con.query("SELECT * FROM photo WHERE idItem=" + [items[i].idItem]
                    , function(err, photos, fields) {
                        
                        items[i-1].photos = [photos];
                        
                        if (0 === --pending) {
                            callback(items);
                        }
                    });
                }
            });
        });

        // connection.acquire(function(err, con) {
            // var sql = 'select i.idItem, i.commentaire, majItem, i.item_Lat, i.item_Lon, i.idUser, i.id_Type \
                        // , u.idUser, u.nameUser, u.loginUser, u.firstnameUser, u.birthdateUser, u.emailUser, u.phoneUser \
                        // , t.id_Type, t.LabelType, t.descriptionType \
                        // from item as i \
                        // left join user as u on u.idUser = i.idUser \
                        // left join type as t on t.id_Type = i.id_Type'

            // con.query(sql, function(err, result) {
                // con.release();
                // if (err) {
                    // console.log(err);
                    // res.send({ status: 1, message: 'Failed to find all items', error: err });
                // } else {
                    // for (var i=0; i<result.length; i++) {
                        // var row = result[i];
                        // console.log(row.idItem);
                        // console.log(row.commentaire);
                        // //getPhoto(row.idItem, res);
                    // }
                    // //res.send({ status: 0, response: result });
                // }
            // });
        // });
    };
    

    /**
     * Get a specific item
     * @params id item id 
     * @params res response
     */
    this.get = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('select i.idItem, i.commentaire, majItem, i.item_Lat, i.item_Lon, i.idUser, i.id_Type, \
                        u.nameUser, u.loginUser, u.firstnameUser, u.birthdateUser, u.emailUser, u.phoneUser, \
                        t.LabelType, t.descriptionType \
                        from item as i \
                        left join user as u on u.idUser = i.idUser \
                        left join type as t on t.id_Type = i.id_Type \
                        where idItem = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'Failed to find', error: err });
                } else {
                    res.send({ status: 0, item: result });
                }
            });
        });
    };

    /**
     * Create a new item
     * @params item item json
     * @params res
     */
    this.create = function(item, res) {
        console.log(item);
        connection.acquire(function(err, con) {
            con.query('insert into item set ?', item, function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'ITEM creation failed', error: err });
                } else {
                    res.send({ status: 0, message: 'ITEM created successfully' });
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
    this.update = function(id, item, res) {
        connection.acquire(function(err, con) {
            con.query('update item set ? where idItem = ?', [item, id], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({ status: 1, message: 'ITEM update failed' });
                } else {
                    res.send({ status: 0, message: 'ITEM updated successfully' });
                }
            });
        });
    };

    /**
     * Delete a specific item
     * @params id item's id
     * @params res response
     */
    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('delete from item where idItem = ?', [id], function(err, result) {
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

module.exports = new Item();
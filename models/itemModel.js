var connection = require('../connection');

function Item() {
    /**
     * Get ALL items from table
     * @params res response 
     */
    this.getAll = function(res) {
        var callback = function(items) {
            res.send({ status: 0, response: items });
        }

        connection.acquire(function(err, con) {
            con.query('select i.idItem, i.commentaire, majItem, i.item_Lat, i.item_Lon, i.idUser, i.id_Type \
                        , u.idUser, u.nameUser, u.loginUser, u.firstnameUser, u.birthdateUser, u.emailUser, u.phoneUser \
                        , t.id_Type, t.LabelType, t.descriptionType \
                        from item as i \
                        left join user as u on u.idUser = i.idUser \
                        left join type as t on t.id_Type = i.id_Type', function(err, items, fields) {
                var pending = items.length;
                for (var i in items) {
                    con.query("SELECT idPhoto, datePhoto \
                                    , CONCAT(\"http://rest.nomadi.fr/uploads/\", adressUrlPhoto) as adressUrlPhoto \
                                    , CONCAT(\"http://rest.nomadi.fr/uploads/\", adressUrlPhoto, \"?dim=40x40\") as thumbUrlPhoto \
                                    , idItem, idUser FROM photo WHERE idItem=" + [items[i].idItem], (function(i, err, photos, fields) {
                        // add photos to items
                        items[i].photo = photos;
                        // waiting for all query done
                        if (0 === --pending) {
                            // sending results
                            callback(items);
                        }
                    }).bind(null, i));
                }
            });
        });
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
                    res.send({ status: 1, message: 'ITEM update failed', error: err });
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
                    res.send({ status: 1, message: 'Failed to delete', error: err });
                } else {
                    res.send({ status: 0, message: 'Deleted successfully' });
                }
            });
        });
    };

}

module.exports = new Item();

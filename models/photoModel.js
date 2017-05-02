var connection = require('../connection');
 
function Photo() 
{
    /**
     * Get ALL photos from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select p.idPhoto, p.datePhoto, p.adressUrlPhoto, p.idItem, p.idUser, \
                        u.nameUser, u.loginUser, u.firstnameUser, u.birthdateUser, u.emailUser, u.phoneUser, \
                        i.commentaire, i.majItem, i.item_Lat, i.item_Lon\
                        from photo as p \
                        left join user as u on u.idUser = p.idUser \
                        left join item as i on i.idItem = p.idItem \
                        ', function(err, result) 
            {
                con.release();
                res.send({status: 0 , response: result});
            });
        });
    };

    /**
     * Get a specific photo
     * @params id photo id 
     * @params res response
     */
    this.get = function(id, res)
    {
        connection.acquire(function(err, con) 
        {
            con.query('select p.idPhoto, p.datePhoto, p.adressUrlPhoto, p.idItem, p.idUser, \
                        u.nameUser, u.loginUser, u.firstnameUser, u.birthdateUser, u.emailUser, u.phoneUser, \
                        i.commentaire, i.majItem, i.item_Lat, i.item_Lon\
                        from photo as p \
                        left join user as u on u.idUser = p.idUser \
                        left join item as i on i.idItem = p.idItem \
                        where idPhoto = ?', [id], function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status : 1, message : 'Failed to find'});
                } 
                else 
                {
                    res.send({status : 0 , photo : result});
                }
            });
        });
    };

    /**
     * Create a new photo
     * @params photo photo json
     * @params res
     */
    this.create = function(photo, res) 
    {
        console.log(photo);
        connection.acquire(function(err, con) 
        {
            con.query('insert into photo set ?', photo, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Photo creation failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Photo created successfully'});
                }
            });
        });
    };

    /**
     * Update a specific photo
     * @params id photo's id
     * @params photo photo in json format
     * @params res response 
     */
    this.update = function(id, photo, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update photo set ? where idPhoto = ?', [photo, id], function(err, result) 
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
     * Delete a specific photo
     * @params id photo's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from photo where idPhoto = ?', [id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete photo'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Photo Deleted successfully'});
                    // TODO delete photo from uploads
                }
            });
        });
    };
    
}

module.exports = new Photo();

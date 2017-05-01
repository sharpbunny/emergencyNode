var connection = require('../connection');
var jwt = require('jsonwebtoken');
 
function User() 
{
    /**
     * Get ALL users from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from user', function(err, result) 
            {
                con.release();
                res.send({status : 0, users : result});
            });
        });
    };

    /**
     * Get a specific user
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select firsnameUser, nameUser, birthdayUser, emailUser, phoneUser, from user where idUser = ?', [id], function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to find'});
                } 
                else 
                {
                    res.send({status : 0 , user :result});
                }
            });
        });
    };

    /**
     * Create a user
     * @params user user in json format
     * @params res response
     */
    this.create = function(user, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('insert into user set ?', user, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'USER creation failed'});
                } else 
                {
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
    function getLastId(res) 
    {
        console.log('get last id');
        connection.acquire(function(err, con) 
        {
            con.query('SELECT  LAST_INSERT_ID() as id',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'USER creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'USER created successfully', id:result[0].id});
                }
            });
        });
    }

    /**
     * Update a specific user
     * @params user user in json format
     */
    this.update = function(user, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update user set ? where id = ?', [user, user.id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'USER update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'USER updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specifi user
     * @params id user's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('delete from user where id = ?', [id], function(err, result) 
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

    /**
     * Check a login validity
     * @params user user in json format
     * @params res response
     */
    this.checkLogin = function(user, res) 
    {
        connection.acquire(function(err, con) 
        {
            console.log(user.email);
            console.log(user.pwd);
            con.query('select * from user where emailUser = ? AND passwordUser = ?', [user.email, user.pwd], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 2, message: 'Request error'});
                } 
                else 
                {
                    var token = jwt.sign(user, "theVerySecretHash", {
                        expiresIn: 1440 // exire in 1 hour
                    });
                    console.log("Token created: " + token);
                    if(result.length > 0) res.send({status: 0, message: 'Connexion OK', id: result[0].idUser, token : token});
                    else res.send({status: 1, message: 'login failed'});
                }
            });
        });
    }; 
}

module.exports = new User();

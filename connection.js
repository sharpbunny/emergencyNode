/**
 * module to connect to mysql database
 */
var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function() {
        this.pool = mysql.createPool({
            connectionLimit: 5,
            host: 'localhost',
            user: 'csharp',
            password: 'csharp',
            database: 'intervention'
        });
    };

    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
}

module.exports = new Connection();

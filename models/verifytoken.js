var jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
  // looking for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        console.log("Token: " + token);
        jwt.verify(token, "theVerySecretHash", function(err, decoded) {
            if (err) { //failed verification.
                console.log("Check token failed");
                return res.json({"error": true});
            }
            console.log("Check token success");
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        console.log("request without token denied");
        return res.status(403).send({
            "error": true
        });
    }
}

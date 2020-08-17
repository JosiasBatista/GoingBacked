const jwt = require('jsonwebtoken');
const authConfig = require('./authConfig');

module.exports = {
    // Function for generate the token by ther user logged id
    generateToken( user_id ) {
        return jwt.sign({ id: user_id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
}


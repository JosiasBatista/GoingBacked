const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const { promisify } = require('util');
const jwt_decode = require('jwt-decode');

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;

   if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt_decode(token, {complete: true});

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalid" });
    }
}


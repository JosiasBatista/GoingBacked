const bcrypt = require('bcrypt');
const connection = require('../../database/connection');
const token = require('../../config/token');

module.exports = {
    async create (req, res) {
        const {email, password} = req.body;

        const User = await connection('users').where('email', email).select('*').first();

        if (!email | !password) {
            return res.status(401).json({ error: "All fields are required" });
        }

        if (!User) {
            return res.status(401).json({ error: "Any user founded with this email" });
        }

        bcrypt.compare(password, User.password)
            .then(result => {
                const checkPassword = result;

                if (!checkPassword) {
                    return res.status(400).json({ error: "Password doesn't match" });
                }

                req.userId = User.id;
                return res.json({ user: User.name, token: token.generateToken(User.id) });
            });

    },
}

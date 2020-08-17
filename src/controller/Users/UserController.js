const bcrypt = require('bcrypt');

const connection = require('../../database/connection');

module.exports = {
  async create (req, res) {
    const { name, email, password, passwordConf } = req.body;

    if ( !name | !password | !passwordConf ) {
      return res.status(412).json({ error: "All fields are required" });
    }

    if ( password !== passwordConf ) {
      return res.status(401).json({ error: "Password must be equals" });
    }

    const UsersEmail = await connection('users').where('email', email).select('*').first();

    if (UsersEmail) {
        return res.status(401).json({ error: 'Email already being used' });
    }

    bcrypt.hash(password1, 8)
        .then(async hash => {
            let password = hash;

            await connection('users').insert({
                name,
                email,
                password,
            })
            return res.send();
       })
  }
}

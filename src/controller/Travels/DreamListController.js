const connection = require("../../database/connection");

module.exports = {
  async create (req, res) {
    const { place, description, type, priority } = req.body;

    const user_id = req.userId;

    const [id] = await connection('dream_list').insert({
      place,
      description,
      type,
      priority,
      user_id,
    });

    return res.json({ id });
  },

  async index (req, res) {
    const [count] = await connection('dream_list').count();
    const user_id = req.userId;

    const dreams = await connection('dream_list').where('user_id', user_id).select('*');

    res.header('X-Total-Count', count['count(*)']);

    return res.json(dreams);
  },

  async show (req, res) {
    const {id} = req.params;
    const user_id = req.userId;

    const dream = await connection('dream_list').where('user_id', user_id).where('id', id).select('*').first();

    return res.json(dream);
  },

  async destroy (req, res) {
    const {id} = req.params;
    const user_id = req.userId;

    const dream = await connection('dream_list').where('id', id).select('user_id').first();

    if (user_id !== dream.user_id) {
      return res.status(401).json({ error: "Operation not permitted" });
    }

    await connection('dream_list').where('id', id).delete();

    return res.status(204).send();
  }
}

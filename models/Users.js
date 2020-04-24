const db = require('../db/dbConfig');

exports.add = async (body) => {
  const [id] = await db('users').insert(body);
  return await this.findById(id);
};

exports.find = () => db('users');

exports.findById = (id) => db('users').where({ id });

exports.findByUsername = (username) => db('users').where({ username });

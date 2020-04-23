module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: '../db/auth.db3' },
    migrations: { directory: '../db/migrations' },
    seeds: { directory: '../db/seeds' },
    pool: {
      afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done),
    },
    useNullAsDefault: true,
  },
};

// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './sprint.db3'
    },
    useNullAsDefault: true,
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
//sqlite does not enforce foreign keys by default !!!!!!
//add pool to enfore foreign keys constraints
    pool: {
      afterCreate: (connection, done) => {
        connection.run('PRAGMA foreign_keys = ON', done);
      }
    }
 
};

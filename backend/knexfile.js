const dotenv = require('dotenv/config');

// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:_CUBE_@localhost:5432/eTrashDB',
    migrations: {
      directory: __dirname + '/src/database/migrations'
    },
    seeds: { directory: './seeds'}
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }, 
    migrations: {
      tableName: 'knex_migrations'
    }
  },

   production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
       directory: __dirname + '/src/database/migrations',
      
    }
  }

};

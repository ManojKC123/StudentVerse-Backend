const knex = require("knex");
const { database: config } = require("../config");

const dbCon = knex({
    client: process.env.DB_CLIENT,
    connection: config,
    migrations: {
        directory: "./db/migrations"
    },
    seeds: {
        directory: "./db/seeds"
    }
});

module.exports = dbCon;

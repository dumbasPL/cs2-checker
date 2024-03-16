import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./dev.db"
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
export default config;
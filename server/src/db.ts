import knex from "knex";
import * as init_migration from "./migrations/20240316173431_init";

const migrations = {
  "20240316173431_init": init_migration,
} as const;

type MigrationName = keyof typeof migrations;

export let db: ReturnType<typeof knex> = null!;

export function setupDb(filename: string) {
  db = knex({
    client: "better-sqlite3",
    connection: {
      filename,
    },
    useNullAsDefault: true,
  });
}

class StaticMigrationSource {
  async getMigrations() {
    return Object.keys(migrations) as MigrationName[];
  }

  getMigrationName(migration: MigrationName) {
    return migration;
  }

  async getMigration(migration: MigrationName) {
    return migrations[migration];
  }
}

export async function migrateDb() {
  await db.migrate.latest({
    migrationSource: new StaticMigrationSource(),
  });
}

export interface Account {
  id: number;
  username: string;
  password: string;
  sharedSecret: string | null;
  steamId: string | null;
  steamGuardMachineToken: string | null;
  refreshToken: string | null;
  profileName: string | null;
}

export interface Tag {
  id: number;
  name: string | null;
}

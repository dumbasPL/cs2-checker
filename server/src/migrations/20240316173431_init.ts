import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Account', table => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('sharedSecret');
    table.string('steamId');
    table.string('steamGuardMachineToken');
    table.string('refreshToken');
    table.string('profileName');
  });

  await knex.schema.createTable('Tag', table => {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
  });

  await knex.schema.createTable('AccountTag', table => {
    table.integer('accountId').unsigned().notNullable().references('id').inTable('Account').onDelete('CASCADE');
    table.integer('tagId').unsigned().notNullable().references('id').inTable('Tag').onDelete('CASCADE');
    table.primary(['accountId', 'tagId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('AccountTag');
  await knex.schema.dropTable('Tag');
  await knex.schema.dropTable('Account');
}


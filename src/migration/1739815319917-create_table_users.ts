import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1739815319917 implements MigrationInterface {
  name = 'CreateTableUsers1739815319917';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "username" character varying(20) NOT NULL,
        "password" character varying NOT NULL,
        "create_at" TIMESTAMP NOT NULL DEFAULT now(),
        "update_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_username" UNIQUE ("username")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTasks1739815935822 implements MigrationInterface {
  name = 'CreateTableTasks1739815935822';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tasks_status_enum') THEN
          CREATE TYPE tasks_status_enum AS ENUM ('pending', 'in_progress', 'completed');
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tasks_priority_enum') THEN
          CREATE TYPE tasks_priority_enum AS ENUM ('low', 'medium', 'high');
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" text NOT NULL,
        "description" text,
        "status" tasks_status_enum NOT NULL DEFAULT 'pending',
        "priority" tasks_priority_enum NOT NULL DEFAULT 'medium',
        "due_date" TIMESTAMP,
        "tags" text array,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "user_id" uuid,
        CONSTRAINT "PK_tasks" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_title" ON "tasks" ("title")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_status" ON "tasks" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_priority" ON "tasks" ("priority")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_due_date" ON "tasks" ("due_date")`,
    );

    await queryRunner.query(`
      ALTER TABLE "tasks"
      ADD CONSTRAINT "FK_tasks_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_tasks_user"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_tasks_due_date"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_priority"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_status"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_title"`);

    await queryRunner.query(`DROP TABLE "tasks"`);

    await queryRunner.query(`DROP TYPE tasks_status_enum`);
    await queryRunner.query(`DROP TYPE tasks_priority_enum`);
  }
}

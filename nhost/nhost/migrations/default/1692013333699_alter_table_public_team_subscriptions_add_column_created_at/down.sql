-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."team_subscriptions" add column "created_at" timestamptz
--  not null default now();

ALTER TABLE "public"."team_subscriptions" DROP COLUMN "created_at";
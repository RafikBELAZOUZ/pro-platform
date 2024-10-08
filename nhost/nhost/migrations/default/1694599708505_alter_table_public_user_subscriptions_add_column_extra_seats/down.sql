-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user_subscriptions" add column "extra_seats" integer
--  not null default '0';
ALTER TABLE "public"."user_subscriptions" DROP COLUMN "extra_seats";
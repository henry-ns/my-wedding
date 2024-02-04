ALTER TABLE `payment ` RENAME COLUMN `unit_amount` TO `unit_total`;--> statement-breakpoint
ALTER TABLE gift ADD `quantity` integer NOT NULL;
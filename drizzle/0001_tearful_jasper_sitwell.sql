CREATE TABLE `presence` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`check` integer DEFAULT false NOT NULL,
	`checked_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

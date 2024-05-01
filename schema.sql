CREATE TABLE IF NOT EXISTS `credentials` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(64) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
);

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `credentials_id` INT(11) NOT NULL,
    `username` VARCHAR(24) NOT NULL DEFAULT 'User',
    `ally_code` INT(9) NOT NULL,
    `discord_id` BIGINT NOT NULL DEFAULT -1,
    PRIMARY KEY (`id`, `credentials_id`),
    KEY `discord_id` (`discord_id`),
    UNIQUE KEY `ally_code` (`ally_code`),
    FOREIGN KEY (`credentials_id`) REFERENCES `credentials` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `discord_user` (
    `user_id` INT(11) NOT NULL,
    `discord_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY (`discord_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `guild` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `guild_id` VARCHAR(22) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY (`guild_id`)
);

CREATE TABLE IF NOT EXISTS `user_guild` (
    `user_id` INT(11) NOT NULL,
    `guild_id` INT(11) NOT NULL,
    PRIMARY KEY (`user_id`, `guild_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`guild_id`) REFERENCES `guild` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `member_units` (
    `user_id` INT(11) NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `data` JSON NOT NULL,
    PRIMARY KEY (`user_id`, `time`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`stat_id`) REFERENCES `stat_type` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `member_mods` (
    `user_id` INT(11) NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `data` JSON NOT NULL,
    PRIMARY KEY (`user_id`, `time`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`stat_id`) REFERENCES `stat_type` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `member_datacrons` (
    `user_id` INT(11) NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `data` JSON NOT NULL,
    PRIMARY KEY (`user_id`, `time`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`stat_id`) REFERENCES `stat_type` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `member_data` (
    `user_id` INT(11) NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `data` JSON NOT NULL,
    PRIMARY KEY (`user_id`, `time`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`stat_id`) REFERENCES `stat_type` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `guild_data` (
    `guild_id` INT(11) NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `data` JSON NOT NULL,
    PRIMARY KEY (`user_id`, `time`),
    FOREIGN KEY (`guild_id`) REFERENCES `guild` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`stat_id`) REFERENCES `stat_type` (`id`) ON DELETE CASCADE
);
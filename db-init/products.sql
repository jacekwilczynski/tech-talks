CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(1024) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`name`, `image_url`, `price`)
VALUES
   ('Acer Facer', 'acer-facer.jpg', 10.00),
   ('HP Page Me', 'hp-page-me.jpg', 22.50),
   ('Dell From Hell', 'dell-from-hell.jpg', 29.99)
;

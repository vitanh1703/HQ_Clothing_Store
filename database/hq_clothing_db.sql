-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
<<<<<<< HEAD
-- Thời gian đã tạo: Th4 05, 2026 lúc 09:32 AM
=======
-- Thời gian đã tạo: Th4 05, 2026 lúc 08:22 AM
>>>>>>> 8ded1ec48dc42bcfbfd968c560ca3d893c3a24cc
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hq_clothing_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `user_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1 CHECK (`quantity` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `variant_id`, `quantity`) VALUES
(1, 1, 4, 8),
(2, 1, 5, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Áo thun', 'Các loại áo thun cotton, slim fit, unisex'),
(2, 'Sơ mi', 'Sơ mi công sở và dạo phố thời trang'),
(3, 'Quần Jeans', 'Quần jeans nam nữ chất lượng cao'),
(4, 'Phụ kiện', 'Thắt lưng, ví da, tất và nón');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `publish_date` date NOT NULL,
  `img_url` text NOT NULL,
  `description` text NOT NULL,
  `content` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `category`, `title`, `publish_date`, `img_url`, `description`, `content`, `created_at`) VALUES
(1, 'Editorial', 'Xu hướng Denim tái định nghĩa phong cách 2026', '2026-05-15', 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000', 'Khám phá cách chúng tôi kết hợp chất liệu truyền thống với những đường cắt hiện đại...', 'Nội dung chi tiết bài viết về xu hướng Denim năm 2026.', '2026-04-05 06:20:49'),
(2, 'Sự kiện', 'H&Q Store khai trương chi nhánh thứ 10 tại Hà Nội', '2026-05-10', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000', 'Sự kiện ra mắt bộ sưu tập đặc biệt đi kèm những ưu đãi độc quyền dành cho khách hàng...', 'Thông tin chi tiết về buổi khai trương và danh sách quà tặng.', '2026-04-05 06:20:49'),
(3, 'Lối sống', 'Nghệ thuật tối giản trong tủ đồ nam giới', '2026-05-05', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000', 'Làm thế nào để xây dựng một phong cách bền vững chỉ với những món đồ cơ bản...', 'Hướng dẫn cách chọn đồ và phối đồ theo phong cách Minimalism.', '2026-04-05 06:20:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(15,2) NOT NULL,
  `status` enum('Pending','Shipping','Success','Cancel') NOT NULL DEFAULT 'Pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `price_at_purchase` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `brand_text` varchar(50) DEFAULT 'H&Q',
  `accent_color` varchar(50) DEFAULT 'bg-[#9bdc28]',
  `hover_accent` varchar(50) DEFAULT 'hover:bg-[#9bdc28]',
  `image_url` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `brand_text`, `accent_color`, `hover_accent`, `image_url`, `description`, `category_id`, `supplier_id`) VALUES
<<<<<<< HEAD
(1, 'Sơ mi Seersucker Kẻ Sọc', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484709/item/vngoods_50_484709_3x4.jpg', 'Chất liệu vải nhăn thoáng mát, phù hợp mùa hè', 2, 1),
(2, 'Áo thun Slim Fit Cotton', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484709/item/vngoods_50_484709_3x4.jpg', 'Vải cotton 100% co giãn 4 chiều', 1, 1),
(3, 'Quần Jean Slim Fit Navy', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484709/sub/goods_484709_sub14_3x4.jpg', 'Quần Jean nam màu xanh navy thời thượng', 3, 2);
=======
(1, 'Sơ mi Seersucker Kẻ Sọc', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476997/sub/vngoods_476997_sub3_3x4.jpg', 'Chất liệu vải nhăn thoáng mát, phù hợp mùa hè', 2, 1),
(2, 'Áo thun Slim Fit Cotton', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://static.zara.net/photos///2024/I/0/1/p/0679/303/250/2/w/563/0679303250_6_1_1.jpg', 'Vải cotton 100% co giãn 4 chiều', 1, 1),
(3, 'Quần Jean Slim Fit Navy', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000', 'Quần Jean nam màu xanh navy thời thượng', 3, 2);
>>>>>>> 8ded1ec48dc42bcfbfd968c560ca3d893c3a24cc

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(10) NOT NULL,
  `color` varchar(30) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT 0 CHECK (`stock_quantity` >= 0),
  `sku` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `size`, `color`, `price`, `stock_quantity`, `sku`) VALUES
(1, 1, 'M', 'Trắng', 450000.00, 50, 'HQ-SM-W-M'),
(2, 1, 'L', 'Trắng', 450000.00, 30, 'HQ-SM-W-L'),
(3, 2, 'S', 'Đen', 250000.00, 100, 'HQ-AT-B-S'),
(4, 2, 'M', 'Đen', 250000.00, 80, 'HQ-AT-B-M'),
(5, 3, '30', 'Xanh Indigo', 650000.00, 40, 'HQ-QJ-I-30'),
<<<<<<< HEAD
(6, 3, 'M', 'Xanh Indigo', 650000.00, 25, 'HQ-QJ-I-32');
=======
(6, 3, '32', 'Xanh Indigo', 650000.00, 25, 'HQ-QJ-I-32');
>>>>>>> 8ded1ec48dc42bcfbfd968c560ca3d893c3a24cc

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL COMMENT 'Mã giảm giá (ví dụ: GiamGia10)',
  `description` varchar(255) DEFAULT NULL,
  `discount_value` decimal(15,2) NOT NULL COMMENT 'Giá trị giảm',
  `discount_type` enum('Percentage','FixedAmount') NOT NULL DEFAULT 'FixedAmount',
  `min_order_value` decimal(15,2) DEFAULT 0.00 COMMENT 'Giá trị đơn hàng tối thiểu để áp dụng',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL COMMENT 'Số lần tối đa mã được sử dụng',
  `used_count` int(11) DEFAULT 0 COMMENT 'Số lần đã sử dụng',
  `status` tinyint(1) DEFAULT 1 COMMENT '1: Hoạt động, 0: Ngưng áp dụng',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`id`, `code`, `description`, `discount_value`, `discount_type`, `min_order_value`, `start_date`, `end_date`, `usage_limit`, `used_count`, `status`, `created_at`) VALUES
(1, 'WELCOME2026', 'Giảm 50k cho đơn hàng đầu tiên', 50000.00, 'FixedAmount', 200000.00, '2026-01-01', '2026-12-31', 1000, 0, 1, '2026-04-05 06:20:49'),
(2, 'HE10', 'Giảm 10% cho bộ sưu tập mùa hè', 10.00, 'Percentage', 0.00, '2026-04-01', '2026-06-30', 500, 0, 1, '2026-04-05 06:20:49'),
(3, 'FREESHIP', 'Giảm 30k phí vận chuyển', 30000.00, 'FixedAmount', 500000.00, '2026-04-01', '2026-04-30', 200, 0, 1, '2026-04-05 06:20:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` tinyint(1) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`) VALUES
(1, 2, 1, 5, 'Áo mặc rất mát, form chuẩn công sở!', '2026-04-05 06:20:49'),
(2, 3, 2, 4, 'Chất vải đẹp nhưng hơi ôm quá so với mình.', '2026-04-05 06:20:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `icon_name` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `order_index` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id`, `icon_name`, `title`, `description`, `order_index`) VALUES
(1, 'Truck', 'Giao hàng hỏa tốc', 'Nhận hàng trong vòng 24h tại nội thành', 1),
(2, 'ShieldCheck', 'Bảo hành 12 tháng', 'Cam kết chất lượng trên từng đường kim mũi chỉ', 2),
(3, 'RefreshCw', 'Đổi trả dễ dàng', '7 ngày đổi trả miễn phí nếu không vừa ý', 3),
(4, 'CreditCard', 'Thanh toán bảo mật', 'Hỗ trợ nhiều phương thức an toàn', 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `phone`, `address`) VALUES
(1, 'H&Q Tổng kho Hà Nội', '0912345678', 'Số 10, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội'),
(2, 'Xưởng may Gia Định', '0987654321', 'Quận 12, TP. Hồ Chí Minh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('Admin','Staff','Customer') NOT NULL DEFAULT 'Customer',
  `auth_provider` enum('local','google') DEFAULT 'local',
  `google_id` varchar(255) DEFAULT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `avatar_url` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1 COMMENT '1: Hoạt động, 0: Khóa',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `role`, `auth_provider`, `google_id`, `full_name`, `phone`, `address`, `avatar_url`, `status`, `created_at`) VALUES
(1, '$2a$11$l6AwTBlpYjj/LtO6fDt4YebGr0u22bp0XOr.C5NorG4XECM1KYBKq', 'admin@hq.com', 'Admin', 'local', NULL, 'Quản trị viên', '0900000001', 'Hà Nội', NULL, 1, '2026-04-05 06:20:49'),
(2, '$2a$11$B2BN/a9C16TVQE2YsmTMrumhI/cDIBZv0oGxiWkvwY8C7dwUiCr3G', 'diema@gmail.com', 'Customer', 'local', NULL, 'Diêm Anh', '0900000002', 'Hải Phòng', NULL, 1, '2026-04-05 06:20:49'),
<<<<<<< HEAD
(3, '$2a$11$2eSdcFbMEOrxj8p50vjv.eC8OdmxBnA24TVP1KYc/8F4PXQl8.CpO', 'vietanh@gmail.com', 'Customer', 'local', NULL, 'Diêm Việt Anh', '0900000003', 'Hà Nội', NULL, 1, '2026-04-05 06:20:49'),
(4, '$2a$11$ne2nAQEV8.sekykzIQ8BJ.qEJaz9FcnTIzRObfp1CoSwAfMbU3Q6W', 'diema448@gmail.com', 'Customer', 'google', '104884167290364105829', 'Diêm Việt Anh', NULL, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLHZKCZ0cWLxikxVdSzqJ7qSoORzATbHfxtSYNMH0Bi9_EhxwYF=s96-c', 1, '2026-04-05 06:51:58');
=======
(3, '$2a$11$2eSdcFbMEOrxj8p50vjv.eC8OdmxBnA24TVP1KYc/8F4PXQl8.CpO', 'vietanh@gmail.com', 'Customer', 'local', NULL, 'Diêm Việt Anh', '0900000003', 'Hà Nội', NULL, 1, '2026-04-05 06:20:49');
>>>>>>> 8ded1ec48dc42bcfbfd968c560ca3d893c3a24cc

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_items_cart` (`cart_id`),
  ADD KEY `fk_items_variant` (`variant_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_oi_order` (`order_id`),
  ADD KEY `fk_oi_variant` (`variant_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_category` (`category_id`),
  ADD KEY `fk_products_supplier` (`supplier_id`);

--
-- Chỉ mục cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `fk_variants_product` (`product_id`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reviews_user` (`user_id`),
  ADD KEY `fk_reviews_product` (`product_id`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_id` (`google_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
>>>>>>> 8ded1ec48dc42bcfbfd968c560ca3d893c3a24cc

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_items_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_oi_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_oi_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_products_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `fk_variants_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 08, 2026 lúc 09:36 AM
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
(1, 1),
(2, 4),
(3, 6);

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
(8, 3, 1, 1),
(9, 3, 4, 1),
(17, 2, 3, 1);

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
(1, 'Áo khoác', 'Các loại áo unisex'),
(2, 'Sơ thun', 'Sơ mi công sở và dạo phố thời trang'),
(3, 'Áo len & Áo dệt kim', 'Quần jeans nam nữ chất lượng cao'),
(4, 'Phụ kiện', 'Thắt lưng, ví da, tất và nón');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `status` tinyint(1) DEFAULT 1 COMMENT '1: Hiển thị, 0: Ẩn',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `sort_order`, `status`, `created_at`) VALUES
(1, 'Chính sách đổi trả của H&Q như thế nào?', 'Bạn có thể đổi trả hàng miễn phí trong vòng 7 ngày kể từ khi nhận hàng nếu sản phẩm còn nguyên tem mác.', 1, 1, '2026-04-06 11:06:30'),
(2, 'Làm sao để tôi chọn đúng size áo?', 'Bạn có thể tham khảo bảng quy đổi kích cỡ chi tiết trong phần mô tả của mỗi sản phẩm.', 2, 1, '2026-04-06 11:06:30'),
(3, 'H&Q có giao hàng toàn quốc không?', 'Chúng tôi hỗ trợ giao hàng tận nơi trên toàn quốc với thời gian từ 2-4 ngày làm việc.', 3, 1, '2026-04-06 11:06:30');

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
(3, 'Lối sống', 'Nghệ thuật tối giản trong tủ đồ nam giới', '2026-05-05', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000', 'Làm thế nào để xây dựng một phong cách bền vững chỉ với những món đồ cơ bản...', 'Hướng dẫn cách chọn đồ và phối đồ theo phong cách Minimalism.', '2026-04-05 06:20:49'),
(4, 'Xu hướng', 'Top 5 màu sắc thống trị mùa hè 2026', '2026-06-01', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b', 'Khám phá những gam màu rực rỡ giúp bạn nổi bật trong những chuyến du lịch hè.', 'Nội dung chi tiết về các bảng màu từ Neon đến Pastel...', '2026-04-05 09:49:15'),
(5, 'BST Mới', 'Ra mắt bộ sưu tập \"H&Q Minimalist\" tháng 6', '2026-06-05', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105', 'Sự kết hợp hoàn hảo giữa phong cách tối giản và chất liệu bền vững.', 'Chi tiết về các dòng áo thun và quần tây trong bộ sưu tập mới nhất...', '2026-04-05 09:49:15'),
(6, 'Phối đồ', 'Bí quyết chọn đồ cho dáng người quả lê', '2026-06-10', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', 'Hướng dẫn cách phối đồ giúp tôn dáng và che khuyết điểm hiệu quả.', 'Các chuyên gia thời trang tại H&Q sẽ chỉ bạn cách chọn chân váy và quần...', '2026-04-05 09:49:15'),
(7, 'Sự kiện', 'H&Q đồng hành cùng Tuần lễ Thời trang Việt Nam', '2026-06-15', 'https://images.unsplash.com/photo-1509631179647-0177331693ae', 'H&Q chính thức trở thành nhà tài trợ trang phục cho sự kiện lớn nhất năm.', 'Chúng tôi tự hào mang đến những thiết kế mang đậm bản sắc Việt...', '2026-04-05 09:49:15'),
(8, 'Ưu đãi', 'Siêu sale giữa năm - Giảm đến 50% toàn bộ cửa hàng', '2026-06-20', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', 'Cơ hội lớn nhất để sở hữu những item hot nhất với mức giá cực hời.', 'Chương trình áp dụng cho cả mua online và tại hệ thống cửa hàng...', '2026-04-05 09:49:15'),
(9, 'Phong cách', 'Cách bảo quản quần áo Linen luôn như mới', '2026-06-25', 'https://images.unsplash.com/photo-1544441893-675973e31d85', 'Mẹo giặt và là ủi đồ Linen để giữ được độ bền và vẻ đẹp tự nhiên.', 'Linen là chất liệu cao cấp nhưng cần sự chăm sóc đặc biệt, dưới đây là...', '2026-04-05 09:49:15'),
(10, 'Lifestyle', 'Thời trang và môi trường: Hành trình sống xanh cùng H&Q', '2026-06-30', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 'Chúng tôi đang chuyển dịch sang sử dụng 100% bao bì tự hủy sinh học.', 'H&Q cam kết giảm thiểu rác thải nhựa trong quy trình sản xuất và đóng gói...', '2026-04-05 09:49:15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_code` varchar(255) DEFAULT NULL,
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
(1, 'AirSense Áo Blazer', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477704/item/vngoods_69_477704_3x4.jpg', 'Lấy cảm hứng từ phong cách thời trang học đường, chiếc áo khoác sáng tạo này kết hợp chất liệu nhẹ nhàng của UNIQLO với điểm nhấn da.', 1, 1),
(2, 'AirSense Áo Khoác | Vải Wool-like | Họa Tiết', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/468671/item/vngoods_05_468671_3x4.jpg', 'Chất liệu cực kỳ thoải mái, gọn nhẹ, co giãn và mau khô, do Toray và UNIQLO phát triển.', 1, 1),
(3, 'AirSense Áo Khoác | Vải Wool-like', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/448034/item/vngoods_08_448034_3x4.jpg', 'Chất vải nhẹ, co giãn, khô nhanh, được đồng phát triển với Toray, mang lại sự thoải mái tối ưu.', 1, 2),
(4, 'Áo Khoác Kiểu Sơ Mi Vải Cotton Linen', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/482443/item/vngoods_30_482443_3x4.jpg', 'Combines the texture of linen and natural cotton for comfort.', 1, 1),
(5, 'Áo Khoác Dáng Relax', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483836/item/vngoods_09_483836_3x4.jpg', 'Cotton-nylon twill fabric with a fine weave for a lightweight, refined impression. Finished with a washed effect for a casual look.', 1, 1),
(6, 'Áo Khoác Harrington', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484610/item/vngoods_09_484610_3x4.jpg', 'Vải dày dặn với các sợi dọc và sợi ngang khác nhau tạo nên những nếp nhăn tự nhiên, mang lại vẻ thanh lịch, phom dáng vừa vặn và chất liệu mềm mại.', 1, 1),
(7, 'Áo Khoác Coach', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484663002/item/vngoods_55_484663002_3x4.jpg', 'Peanuts - bộ truyện tranh nổi tiếng toàn cầu được ra đời năm 1950 bởi tác giả Charles Schulz, đã được dịch sang 25 ngôn ngữ và đăng tải trên hơn 2,600 tờ báo tại 75 quốc gia. Những nhân vật quen thuộc như Charlie Brown, chú chó Snoopy và nhóm bạn cùng nhau vui đùa, phiêu lưu và mang đến những bài học sâu sắc về tình bạn và cuộc sống.', 1, 1),
(8, 'Áo Khoác Blouson Kéo Khóa', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484249/item/vngoods_32_484249_3x4.jpg', 'JW ANDERSON logo on the front slide fastener and left front hem.', 1, 1),
(9, 'Áo Khoác Hai Mặt', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/482216/item/vngoods_09_482216_3x4.jpg', 'Lớp phủ chống bám nước, giúp bảo vệ bạn khỏi những cơn mưa nhỏ.* *Bề mặt vải được phủ một chất chống bám nước, giúp tăng hiệu quả chống thấm nước. Khả năng chống bám nước của lớp phủ là không vĩnh viễn.', 1, 1),
(10, 'Áo Khoác Kiểu Sơ Mi Vải Linen Cao Cấp', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483829/item/vngoods_04_483829_3x4.jpg', 'Chi Tiết\r\n- Slightly relaxed silhouette for a comfortable fit.\r\n\r\nChi tiết về chức năng\r\n- Dáng: Dáng thoải mái\r\n- Túi: Có túi', 1, 1),
(11, 'AIRism Cotton Áo Thun Dáng Rộng | Kẻ Sọc', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484508/item/vngoods_00_484508_3x4.jpg', 'Chi Tiết\r\n- Simple, versatile striped pattern with thin lines.\r\n- The fabric creates a sleek silhouette.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng rộng thoải mái\r\n- Túi: Không túi\r\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra \'Vật liệu\' trên tag giá hoặc nhãn chăm sóc để biết chi tiết.', 2, 1),
(12, 'AIRism Cotton Áo Thun Dáng Rộng | Tay Lỡ', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465185/item/vngoods_17_465185_3x4.jpg', 'Chi Tiết\r\nBộ sưu tập Uniqlo U là thành quả của một đội ngũ nhà thiết kế quốc tế tận tâm và tài năng tại Trung tâm Nghiên cứu và Phát triển Paris dưới sự dẫn dắt của Giám đốc Nghệ thuật, ông Christophe Lemaire.\r\n\r\n- Chất vải “AIRism” trơn mịn với vẻ ngoài bóng mượt như cotton.\r\n- Cổ tròn, ôm nhẹ tạo kiểu dáng gọn gàng, thích hợp cho cả nam và nữ.\r\n- Kiểu dáng thanh lịch với phần vai rủ và phom dáng rộng rãi.\r\n- Phù hợp với phong cách ngày thường hoặc thanh lịch.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng rộng thoải mái\r\n- Túi: Không túi\r\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra “Vật liệu” trên tag giá hoặc nhãn chăm sóc để biết chi tiết.', 2, 1),
(13, 'AIRism Cotton Áo Thun', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/487505/item/vngoods_00_487505_3x4.jpg', 'Chi Tiết\r\n\r\n- The fabric creates a sleek silhouette.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng thoải mái\r\n- Túi: Không túi\r\n\r\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra \'Vật liệu\' trên tag giá hoặc nhãn chăm sóc để biết chi tiết.', 2, 1),
(14, 'Áo Thun Vải Cotton Cổ Tròn', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484080/item/vngoods_00_484080_3x4.jpg', 'Chi Tiết\r\n\r\n- Perfect for layering or wearing on its own.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng thoải mái\r\n- Túi: Không túi\r\n\r\n- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.\r\n\r\nChất liệu / Cách chăm sóc\r\n\r\nVải\r\n100% Bông\r\n\r\nHướng dẫn giặt\r\nGiặt máy nước lạnh, Không giặt khô, Sấy khô ở nhiệt độ thấp', 2, 1),
(15, 'Áo Thun Vải Dry Waffle Cổ Henley', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483924/item/vngoods_00_483924_3x4.jpg', 'Chi Tiết\r\n\r\n- Henley neck looks great alone or layered.\r\n- Versatile regular fit.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Xuyên thấu nhẹ (Chỉ 01 OFF WHITE xuyên thấu nhẹ )\r\n- Dáng: Dáng thoải mái\r\n- Túi: Không túi', 2, 1),
(16, 'Áo Len Milano Vải Gân Có Thể Giặt Máy', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/453754/item/vngoods_10_453754_3x4.jpg', 'Chi Tiết\r\n\r\n- Phù hợp cho môi trường công sở và ngày thường.\r\n\r\n- Quần áo sử dụng vật liệu tái chế là một phần trong nỗ lực của chúng tôi nhằm hỗ trợ giảm thiểu chất thải và sử dụng vật liệu mới. Tỷ lệ vật liệu tái chế khác nhau tùy theo từng sản phẩm. Vui lòng kiểm tra “Vật liệu” trên tag giá hoặc nhãn chăm sóc để biết chi tiết.', 3, 1),
(17, 'Áo Polo Dệt Kim Có Thể Giặt Máy', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476997/item/vngoods_54_476997_3x4.jpg', 'Chi Tiết\r\n\r\n- Chất liệu vải jersey trơn.\r\n- Phù hợp cho cả phong cách công sở và thường ngày, dễ dàng kết hợp với mọi loại quần.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu (Chỉ 02 LIGHT GRAY xuyên thấu nhẹ )\r\n- Dáng: Dáng suông\r\n- Túi: Không túi', 3, 1),
(18, 'Áo Len Vải Pha Cotton Có Thể Giặt Máy', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484852/item/vngoods_54_484852_3x4.jpg', 'Chi Tiết\r\n\r\n- Casual raglan sleeves in a moderately thick high-gauge fabric, perfect for layering under outerwear. Perfect for seasonal wear.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu (Chỉ 02 LIGHT GRAY xuyên thấu nhẹ )\r\n- Dáng: Dáng suông\r\n- Túi: Không túi', 3, 1),
(19, 'Áo Polo Len Cotton Mềm | Kẻ Sọc', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484503/item/vngoods_69_484503_3x4.jpg', 'Chi Tiết\r\n\r\n- Collared design for a distinctive style point.\r\n- Relaxed silhouette.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng thoải mái\r\n- Túi: Không túi', 3, 1),
(20, 'Áo Polo Len Cotton Mềm', 'H&Q', 'bg-[#9bdc28]', 'hover:bg-[#9bdc28]', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/482971/item/vngoods_09_482971_3x4.jpg', 'Chi Tiết\r\n\r\n- Collared design for a distinctive style point.\r\n- Relaxed silhouette.\r\n\r\nChi tiết về chức năng\r\n- Độ xuyên thấu: Không xuyên thấu\r\n- Dáng: Dáng thoải mái\r\n- Túi: Không túi', 3, 1);

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
(3, 2, 'S', 'Đen', 10000.00, 100, 'HQ-AT-B-S'),
(4, 2, 'M', 'Đen', 250000.00, 80, 'HQ-AT-B-M'),
(5, 3, '30', 'Xanh Indigo', 650000.00, 40, 'HQ-QJ-I-30'),
(6, 3, 'M', 'Xanh Indigo', 650000.00, 25, 'HQ-QJ-I-32'),
(7, 4, 'M', 'Be', 520000.00, 40, 'HQ-CT-BE-M'),
(8, 4, 'L', 'Be', 520000.00, 30, 'HQ-CT-BE-L'),

(9, 5, 'M', 'Xám', 600000.00, 35, 'HQ-RX-G-M'),
(10, 5, 'L', 'Xám', 600000.00, 20, 'HQ-RX-G-L'),

(11, 6, 'M', 'Nâu', 700000.00, 25, 'HQ-HR-BR-M'),
(12, 6, 'L', 'Nâu', 700000.00, 15, 'HQ-HR-BR-L'),

(13, 7, 'M', 'Xanh Navy', 650000.00, 50, 'HQ-CC-N-M'),
(14, 7, 'L', 'Xanh Navy', 650000.00, 40, 'HQ-CC-N-L'),

(15, 8, 'M', 'Đen', 720000.00, 45, 'HQ-BL-B-M'),
(16, 8, 'L', 'Đen', 720000.00, 30, 'HQ-BL-B-L'),

(17, 9, 'M', 'Xám', 800000.00, 20, 'HQ-RV-G-M'),
(18, 9, 'L', 'Xám', 800000.00, 15, 'HQ-RV-G-L'),

(19, 10, 'M', 'Trắng', 550000.00, 25, 'HQ-LN-W-M'),
(20, 10, 'L', 'Trắng', 550000.00, 20, 'HQ-LN-W-L'),

(21, 11, 'M', 'Kẻ sọc', 250000.00, 60, 'HQ-TS-ST-M'),
(22, 11, 'L', 'Kẻ sọc', 250000.00, 50, 'HQ-TS-ST-L'),

(23, 12, 'M', 'Xanh', 230000.00, 70, 'HQ-TS-BL-M'),
(24, 12, 'L', 'Xanh', 230000.00, 60, 'HQ-TS-BL-L'),

(25, 13, 'M', 'Trắng', 200000.00, 80, 'HQ-TS-W-M'),
(26, 13, 'L', 'Trắng', 200000.00, 70, 'HQ-TS-W-L'),

(27, 14, 'M', 'Đen', 180000.00, 90, 'HQ-CT-B-M'),
(28, 14, 'L', 'Đen', 180000.00, 85, 'HQ-CT-B-L'),

(29, 15, 'M', 'Be', 220000.00, 60, 'HQ-HL-BE-M'),
(30, 15, 'L', 'Be', 220000.00, 50, 'HQ-HL-BE-L'),

(31, 16, 'M', 'Xám', 400000.00, 40, 'HQ-MI-G-M'),
(32, 16, 'L', 'Xám', 400000.00, 30, 'HQ-MI-G-L'),

(33, 17, 'M', 'Trắng', 350000.00, 50, 'HQ-PL-W-M'),
(34, 17, 'L', 'Trắng', 350000.00, 40, 'HQ-PL-W-L'),

(35, 18, 'M', 'Xanh', 380000.00, 45, 'HQ-CT-BL-M'),
(36, 18, 'L', 'Xanh', 380000.00, 35, 'HQ-CT-BL-L'),

(37, 19, 'M', 'Kẻ sọc', 360000.00, 55, 'HQ-PL-ST-M'),
(38, 19, 'L', 'Kẻ sọc', 360000.00, 45, 'HQ-PL-ST-L'),

(39, 20, 'M', 'Xanh Navy', 370000.00, 50, 'HQ-PL-N-M'),
(40, 20, 'L', 'Xanh Navy', 370000.00, 40, 'HQ-PL-N-L');

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
(2, 3, 2, 4, 'Chất vải đẹp nhưng hơi ôm quá so với mình.', '2026-04-05 06:20:49'),
(3, 1, 2, 5, 'Chất lượng vải tuyệt vời, mặc rất thoải mái.', '2026-04-08 02:50:33'),
(4, 2, 3, 4, 'Áo đẹp nhưng giao hàng hơi chậm một chút.', '2026-04-08 02:50:33'),
(5, 3, 1, 3, 'Màu sắc hơi khác so với ảnh trên web, nhưng vẫn ổn.', '2026-04-08 02:50:33'),
(6, 1, 4, 5, 'Sản phẩm rất đáng tiền, sẽ tiếp tục ủng hộ shop.', '2026-04-08 02:50:33'),
(7, 2, 2, 2, 'Size hơi nhỏ so với mô tả, mọi người nên cân nhắc tăng 1 size.', '2026-04-08 02:50:33');

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
(3, '$2a$11$2eSdcFbMEOrxj8p50vjv.eC8OdmxBnA24TVP1KYc/8F4PXQl8.CpO', 'vietanh@gmail.com', 'Customer', 'local', NULL, 'Diêm Việt Anh', '0900000003', 'Hà Nội', NULL, 1, '2026-04-05 06:20:49'),
(4, '$2a$11$ne2nAQEV8.sekykzIQ8BJ.qEJaz9FcnTIzRObfp1CoSwAfMbU3Q6W', 'diema448@gmail.com', 'Customer', 'google', '104884167290364105829', 'Diêm Việt Anh', NULL, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLHZKCZ0cWLxikxVdSzqJ7qSoORzATbHfxtSYNMH0Bi9_EhxwYF=s96-c', 1, '2026-04-05 06:51:58'),
(5, '$2a$11$5sAC6yhhcVwa8WfLK.oKFOnHidkT3uaWFUfRqj5GB7YNACOfxyl/e', 'diema447@gmail.com', 'Customer', 'local', NULL, 'Diêm Anh', NULL, NULL, NULL, 1, '2026-04-05 13:47:23'),
(6, '$2a$11$x09VDjSr2U90T.Uo4N3sT.C0GDk6pAoEBBbZi/43f/mNDxQidRAXe', 'diema4489@gmail.com', 'Customer', 'local', NULL, 'Diêm Anh', NULL, NULL, NULL, 1, '2026-04-06 07:11:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL COMMENT 'Liên kết với biến thể cụ thể để biết Size và Color',
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `variant_id`, `added_at`) VALUES
(1, 3, 1, '2026-04-06 11:06:14'),
(2, 3, 3, '2026-04-06 11:06:14');

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
-- Chỉ mục cho bảng `faqs`
--
ALTER TABLE `faqs`
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
-- Chỉ mục cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_wishlist_variant` (`user_id`,`variant_id`),
  ADD KEY `fk_wishlist_variant` (`variant_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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

--
-- Các ràng buộc cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `fk_wishlist_user_new` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_wishlist_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# 📘 Software Requirement Specification (SRS)
## Chức năng: Duyệt danh mục & Tìm kiếm sản phẩm (Product Catalog)
**Mã chức năng:** PROD-01  
**Trạng thái:** Review  
**Người soạn thảo:** [Diêm Việt Anh]
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp giao diện cho phép người dùng xem danh sách toàn bộ sản phẩm hoặc lọc theo danh mục (Áo, Quần, Phụ kiện). Hệ thống hỗ trợ tìm kiếm theo tên và bộ lọc thông minh theo thuộc tính thời trang (Giá, Size, Màu).

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang chủ hoặc trang "Cửa hàng" | Hiển thị danh sách sản phẩm mới nhất (từ bảng `products`). |
| 2 | Chọn một danh mục (ví dụ: "Áo sơ mi") | Lọc sản phẩm theo `category_id`. |
| 3 | Nhập từ khóa vào thanh tìm kiếm | Tìm kiếm sản phẩm theo tên (`name`) hoặc mô tả (`description`). |
| 4 | Sử dụng bộ lọc (Size, Màu, Khoảng giá) | Truy vấn bảng `product_variants` để lọc các mẫu khớp yêu cầu. |
| 5 | Thay đổi kiểu sắp xếp (Giá tăng/giảm, Mới nhất) | Sắp xếp lại danh sách hiển thị dựa trên giá hoặc ngày tạo. |
| 6 | Nhấn vào một sản phẩm | Điều hướng tới trang chi tiết sản phẩm (`SRS_PRODUCT_DETAIL.MD`). |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu hiển thị trên Card sản phẩm
* **Tên sản phẩm:** Từ bảng `products`.
* **Ảnh đại diện:** Lấy ảnh đầu tiên từ bảng `product_variants` hoặc `product_images`.
* **Giá hiển thị:** Lấy giá thấp nhất (`MIN(price)`) từ bảng `product_variants`.
* **Nhãn danh mục:** Tên danh mục từ bảng `categories`.

#### 3.2. Logic bộ lọc (Filtering Logic)
* **Theo Size:** Lọc những sản phẩm có ít nhất một biến thể trong bảng `product_variants` khớp với size đã chọn.
* **Theo Màu:** Lọc theo cột `color` trong bảng `product_variants`.
* **Theo Giá:** Lọc theo khoảng giá người dùng kéo thanh Slider.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Phân trang (Pagination):** Không tải toàn bộ sản phẩm cùng lúc. Mặc định hiển thị 12-20 sản phẩm/trang.
* **Hiệu năng:** Sử dụng `Include` (Eager Loading) trong Entity Framework một cách hợp lý để tránh lỗi N+1 khi lấy dữ liệu từ bảng liên quan.
* **SEO Friendly:** Sử dụng `slug` (ví dụ: `/san-pham/ao-somi-nam-hq`) thay vì `id` đơn thuần trên URL.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Không tìm thấy kết quả** | Hiển thị thông báo: "Rất tiếc, không tìm thấy sản phẩm nào khớp với tìm kiếm của bạn". |
| **Sản phẩm hết hàng** | Vẫn hiển thị sản phẩm nhưng có nhãn "Hết hàng" (nếu tổng `stock_quantity` của các biến thể = 0). |
| **Lỗi tải dữ liệu** | Hiển thị "Skeleton Screen" (khung ảnh mờ) trong lúc chờ API phản hồi. |

### 6. Giao diện (UI/UX)
* **Grid View:** Hiển thị dạng lưới (2 cột trên Mobile, 4 cột trên Desktop).
* **Sidebar Filter:** Bộ lọc nằm bên trái trên Desktop và ẩn vào nút "Filter" trên Mobile.
* **Quick View:** (Tùy chọn) Cho phép xem nhanh thông tin khi di chuột vào ảnh.


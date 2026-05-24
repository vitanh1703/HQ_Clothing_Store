# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý sản phẩm (Product Management)
**Mã chức năng:** ADM-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Đặng Thị Quỳnh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ Quản lý sản phẩm cung cấp giao diện dành riêng cho Ban quản trị (Admin) để thực hiện các thao tác thêm mới, chỉnh sửa, xóa và cập nhật danh mục hàng hóa trên hệ thống. Tính năng này được thiết kế để quản lý tập trung thông tin sản phẩm (`products`) và liên kết chặt chẽ với phân hệ quản lý kho (`product_variants`) nhằm đảm bảo dữ liệu luôn đồng bộ và chính xác.

---

### 2. Luồng nghiệp vụ (User Workflow) - Thêm mới sản phẩm

| Bước | Hành động của Admin | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập Dashboard Admin > "Sản phẩm" | Gọi API `GET /api/admin/products`. Hiển thị danh sách sản phẩm hiện có (có phân trang). |
| 2 | Nhấn "Thêm sản phẩm mới" | Mở Form nhập liệu. Fetch danh sách `categories` và `suppliers` để load vào các Dropdown. |
| 3 | Nhập thông tin cơ bản | Điền Tên, Thương hiệu (`brand_text`), Mô tả và dán Link ảnh URL (`image_url`). |
| 4 | Chọn Danh mục & Nhà cung cấp | Liên kết Khóa ngoại `category_id` và `supplier_id`. |
| 5 | Nhấn "Lưu sản phẩm" | Backend nhận payload, kiểm tra Validation. Insert vào bảng `products` và trả về thông báo thành công. |
| 6 | Xóa/Ẩn sản phẩm | Nhấn nút "Xóa", hệ thống sẽ kiểm tra xem sản phẩm có nằm trong đơn hàng nào không. Nếu hợp lệ, thực hiện xóa Cascade. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Form Inputs)
* **Tên sản phẩm (`name`):** `string` (max 200), bắt buộc.
* **Thương hiệu (`brand_text`):** `string` (max 50), mặc định là 'H&Q'.
* **Mô tả (`description`):** `text`, hỗ trợ nhập nội dung chi tiết hoặc mã HTML.
* **Danh mục (`category_id`):** `int`, bắt buộc chọn từ bảng `categories`.
* **Nhà cung cấp (`supplier_id`):** `int`, chọn từ bảng `suppliers`.
* **Ảnh đại diện (`image_url`):** `text`, chứa URL ảnh trực tiếp từ CDN hoặc Hosting tĩnh.

#### 3.2. Dữ liệu lưu trữ (Bảng `products`)
* Lưu thông tin gốc của sản phẩm. Việc quản lý giá (`price`), size, màu sắc và tồn kho sẽ được xử lý riêng rẽ ở bảng `product_variants` để đảm bảo tính linh hoạt (như đã mô tả trong `SRS_INVENTORY_MANAGEMENT.MD`).

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Phân quyền truy cập (Authorization):** Toàn bộ API CRUD của sản phẩm (như `POST /api/admin/products`) phải được bảo vệ bởi middleware xác thực JWT Token, yêu cầu User phải có role là `Admin` hoặc `Staff`.
* **Toàn vẹn khóa ngoại:** Không thể tạo sản phẩm nếu `category_id` không tồn tại.
* **Xóa Cascade:** Khi sản phẩm bị xóa, toàn bộ Biến thể (`product_variants`), Đánh giá (`reviews`) và dữ liệu Yêu thích (`wishlist`) liên quan sẽ bị xóa sạch khỏi Database.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Thiếu dữ liệu bắt buộc (Tên, Danh mục)** | Cảnh báo đỏ tại giao diện Frontend, ngăn không cho gửi Request. Backend trả về `400 Bad Request` nếu bị bypass. |
| **Xóa sản phẩm đang nằm trong Đơn hàng** | Ràng buộc `ON DELETE CASCADE` ở bảng `order_items` KHÔNG ĐƯỢC thiết lập. Thay vào đó, nếu sản phẩm có trong đơn hàng, hệ thống từ chối xóa và hiển thị: "Không thể xóa do sản phẩm đã phát sinh giao dịch." |
| **URL Hình ảnh bị lỗi** | Frontend sử dụng hình ảnh Placeholder (No-Image) mặc định nếu thẻ `<img>` gặp sự kiện `onError`. |

---

### 6. Giao diện (UI/UX)
* **Danh sách (Product DataGrid):** Bảng hiển thị thông minh với các cột Tên, Hình ảnh Mini, Danh mục, Thương hiệu. Hỗ trợ tìm kiếm theo Tên sản phẩm.
* **Form Thêm/Sửa (Modal/Drawer):** Sử dụng các Select Dropdown để chọn Category và Supplier. Box mô tả sử dụng Textarea đa dòng.
* **Nút liên kết (Quick Actions):** Trong bảng danh sách, mỗi sản phẩm sẽ có một nút "Quản lý biến thể" dẫn thẳng sang màn hình quản lý Size/Màu/Tồn kho của sản phẩm đó.

---
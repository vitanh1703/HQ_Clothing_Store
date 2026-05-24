# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý Kho hàng, Biến thể & Nhà cung cấp (Inventory Management)
**Mã chức năng:** INV-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Nguyễn Thị Hảo  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ cung cấp các công cụ thiết yếu cho Quản trị viên (Admin) và Nhân viên (Staff) để quản lý toàn diện danh sách sản phẩm, phân loại danh mục, thông tin nhà cung cấp và kiểm soát chặt chẽ số lượng tồn kho thực tế. Hệ thống cho phép bóc tách chi tiết đến từng biến thể (SKU - Size, Màu sắc, Giá bán riêng biệt) nhằm đảm bảo dữ liệu bán hàng trên website luôn minh bạch và chính xác.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Quản lý Nhà cung cấp & Danh mục | Admin thêm/sửa/xóa thông tin trong bảng `suppliers` và `categories`. |
| 2 | Thêm mới Sản phẩm gốc | Nhập thông tin chung (Tên, Thương hiệu `brand_text`, Mô tả, `image_url`), liên kết với Danh mục và Nhà cung cấp. |
| 3 | Cấu hình Biến thể (Variants) | Với mỗi sản phẩm, Admin thêm các dòng cấu hình biến thể (Size S/M/L, Màu sắc, Giá bán, Mã SKU). |
| 4 | Cập nhật số lượng (Nhập kho) | Admin thiết lập `stock_quantity` ban đầu hoặc cộng dồn khi có đợt nhập hàng mới. |
| 5 | Điều chỉnh/Chỉnh sửa | Cập nhật lại giá hoặc sửa tên biến thể nếu có sai sót. |
| 6 | Kiểm kê (Cảnh báo tồn kho) | Dashboard tự động highlight/cảnh báo các SKU có `stock_quantity` < 5 để Admin kịp thời Restock. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu Bảng `products` & `product_variants`
* **`products`:** Gồm `name`, `brand_text` (Mặc định 'H&Q'), `image_url`, `description`, `category_id` và `supplier_id`.
* **`product_variants`:** Gồm `size`, `color`, `price`, `stock_quantity` và `sku` (Khóa duy nhất - Unique Key).

#### 3.2. Ràng buộc toàn vẹn Dữ liệu (Database Constraints)
* **Tồn kho:** `stock_quantity` có Constraint `CHECK (stock_quantity >= 0)` dưới Database để đảm bảo kho không bao giờ bị âm.
* **Ràng buộc Xóa (Cascade/Set Null):**
  * Khi xóa `Category` hoặc `Supplier` -> `products.category_id` / `supplier_id` sẽ chuyển thành `NULL` (Tránh mất dữ liệu sản phẩm lịch sử).
  * Khi xóa `Product` -> Toàn bộ `product_variants`, `reviews` và `wishlist` liên quan sẽ bị xóa theo (Cascade).

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Phân quyền:** Chỉ `Admin` và `Staff` mới có quyền truy cập các API `/api/admin/*`.
* **Giá biến thể linh hoạt:** Hệ thống cho phép setup giá độc lập cho từng biến thể (Ví dụ: Size XXL có thể đắt hơn Size S của cùng 1 sản phẩm).
* **Quản lý ảnh:** URL ảnh đại diện của sản phẩm được lưu ở `image_url` dạng text/link.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Nhập số lượng tồn kho âm** | Bị chặn ngay từ Frontend và cả mức Database (`CHECK stock_quantity >= 0`). |
| **Nhập trùng mã SKU** | Catch Exception từ MySQL (Lỗi Duplicate Key), trả về API response `400 Bad Request` kèm câu thông báo: "Mã SKU này đã tồn tại trong hệ thống." |
| **Khách hàng đặt ngay lúc Admin đang chỉnh kho** | Nếu khách vừa đặt thành công, Background Service và EF Core Transaction sẽ kiểm tra kỹ. Nếu kho vô tình bị sửa về 0, đơn hàng của khách sẽ bị chặn lại ở phút chót. |

---

### 6. Giao diện (UI/UX)
* **Bảng dữ liệu (Data Table):** Sử dụng Table để hiển thị danh sách, hỗ trợ phân trang (Pagination), lọc theo danh mục hoặc sắp xếp theo số lượng kho tăng/giảm dần.
* **Modal Thêm/Sửa Biến Thể:** Giao diện Form linh hoạt (Dynamic Form) cho phép Admin click "Thêm phân loại" để add nhanh nhiều Size/Color cùng lúc.
* **Hiển thị Huy hiệu (Badge):** Nếu `stock_quantity == 0`, label hiển thị "🔴 Hết hàng". Nếu `< 10`, hiển thị "🟡 Sắp hết".

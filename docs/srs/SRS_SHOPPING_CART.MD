# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý giỏ hàng (Shopping Cart)
**Mã chức năng:** SALE-01  
**Trạng thái:** Review  
**Người soạn thảo:** [Đặng Thị Quỳnh]  
**Vai trò:** Developer
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp nơi lưu trữ tạm thời các sản phẩm biến thể (Size/Màu) mà khách hàng dự định mua. Hệ thống hỗ trợ cập nhật số lượng, xóa sản phẩm và tự động tính toán tổng giá trị tạm tính trước khi tiến hành thanh toán.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn "Thêm vào giỏ" từ trang Chi tiết | API `/api/cart/add` kiểm tra nếu đã có `variant_id` thì tăng số lượng, nếu chưa thì thêm mới vào `cart_items`. |
| 2 | Truy cập trang Giỏ hàng (`/cart`) | Truy vấn bảng `carts` JOIN `cart_items` và `product_variants` để hiển thị danh sách. |
| 3 | Thay đổi số lượng (Tăng/Giảm) | Kiểm tra `stock_quantity`. Nếu hợp lệ, cập nhật và tính lại `Subtotal`. |
| 4 | Xóa sản phẩm khỏi giỏ | Loại bỏ bản ghi tương ứng trong bảng `cart_items`. |
| 5 | Nhấn "Thanh toán" | Kiểm tra lại tồn kho lần cuối trước khi chuyển sang trang `/checkout`. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu hiển thị (Mapping)
* **Sản phẩm:** Tên mẫu áo, Ảnh biến thể, Size, Màu sắc.
* **Đơn giá:** Lấy `price` hiện tại từ bảng `product_variants`.
* **Số lượng:** Cột `quantity` trong bảng `cart_items`.
* **Thành tiền:** `price * quantity`.

#### 3.2. Logic tính toán (Calculation Logic)
* **Tổng tiền tạm tính:** Tổng cộng thành tiền của tất cả các dòng trong giỏ.
* **Kiểm tra tồn kho:** Nếu khách hàng tăng số lượng vượt quá `stock_quantity`, hệ thống phải cảnh báo và chặn hành động tăng.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Lưu trữ:** * Với khách đã đăng nhập: Lưu vào bảng `carts` trong MySQL.
    * Với khách vãng lai: (Tùy chọn) Lưu vào `LocalStorage` và đồng bộ vào DB ngay khi họ Login.
* **Hiệu suất:** Cập nhật giỏ hàng bằng **AJAX/Axios** để tránh load lại toàn bộ trang.
* **Tính nhất quán:** Nếu giá sản phẩm trong bảng `product_variants` thay đổi, giá trong giỏ hàng cũng phải cập nhật theo (vì khách chưa thanh toán).

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Sản phẩm bị Admin xóa** | Tự động loại bỏ sản phẩm khỏi giỏ hàng của khách và thông báo: "Một số sản phẩm không còn tồn tại đã bị xóa khỏi giỏ". |
| **Hết hàng khi đang xem giỏ** | Hiển thị nhãn "Hết hàng" và vô hiệu hóa nút "Thanh toán". |
| **Giỏ hàng trống** | Hiển thị nút "Tiếp tục mua sắm" dẫn về trang Catalog. |
| **Số lượng nhập âm/không phải số** | Tự động reset về 1 và cảnh báo người dùng. |

### 6. Giao diện (UI/UX)
* **Mini Cart:** Một giỏ hàng nhỏ hiện ra khi di chuột vào icon giỏ hàng trên Navbar.
* **Empty State:** Hình ảnh minh họa dễ thương kèm thông báo khi giỏ hàng chưa có đồ.
* **Summary Box:** Cột bên phải hiển thị Tổng tiền, Phí ship dự kiến và nút "Thanh toán" nổi bật.


# 📘 Software Requirement Specification (SRS)
## Chức năng: Thanh toán & Tạo đơn hàng (Checkout & Payment)
**Mã chức năng:** SALE-02  
**Trạng thái:** Review  
**Người soạn thảo:** [ Diêm Việt Anh]  
**Vai trò:** Developer
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Xác nhận danh sách sản phẩm cuối cùng, thông tin giao hàng và phương thức thanh toán. Hệ thống thực hiện chốt giá, áp dụng khuyến mãi, tạo đơn hàng và trừ số lượng tồn kho tương ứng trong bảng biến thể.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn "Thanh toán" từ Giỏ hàng | Chuyển hướng tới trang `/checkout`, hiển thị tóm tắt đơn hàng. |
| 2 | Nhập/Chọn địa chỉ giao hàng | Lấy địa chỉ mặc định từ `users` hoặc cho phép nhập địa chỉ mới. |
| 3 | Nhập mã giảm giá (nếu có) | Kiểm tra bảng `promotions`, tính lại `total_amount`. |
| 4 | Chọn phương thức thanh toán | Lựa chọn: COD (Tiền mặt) hoặc Chuyển khoản/VNPay. |
| 5 | Nhấn "Đặt hàng" | API thực hiện: Kiểm tra kho -> Trừ kho -> Tạo `orders` & `order_items` -> Xóa `cart_items`. |
| 6 | Hoàn tất đơn hàng | Hiển thị trang "Cảm ơn" kèm Mã đơn hàng và link theo dõi. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `orders` & `order_items`)
* **`orders`**: Lưu `user_id`, `total_amount`, `shipping_address`, `status` (mặc định là 'Pending').
* **`order_items`**: Lưu `variant_id`, `quantity` và **`price_at_purchase`** (Giá tại thời điểm chốt đơn).
* **`promotions`**: Lưu ID mã giảm giá đã áp dụng để đối soát sau này.

#### 3.2. Logic nghiệp vụ (Business Logic)
* **Chốt giá:** Giá sản phẩm trong đơn hàng phải cố định, không thay đổi ngay cả khi Shop tăng giá sản phẩm sau đó.
* **Trừ tồn kho:** Giảm `stock_quantity` trong bảng `product_variants` tương ứng với số lượng khách mua.
* **Xóa giỏ hàng:** Sau khi đặt hàng thành công, giỏ hàng của người dùng đó phải được làm trống.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Atomic Transaction:** Sử dụng `IDbContextTransaction` trong EF Core để đảm bảo nếu tạo đơn hàng lỗi thì kho không bị trừ và ngược lại.
* **Concurrency:** Xử lý trường hợp 2 người cùng mua món hàng cuối cùng (sử dụng Optimistic Concurrency hoặc khóa hàng tạm thời).
* **Bảo mật:** Validate lại toàn bộ giá tiền ở Backend, không tin tưởng dữ liệu tổng tiền gửi lên từ Frontend.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Hết hàng ngay lúc bấm Đặt** | Thông báo: "Rất tiếc, sản phẩm [Tên] vừa hết hàng. Vui lòng cập nhật lại giỏ hàng". |
| **Mã giảm giá hết hạn** | Thông báo: "Mã giảm giá không còn hiệu lực" và yêu cầu thanh toán giá gốc. |
| **Thanh toán Online thất bại** | Chuyển trạng thái đơn hàng thành "Chờ thanh toán" và gửi link thanh toán lại cho khách. |
| **Thông tin giao hàng trống** | Báo đỏ các trường bắt buộc: "Vui lòng nhập số điện thoại và địa chỉ nhận hàng". |

### 6. Giao diện (UI/UX)
* **Order Summary:** Hiển thị danh sách ảnh nhỏ các món đồ, phí ship và số tiền giảm giá rõ ràng.
* **Progress Stepper:** (Tùy chọn) Hiển thị các bước: Thông tin -> Thanh toán -> Hoàn tất.
* **Confirmation Email:** (Nếu có) Gửi email tự động xác nhận đơn hàng sau khi hệ thống ghi nhận thành công.


# 📘 Software Requirement Specification (SRS)
## Chức năng: Thanh toán VNPAY, VietQR & Tạo đơn hàng (Checkout & Payment)
**Mã chức năng:** PAY-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Diêm Việt Anh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Đây là phân hệ cốt lõi xử lý giao dịch tài chính của hệ thống. Khách hàng sau khi chốt giỏ hàng sẽ chuyển sang trang Thanh toán (`CheckoutPage`). Tại đây, hệ thống tính toán tổng tiền (áp dụng mã giảm giá), ghi nhận thông tin giao hàng và cho phép thanh toán qua 3 hình thức: **COD (Tiền mặt)**, **Chuyển khoản (VietQR)**, và cổng thanh toán **VNPAY Sandbox**.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn "Thanh toán" từ Giỏ hàng | Frontend (React Router) truyền `state` giỏ hàng sang `/checkout`. Hiển thị form nhập thông tin (Họ tên, Email, SĐT, Địa chỉ). |
| 2 | Áp dụng mã giảm giá | Người dùng nhập hoặc chọn mã. API `/api/promotions/validate` kiểm tra điều kiện và trả về số tiền được giảm (`Percentage` hoặc `FixedAmount`). |
| 3 | Chọn phương thức thanh toán | Có 3 tùy chọn (Radio buttons): Chuyển khoản QR, Thanh toán VNPAY, Thanh toán khi nhận hàng (COD). |
| 4 | Nhấn "Hoàn tất thanh toán" | Gọi API `/api/orders/create`. Backend lưu vào bảng `orders` (trạng thái `Pending`), `order_items` (lưu `price_at_purchase`). |
| 5 | Xử lý Redirect (Theo phương thức) | - **VNPAY:** Gọi `/api/payment/create-payment` sinh URL và Redirect sang cổng VNPAY.<br>- **VietQR:** Chuyển sang `/payment` render mã QR.<br>- **COD:** Thông báo thành công và về Trang chủ. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `orders` & `order_items`)
* **`orders`**: 
  * `order_code`: Mã đơn hàng hệ thống tự sinh (VD: `HQ2604100902115`).
  * `total_amount`: Tổng tiền cuối cùng khách phải trả.
  * `status`: `enum('Pending','Shipping','Success','Cancel')`.
  * `payment_date`: Timestamp khi thanh toán thành công qua VNPAY.
* **`order_items`**: Lưu `variant_id`, `quantity` và `price_at_purchase`.

#### 3.2. Logic nghiệp vụ (Business Logic)
* **Tích hợp VNPAY:** Sử dụng `VnPayLibrary` tạo mã `vnp_SecureHash` bằng thuật toán HmacSHA512. Tham số `vnp_Amount` = `total_amount * 100`.
* **VietQR:** Tạo mã QR động chuẩn NAPAS chứa sẵn Số tài khoản, Ngân hàng, Số tiền (`total_amount`) và Nội dung chuyển khoản là `order_code`.

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Tính toàn vẹn dữ liệu:** Không tin tưởng tính toán `totalAmount` từ Frontend. Backend phải tự tính toán lại dựa trên giá Database và `discount_value` của mã giảm giá trước khi gọi VNPAY.
* **IPN (Instant Payment Notification):** Backend phải có API Endpoint (Webhook) để VNPAY gọi về cập nhật `status = 'Shipping'` sau khi giao dịch thành công (để phòng hờ khách tắt trình duyệt giữa chừng).
* **Dọn dẹp đơn rác (Background Job):** Có worker `UnpaidOrdersCleanupService` chạy ngầm lúc 5:00 sáng mỗi ngày, tự động quét các đơn `Pending` quá 24h và chuyển thành `Cancel`, sau đó xóa khỏi CSDL để hoàn lại tồn kho.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Khách tắt trình duyệt lúc đang ở VNPAY** | Đơn hàng vẫn được tạo trong CSDL với trạng thái `Pending`. Background job sẽ tự động hủy đơn sau 24h. |
| **Mã giảm giá (Promo) không hợp lệ** | Bắt Catch Exception từ `/api/promotions/validate`, hiển thị thông báo: "Mã giảm giá không hợp lệ hoặc đã hết hạn" và xóa session. |
| **Form trống thông tin bắt buộc** | Cảnh báo đỏ tại Frontend (Full Name, Email, Phone, Address). Ngăn không cho gọi API. |
| **Lỗi mạng khi gọi VNPAY** | Rollback lại Transaction tạo đơn hàng và thông báo lỗi hệ thống thanh toán đang bảo trì. |

---

### 6. Giao diện (UI/UX)
* **Chia bố cục 2 cột (Grid Layout):** 
  * **Cột trái:** Form điền thông tin cá nhân, danh sách sản phẩm hiển thị dạng List (Có ảnh mini, tên, size, số lượng, giá) và tùy chọn phương thức thanh toán.
  * **Cột phải (Sticky Sidebar):** Tóm tắt (Tạm tính, Khuyến mãi, Phí Ship, Tổng thanh toán) và Nút Đặt hàng bản to đen chữ trắng `HOÀN TẤT THANH TOÁN`.
* **Modal Khuyến mãi (PromoSelectionModal):** Cửa sổ popup cho phép khách hàng nhấn chọn mã thay vì phải gõ tay (Tối ưu trải nghiệm trên thiết bị di động).
* **Hiệu ứng tải (Loading State):** Hiển thị Spinner khi hệ thống đang xử lý Redirect sang VNPay để tránh khách bấm nhiều lần sinh ra 2 đơn.

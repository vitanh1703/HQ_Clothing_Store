# Software Requirement Specification (SRS)

## Chức năng: Giỏ hàng & Đặt hàng (Cart & Checkout)
**Mã chức năng:** CART-03  
**Trạng thái:** Draft / Review  
**Người soạn thảo:** [Diêm Việt Anh]  
**Vai trò:** Project Manager / Developer

---

### 1. Mô tả tổng quan (Description)
Cung cấp quy trình cho phép khách hàng lưu trữ các sản phẩm dự định mua, tính toán giá trị đơn hàng (bao gồm thuế, phí vận chuyển, giảm giá) và thực hiện các bước xác nhận thanh toán để tạo đơn hàng chính thức trên hệ thống.

---

### 2. Luồng nghiệp vụ (User Workflow)
| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn "Thêm vào giỏ" tại trang sản phẩm | Kiểm tra tồn kho, cập nhật số lượng vào giỏ hàng (Local Storage/Database). |
| 2 | Truy cập trang Giỏ hàng | Hiển thị danh sách sản phẩm, cho phép thay đổi số lượng hoặc xóa món hàng. |
| 3 | Nhấn "Thanh toán" | Chuyển sang trang nhập thông tin: Họ tên, SĐT, Địa chỉ giao hàng. |
| 4 | Chọn phương thức vận chuyển & Thanh toán | Tính toán phí ship và hiển thị tổng tiền cuối cùng. |
| 5 | Nhập mã giảm giá (nếu có) | Kiểm tra tính hợp lệ của mã và trừ tiền trực tiếp vào tổng đơn. |
| 6 | Nhấn "Xác nhận đặt hàng" | Tạo đơn hàng trong DB, trừ số lượng tồn kho và gửi email xác nhận. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Input Fields)
* **Thông tin giao hàng:** Họ tên (string), SĐT (number), Địa chỉ (string - hỗ trợ chọn Tỉnh/Thành, Quận/Huyện).
* **Mã giảm giá (Coupon):** `string`, không phân biệt chữ hoa/thường.
* **Phương thức thanh toán:** `radio button` (COD hoặc Chuyển khoản ngân hàng).
* **Ghi chú:** `text`, khách hàng nhắn nhủ thêm cho shop (tùy chọn).

#### 3.2. Dữ liệu lưu trữ (Database - Bảng `orders`, `order_items`)
* `order_id`: primary key (Mã đơn hàng, ví dụ: HQ123456).
* `customer_id`: foreign key liên kết với bảng users.
* `total_amount`: decimal, tổng tiền cuối cùng sau khi trừ khuyến mãi.
* `shipping_fee`: decimal, phí vận chuyển.
* `status`: string (Pending, Confirmed, Shipping, Delivered, Cancelled).
* `payment_method`: string (COD, Bank Transfer).

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Đồng bộ tồn kho:** Phải kiểm tra tồn kho tại 2 thời điểm: Khi khách thêm vào giỏ và Khi khách nhấn "Xác nhận đặt hàng" để tránh trường hợp món hàng bị hết trong lúc khách đang nhập địa chỉ.
* **Tính toán:** Việc tính toán tổng tiền (Subtotal) và phí ship phải được thực hiện ở Server-side để tránh người dùng can thiệp vào giá trị bằng công cụ trình duyệt (Inspect).
* **Session:** Giỏ hàng của khách chưa đăng nhập phải được lưu trữ tối thiểu 7 ngày (sử dụng Cookie hoặc LocalStorage).
* **Giao thức:** Toàn bộ thông tin thanh toán và thông tin cá nhân phải được truyền qua **HTTPS**.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)
* **Trường hợp:** Khách đặt số lượng nhiều hơn tồn kho hiện có.  
    * *Xử lý:* Hiển thị thông báo: "Sản phẩm [Tên] hiện chỉ còn [X] món trong kho, vui lòng điều chỉnh số lượng".
* **Trường hợp:** Mã giảm giá đã hết hạn hoặc không đủ điều kiện (ví dụ: đơn hàng tối thiểu 500k).  
    * *Xử lý:* Hiển thị lỗi: "Mã giảm giá không hợp lệ hoặc chưa đủ điều kiện áp dụng".
* **Trường hợp:** Khách hàng bỏ dở giỏ hàng khi đang thanh toán.  
    * *Xử lý:* Lưu trạng thái giỏ hàng để khách quay lại mua tiếp mà không cần chọn lại từ đầu.

---

### 6. Giao diện (UI/UX)
* **Giỏ hàng mini:** Hiển thị nhanh ở góc màn hình khi khách di chuột vào icon giỏ hàng.
* **Tiến trình thanh toán (Steppers):** Hiển thị rõ ràng các bước: 1. Giỏ hàng -> 2. Thông tin -> 3. Hoàn tất.
* **Mobile-First:** Đảm bảo các nút "Thanh toán" to, dễ bấm trên màn hình cảm ứng.
* **Hiệu ứng:** Hiển thị spinner khi hệ thống đang xử lý mã giảm giá hoặc tạo đơn hàng để tránh khách nhấn nút "Xác nhận" nhiều lần.

---
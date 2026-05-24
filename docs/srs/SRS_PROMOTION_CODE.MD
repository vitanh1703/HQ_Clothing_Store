# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý & Áp dụng mã giảm giá (Promotion Code)
**Mã chức năng:** MKT-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Nguyễn Thị Hảo  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ Khuyến mãi cung cấp cơ chế cho phép Quản trị viên (Admin) tạo các chương trình ưu đãi linh hoạt (Voucher/Coupon) và cho phép Khách hàng áp dụng mã giảm giá vào đơn hàng tại bước Thanh toán (Checkout). Hệ thống tự động đối chiếu điều kiện áp dụng và tính toán số tiền được giảm dựa trên loại giảm giá (Phần trăm hoặc Số tiền cố định).

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang Thanh toán (`/checkout`) | Khách hàng có thể nhập tay mã khuyến mãi vào ô input hoặc nhấn "Chọn mã" để mở `PromoSelectionModal`. |
| 2 | Gửi yêu cầu áp dụng mã | Frontend gọi API `GET /api/promotions/validate` với tham số `code`. |
| 3 | Xác thực điều kiện tại Backend | Hệ thống kiểm tra bảng `promotions`: Sự tồn tại, `status = 1`, `start_date`, `end_date`, `usage_limit > used_count` và `min_order_value`. |
| 4 | Tính toán & Hiển thị trên UI | Nếu hợp lệ, lưu mã vào `sessionStorage`. Frontend tự động tính và hiển thị số tiền được giảm (Discount Amount). |
| 5 | Chốt đơn hàng (Place Order) | Khi gọi API tạo `orders`, Backend lấy mã ra kiểm tra lại lần cuối và tính toán `total_amount` ghi vào CSDL. |
| 6 | Hủy áp dụng (Clear Promo) | Khách hàng nhấn "Xóa mã", hệ thống xóa khỏi `sessionStorage` và hoàn lại tổng tiền gốc. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `promotions`)
* **`code`**: Chuỗi ký tự duy nhất, viết liền, không dấu (Ví dụ: `WELCOME2026`, `FREESHIP`).
* **`description`**: Mô tả ngắn gọn (VD: "Giảm 50k cho đơn hàng đầu tiên").
* **`discount_value`**: Giá trị giảm (Ví dụ: 10% hoặc 50,000đ).
* **`discount_type`**: Kiểu giảm (`Percentage` hoặc `FixedAmount`).
* **`min_order_value`**: Giá trị đơn hàng tối thiểu để được áp dụng mã.
* **`start_date` & `end_date`**: Khoảng thời gian mã có hiệu lực.
* **`usage_limit` & `used_count`**: Kiểm soát số lượt đã dùng so với tổng số lượt cho phép.
* **`status`**: Trạng thái (1: Đang hoạt động, 0: Ngưng áp dụng).

#### 3.2. Logic tính toán (Discount Calculation)
* **Nếu là `Percentage`:** Số tiền giảm = `Math.round((total_amount * discount_value) / 100)`.
* **Nếu là `FixedAmount`:** Số tiền giảm = `Math.min(discount_value, total_amount)` (Giảm tối đa bằng đúng giá trị đơn hàng, không để tổng tiền bị âm).

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Tính duy nhất:** Một đơn hàng chỉ được áp dụng tối đa 01 mã giảm giá.
* **Bảo mật & Tính toàn vẹn:** Việc Frontend tính toán (ở Bước 4) chỉ mang tính chất hiển thị UI (Trải nghiệm người dùng). Khi submit Đặt hàng, Backend **bắt buộc** phải tự truy vấn lại mã và tự tính lại `total_amount` để ngăn chặn hacker can thiệp công cụ DevTools sửa giá trị gửi lên.
* **Session Storage:** Dữ liệu mã giảm giá (kèm mức giảm) được lưu tạm trong trình duyệt (`sessionStorage.setItem("selectedPromo", ...)`) để không bị mất khi khách hàng vô tình F5 trang.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Mã sai, hết hạn hoặc không tồn tại** | API trả về lỗi `400 Bad Request`. Giao diện catch lỗi và hiển thị dòng chữ đỏ: "Mã giảm giá không hợp lệ hoặc đã hết hạn." |
| **Đơn hàng chưa đủ điều kiện (`min_order_value`)** | API trả về thông báo lỗi: "Đơn hàng chưa đạt giá trị tối thiểu để áp dụng mã này." |
| **Khách hàng thay đổi giỏ hàng sau khi nhập mã** | Nếu khách quay lại Giỏ hàng để xóa/sửa bớt sản phẩm làm cho `total_amount` < `min_order_value`, Backend sẽ tự động loại bỏ (Reject) mã khi tiến hành tạo đơn hàng. |

---

### 6. Giao diện (UI/UX)
* **Cửa sổ chọn mã (PromoSelectionModal):** Cung cấp Modal popup cho phép khách hàng nhấn chọn mã trực tiếp thay vì phải ghi nhớ và gõ tay.
* **Khu vực nhập mã (Input Section):** Gồm một ô Input nhập text (Placeholder: "Nhập mã") và nút "Áp dụng" (Nút đen chữ trắng). Nằm phía dưới danh sách sản phẩm.
* **Thẻ thành công (Success Tag):** Khi áp dụng thành công, mã được hiển thị trong một khung màu xanh lá nhạt (Green-50), có viền xanh kèm theo nút "Xóa mã" nhỏ bên cạnh.
* **Hiển thị Tóm tắt (Summary):** Tại cột bên phải (Sidebar Tóm tắt đơn hàng), mục "Giảm giá" sẽ xuất hiện và có màu xanh lục (Ví dụ: `-50.000đ`).

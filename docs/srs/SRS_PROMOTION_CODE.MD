# Software Requirement Specification (SRS)
## Chức năng: Quản lý & Áp dụng mã giảm giá (Promotion Code)
**Mã chức năng:** MKT-01  
**Trạng thái:** Review  
**Người soạn thảo:** [Nguyễn Thị Hảo]  
**Vai trò:** Developer
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp cơ chế cho phép Quản lý tạo các chương trình ưu đãi và cho phép Khách hàng áp dụng mã giảm giá vào đơn hàng. Hệ thống tự động tính toán số tiền được giảm dựa trên loại giảm giá (Phần trăm hoặc Số tiền cố định).

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhập mã tại trang Giỏ hàng/Thanh toán | Gửi request POST tới API `/api/promotions/apply`. |
| 2 | Hệ thống kiểm tra mã (`code`) | Truy vấn bảng `promotions` để kiểm tra sự tồn tại của mã. |
| 3 | Xác thực điều kiện | Kiểm tra: Ngày hiệu lực, Số lần sử dụng, Giá trị đơn hàng tối thiểu. |
| 4 | Tính toán giảm giá | Trừ số tiền tương ứng vào `total_amount` của đơn hàng. |
| 5 | Hiển thị kết quả | Thông báo "Áp dụng thành công" và hiển thị số tiền được giảm. |
| 6 | Hủy áp dụng mã | Cho phép người dùng gỡ mã để nhập mã khác. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `promotions`)
* **`code`**: Chuỗi ký tự duy nhất (Ví dụ: HELLO2026, EPU_SALES).
* **`discount_value`**: Giá trị giảm (Ví dụ: 10% hoặc 50,000đ).
* **`discount_type`**: Kiểu giảm (`Percentage` hoặc `FixedAmount`).
* **`min_order_value`**: Giá trị đơn hàng tối thiểu để được áp dụng mã.
* **`start_date` & `end_date`**: Khoảng thời gian mã có hiệu lực.
* **`usage_limit`**: Tổng số lần mã có thể sử dụng (tránh bị lạm dụng).

#### 3.2. Logic tính toán (Calculation Logic)
* **Nếu là Phần trăm:** `Giảm = Tổng tiền * (discount_value / 100)`. (Nên có thêm `max_discount` để giới hạn số tiền giảm tối đa).
* **Nếu là Số tiền cố định:** `Giảm = discount_value`.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Tính duy nhất:** Một đơn hàng chỉ được áp dụng tối đa 01 mã giảm giá.
* **Bảo mật Backend:** Tuyệt đối không để Frontend tự tính tiền giảm. Backend phải truy vấn DB và tính toán lại toàn bộ trước khi tạo đơn hàng (`orders`).
* **Trạng thái:** Mã chỉ được áp dụng nếu trạng thái đơn hàng là `Pending` (chưa thanh toán/chưa chốt).

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Mã không tồn tại** | Thông báo: "Mã giảm giá không hợp lệ, vui lòng kiểm tra lại". |
| **Mã hết hạn** | Thông báo: "Rất tiếc, mã giảm giá này đã hết hạn sử dụng". |
| **Đơn hàng chưa đủ giá trị** | Thông báo: "Đơn hàng cần tối thiểu [giá trị] để áp dụng mã này". |
| **Hết lượt sử dụng** | Thông báo: "Mã giảm giá đã đạt giới hạn sử dụng tối đa". |

### 6. Giao diện (UI/UX)
* **Promotion Input:** Ô nhập mã nằm ngay cạnh phần Tổng tiền (Summary) để khách dễ thấy.
* **Success Tag:** Hiển thị nhãn xanh lá cây kèm tên mã đã áp dụng thành công.
* **Discount Display:** Số tiền được giảm phải hiển thị dấu trừ (ví dụ: -20.000đ) để phân biệt với giá gốc.


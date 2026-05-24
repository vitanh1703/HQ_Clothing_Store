# 📘 Software Requirement Specification (SRS)
## Chức năng: Theo dõi Lịch sử đơn hàng (Order Tracking)
**Mã chức năng:** ORD-02  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Đặng Thị Quỳnh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ dành riêng cho Khách hàng (Customer) để giám sát và theo dõi toàn bộ lịch sử mua sắm cá nhân. Tính năng này cho phép người dùng xem lại chi tiết các hóa đơn đã đặt, giá trị thanh toán thực tế và theo dõi lộ trình trạng thái giao hàng một cách minh bạch.

---

### 2. Luồng nghiệp vụ (Customer Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập "Hồ sơ" -> "Lịch sử đơn hàng" | Hệ thống gọi API `GET /api/orders/user/{userId}` và trả về danh sách đơn hàng được sắp xếp mới nhất lên đầu. |
| 2 | Lọc đơn hàng (Tùy chọn) | Người dùng nhấn vào các tab: Tất cả, Chờ xử lý, Đang giao, Thành công, Đã hủy để lọc kết quả hiển thị. |
| 3 | Nhấn "Xem chi tiết" một đơn cụ thể | Gọi API hiển thị rõ địa chỉ nhận hàng, danh sách `order_items` với hình ảnh, số lượng và tổng tiền. |
| 4 | Nhấn "Hủy đơn" (Nếu muốn) | Nút này chỉ xuất hiện khi trạng thái là `Pending`. Hệ thống gửi yêu cầu cập nhật thành `Cancel`. |
| 5 | Mua lại đơn hàng (Re-order) | (Tùy chọn) Nhấn nút để thêm nhanh tất cả các món đồ của đơn hàng cũ vào lại Giỏ hàng hiện tại. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu Trạng thái (Customer View)
* **Pending (Chờ xử lý):** Đơn hàng đang chờ Shop đóng gói. Khách hàng có quyền tự hủy đơn.
* **Shipping (Đang giao):** Hàng đã xuất kho và giao cho đơn vị vận chuyển.
* **Success (Thành công):** Đơn hàng đã giao thành công và hoàn tất thanh toán.
* **Cancel (Đã hủy):** Đơn bị hủy bởi khách, bị hệ thống hủy tự động (do chưa thanh toán) hoặc Shop hủy.

#### 3.2. Dữ liệu hiển thị chi tiết (`orders` & `order_items`)
* **Thông tin chung:** `order_code` (Mã đơn), `order_date` (Ngày đặt), `total_amount` (Tổng tiền cuối cùng sau giảm giá).
* **Sản phẩm đã mua:** Trích xuất từ `order_items`, JOIN với `product_variants` để lấy `size`, `color`, tên và ảnh.
* **Giá chốt đơn (`price_at_purchase`):** Bắt buộc sử dụng giá này để hiển thị thay vì giá hiện tại của sản phẩm (Tránh việc khách thắc mắc vì sao giá lịch sử bị đổi).

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Bảo mật dữ liệu cá nhân (IDOR Prevention):** Endpoint `/api/orders/user/{userId}` phải kiểm tra Token JWT. Nếu `userId` trong Token không khớp với `userId` được truyền lên (và không phải Admin), chặn truy cập trả về `403 Forbidden`.
* **Kiểm soát cập nhật:** Frontend và Backend tuyệt đối không cho phép khách hàng tự ý thay đổi trạng thái lên `Shipping` hoặc `Success`.
* **Hoàn kho khi hủy:** Khi khách bấm Hủy đơn (`Cancel`), Backend phải thực hiện một Transaction cộng trả lại `stock_quantity` vào kho để đảm bảo tồn kho thực tế chính xác.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Khách dùng công cụ (Postman) cố tình hủy đơn Đang giao** | Backend bắt chặt điều kiện `if (order.Status != "Pending") return BadRequest("Chỉ được hủy đơn ở trạng thái chờ xử lý");`. |
| **Sản phẩm lịch sử đã bị Shop xóa** | Vì bảng `order_items` lưu trữ thông tin độc lập, hoặc dùng `ON DELETE SET NULL`, hệ thống vẫn phải hiển thị thông tin hóa đơn (Tên, giá, size) mà không bị sập. |
| **Khách đặt hàng qua VNPAY nhưng chưa quét mã** | Đơn hàng hiện trong lịch sử với trạng thái `Pending`. Sau 24h, background job của server sẽ tự động dọn và chuyển thành `Cancel`. |

---

### 6. Giao diện (UI/UX)
* **Tab Navigation:** Sử dụng các tab ngang (Tất cả / Chờ xử lý / Đang giao / Hoàn thành / Đã hủy) để khách dễ dàng quản lý.
* **Thiết kế Card (Order Card):** 
  * Header Card: Mã đơn, Ngày đặt, Trạng thái (Huy hiệu màu sắc: Vàng cho Pending, Xanh dương cho Shipping, Xanh lá cho Success, Xám/Đỏ cho Cancel).
  * Body Card: Danh sách 1-2 sản phẩm tiêu biểu (Có nút xem thêm nếu đơn hàng dài).
  * Footer Card: Tổng tiền và các nút thao tác (Hủy đơn, Xem chi tiết).
* **Màn hình Trống (Empty State):** Nếu khách chưa mua hàng, hiển thị hình ảnh minh họa giỏ hàng rỗng và nút "Tiếp tục mua sắm" điều hướng về Trang chủ.

---
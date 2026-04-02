# 📘 Software Requirement Specification (SRS)
## Chức năng: Đánh giá & Phản hồi sản phẩm (Product Review)
**Mã chức năng:** USER-02  
**Trạng thái:** Review  
**Người soạn thảo:** [Đặng Thị Quỳnh]  
**Vai trò:** Developer
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cho phép khách hàng gửi đánh giá (số sao) và bình luận về sản phẩm sau khi đã mua hàng thành công. Tính năng này giúp tăng độ tin cậy cho cửa hàng và cung cấp thông tin hữu ích cho các khách hàng khác.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập "Lịch sử đơn hàng" | Hiển thị danh sách các đơn hàng đã mua. |
| 2 | Nhấn "Đánh giá" tại sản phẩm đã nhận | Kiểm tra đơn hàng có trạng thái `Success` (Thành công) chưa. |
| 3 | Chọn số sao (1-5) và viết bình luận | Validate dữ liệu (Bình luận không được để trống). |
| 4 | Nhấn "Gửi đánh giá" | API `/api/reviews/add` lưu thông tin vào bảng `reviews`. |
| 5 | Hệ thống cập nhật hiển thị | Hiển thị đánh giá mới nhất trên trang Chi tiết sản phẩm. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `reviews`)
* **`user_id`**: Định danh người đánh giá.
* **`product_id`**: Sản phẩm được đánh giá (Lưu theo sản phẩm gốc).
* **`rating`**: Số nguyên từ 1 đến 5 (TINYINT).
* **`comment`**: Nội dung phản hồi của khách hàng.
* **`created_at`**: Thời điểm gửi đánh giá.

#### 3.2. Logic hiển thị & Tính toán
* **Rating trung bình:** Hệ thống tự động tính toán tổng số sao / số lượt đánh giá để hiển thị trên trang chủ và trang chi tiết.
* **Quyền đánh giá:** Một người dùng chỉ được đánh giá 1 lần cho mỗi sản phẩm trong một đơn hàng cụ thể.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Xác thực:** Bắt buộc người dùng phải đăng nhập (JWT).
* **Kiểm tra nghiệp vụ (Business Logic):** Backend phải kiểm tra trong bảng `orders` và `order_items` xem `user_id` này đã thực sự mua `product_id` này và đơn hàng đã hoàn tất chưa.
* **Ngôn ngữ:** Tích hợp bộ lọc từ ngữ thô tục (Bad words filter) để bảo vệ hình ảnh cửa hàng.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Đơn hàng chưa hoàn thành** | Ẩn nút "Đánh giá" hoặc thông báo: "Bạn chỉ có thể đánh giá sau khi nhận hàng thành công". |
| **Đã đánh giá rồi** | Thay nút "Đánh giá" bằng nhãn "Đã đánh giá" và cho phép xem lại nội dung. |
| **Nội dung quá ngắn** | Yêu cầu: "Vui lòng nhập tối thiểu 10 ký tự để chia sẻ trải nghiệm của bạn". |

### 6. Giao diện (UI/UX)
* **Star Rating:** Sử dụng icon Ngôi sao tương tác (Hover để chọn số sao).
* **Review List:** Hiển thị tên người dùng (có thể che bớt tên để bảo mật, ví dụ: a***h), số sao và nội dung.
* **Admin Reply:** (Tùy chọn) Hiển thị phần phản hồi của Shop dưới mỗi bình luận để tăng tính tương tác.


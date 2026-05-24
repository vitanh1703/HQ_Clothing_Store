# 📘 Software Requirement Specification (SRS)
## Chức năng: Đánh giá & Bình luận sản phẩm (Product Review)
**Mã chức năng:** PROD-03  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Đặng Thị Quỳnh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ Đánh giá sản phẩm (Product Review) cho phép khách hàng để lại nhận xét (bằng văn bản) và chấm điểm (từ 1 đến 5 sao) cho các sản phẩm tại H&Q Store. Tính năng này giúp tăng độ tin cậy của website (Social Proof), hỗ trợ người mua sau có cái nhìn khách quan hơn, đồng thời giúp Ban quản trị thu thập phản hồi để cải thiện chất lượng sản phẩm.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Cuộn xuống phần "Đánh giá" ở trang Chi tiết sản phẩm | Frontend gọi API `GET /api/reviews/product/{id}` để tải danh sách các bình luận hiện có. |
| 2 | Nhấn nút "Viết đánh giá" | Hệ thống kiểm tra trạng thái đăng nhập. Nếu chưa đăng nhập, yêu cầu chuyển hướng sang trang Đăng nhập. |
| 3 | Nhập nội dung & Chọn số sao | Chọn số sao (từ 1-5) bằng cách click vào các biểu tượng ngôi sao và nhập text vào ô nội dung. |
| 4 | Nhấn "Gửi đánh giá" | Frontend gọi API `POST /api/reviews`. Backend validate dữ liệu và lưu vào bảng `reviews`. |
| 5 | Xem kết quả | Hệ thống tự động load lại danh sách đánh giá, tính toán lại điểm Trung bình (Average Rating) và hiển thị lên đầu. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `reviews`)
* **`user_id`**: Khóa ngoại liên kết tới bảng `users` để lấy thông tin người dùng (`full_name`, `avatar_url`).
* **`product_id`**: Khóa ngoại định danh sản phẩm được đánh giá.
* **`rating`**: Số nguyên (TinyInt), giới hạn giá trị từ 1 đến 5 đại diện cho số sao.
* **`comment`**: Chuỗi văn bản chứa nội dung bình luận của người dùng.
* **`created_at`**: Thời gian gửi đánh giá.

#### 3.2. Dữ liệu tính toán (Calculated Data)
* **Số sao trung bình (Average Rating):** Tính bằng trung bình cộng `AVG(rating)` của tất cả đánh giá thuộc cùng một `product_id`, làm tròn đến 1 chữ số thập phân (Ví dụ: 4.8 sao).
* **Tổng số lượt đánh giá (Total Reviews):** Tính bằng `COUNT(id)`.

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Xác thực (Authentication):** Chỉ người dùng đã đăng nhập (có Token JWT hợp lệ) mới có quyền gọi API `POST /api/reviews`.
* **Ràng buộc cơ sở dữ liệu (Database Constraint):** Cột `rating` có thiết lập ràng buộc `CHECK (rating between 1 and 5)` ở cấp độ CSDL MySQL để chặn hoàn toàn dữ liệu rác.
* **Hiệu năng:** Khi hiển thị ở giao diện Product Detail, tính năng tính toán `Average Rating` phải được tối ưu hóa (hoặc Cache lại) để tránh việc phải lặp lại phép toán trên hàng ngàn rows mỗi lần load trang.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Khách hàng chưa chọn số sao đã bấm Gửi** | Frontend chặn submit, highlight khu vực chọn sao và báo lỗi Toast: "Vui lòng chọn số sao đánh giá (1-5)". |
| **Khách hàng gửi bình luận trống** | Chấp nhận cho phép người dùng chỉ đánh giá số sao (Rating only) mà không cần nhập `comment` (cột `comment` có thể `NULL`). |
| **Spam đánh giá liên tục** | Backend (tùy chọn) có thể giới hạn mỗi người dùng chỉ được viết tối đa 1 đánh giá cho 1 sản phẩm. Nếu gửi cái thứ 2 sẽ ghi đè (Update) lên đánh giá cũ, hoặc chặn báo lỗi. |

---

### 6. Giao diện (UI/UX)
* **Tổng quan Đánh giá (Review Summary):** Hiển thị số sao trung bình bằng số lớn (VD: 4.8/5) kèm theo các thanh Progress Bar thống kê tỷ lệ % của từng mức sao (5 sao, 4 sao, 3 sao,...).
* **Thành phần chọn sao (Star Rating Component):** Sử dụng các Icon Ngôi sao (Lucide React). Khi Hover chuột, các sao sẽ đổi sang màu vàng mượt mà để biểu thị số điểm định chọn.
* **Danh sách bình luận (Review List):** Hiển thị theo dạng danh sách cuộn dọc. Mỗi bình luận bao gồm: Avatar người dùng (nếu đăng nhập Google), Tên, Số sao đã đánh giá, Ngày tháng và Nội dung bình luận.
# 📘 Software Requirement Specification (SRS)
## Chức năng: Đăng ký & Xác thực Mail (User Registration)
**Mã chức năng:** AUTH-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Nguyễn Thị Hảo  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ Đăng ký cho phép người dùng mới tạo tài khoản thành viên (Customer) trên hệ thống H&Q Store. Hệ thống đảm bảo tính duy nhất của Email, mã hóa mật khẩu an toàn và tự động khởi tạo Giỏ hàng (Cart) trống cho người dùng. Đặc biệt, hệ thống tích hợp API Brevo để tự động gửi Email chào mừng/xác thực ngay sau khi tài khoản được tạo thành công.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang Đăng ký (`/register`) | Frontend hiển thị Form đăng ký (Họ tên, Email, Mật khẩu, Xác nhận mật khẩu). |
| 2 | Điền thông tin và nhấn "Đăng ký" | Frontend Validate dữ liệu (Email hợp lệ, Mật khẩu >= 8 ký tự, 2 ô mật khẩu trùng khớp). |
| 3 | Gửi yêu cầu lên Backend | Gọi API `POST /api/auth/register`. Backend kiểm tra tính duy nhất của `email` trong bảng `users`. |
| 4 | Xử lý CSDL (Database Transaction) | - Băm mật khẩu (BCrypt).<br>- Insert vào bảng `users` (`role='Customer'`, `auth_provider='local'`).<br>- Insert vào bảng `carts` với `user_id` vừa tạo. |
| 5 | Gửi Email tự động (Tùy chọn) | Hệ thống gọi API Brevo gửi một Email Welcome tới địa chỉ email của khách hàng. |
| 6 | Đăng ký thành công | Frontend hiển thị Toast thông báo thành công và tự động chuyển hướng sang trang Đăng nhập. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Form Inputs)
* **`full_name`**: Chuỗi văn bản, tối thiểu 2 ký tự, bắt buộc.
* **`email`**: Chuỗi văn bản, định dạng Email chuẩn, duy nhất, bắt buộc.
* **`password`**: Chuỗi văn bản, tối thiểu 8 ký tự, bắt buộc.
* **`confirm_password`**: Chuỗi văn bản, dùng để Validate ở Frontend, không gửi lên Backend.

#### 3.2. Logic CSDL (Bảng `users` & `carts`)
* **Bảng `users`**: Dữ liệu được gán tự động các giá trị mặc định:
  * `role` = `'Customer'`
  * `auth_provider` = `'local'`
  * `status` = `1` (Active)
* **Bảng `carts`**: Một bản ghi mới sẽ được tạo trong bảng `carts` ánh xạ trực tiếp `1-1` với `user_id` vừa sinh ra.

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Toàn vẹn dữ liệu (Transaction):** Việc Insert vào `users` và `carts` phải được bọc trong một `IDbContextTransaction`. Nếu việc tạo `carts` gặp lỗi, phải Rollback lệnh tạo `users` để tránh tình trạng "Tài khoản rác" (Không có giỏ hàng).
* **Mã hóa (Hashing):** Mật khẩu bắt buộc mã hóa một chiều bằng thuật toán `BCrypt` trước khi lưu.
* **Bất đồng bộ (Asynchronous):** Tác vụ gửi Email qua Brevo API nên được chạy dưới dạng Background Task (Fire-and-forget) để không làm chậm thời gian phản hồi (Response Time) của API đăng ký.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Email đã tồn tại (Duplicate)** | Backend trả về `400 Bad Request` kèm thông báo. Frontend hiển thị chữ đỏ dưới ô Email: "Email này đã được sử dụng, vui lòng đăng nhập hoặc chọn email khác". |
| **Mật khẩu xác nhận không khớp** | Chặn ngay tại Frontend, không gọi API, báo lỗi: "Mật khẩu không trùng khớp". |
| **Lỗi từ dịch vụ Gửi Mail (Brevo)** | Nếu API Brevo bị lỗi (hết quota, sập), Backend vẫn phải bắt (Catch) lỗi, coi như Đăng ký thành công, log lỗi vào console và bỏ qua việc gửi mail. |

---

### 6. Giao diện (UI/UX)
* **Trực quan nhập liệu:** Cung cấp Icon (Mắt) để người dùng có thể Bật/Tắt chế độ xem mật khẩu (Show/Hide Password).
* **Validation Real-time:** Kiểm tra định dạng Email (Regex) ngay khi người dùng rời khỏi ô Input (onBlur), hiển thị cảnh báo đỏ nếu không có ký tự `@`.
* **Tiện ích chuyển hướng:** Cung cấp dòng text "Bạn đã có tài khoản? Đăng nhập ngay" nổi bật để điều hướng người dùng dễ dàng.

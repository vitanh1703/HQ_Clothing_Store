# 📘 Software Requirement Specification (SRS)
## Chức năng: Đăng ký tài khoản (User Registration)
**Mã chức năng:** AUTH-01  
**Trạng thái:** Review  
**Người soạn thảo:** [Diêm Việt Anh]  
**Vai trò:** Developer
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cho phép người dùng mới tạo tài khoản thành viên trên hệ thống H&Q. Tài khoản sau khi đăng ký mặc định sẽ có vai trò là `Customer`. Hệ thống đảm bảo tính duy nhất của Email và tính bảo mật của mật khẩu trước khi lưu vào CSDL.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập URL `/register` | Hiển thị Form đăng ký (Họ tên, Email, Mật khẩu, Nhập lại mật khẩu). |
| 2 | Nhập thông tin và nhấn "Đăng ký" | Validate dữ liệu tại Client (Định dạng, Độ dài, Khớp mật khẩu). |
| 3 | Gửi dữ liệu lên API | API `/api/auth/register` kiểm tra Email đã tồn tại trong DB chưa. |
| 4 | Xử lý dữ liệu tại Backend | Mã hóa mật khẩu, Insert vào bảng `users`, tạo bản ghi trong bảng `carts`. |
| 5 | Đăng ký thành công | Thông báo thành công và điều hướng người dùng tới trang `/login`. |
| 6 | Đăng ký thất bại | Hiển thị lỗi cụ thể (Email đã tồn tại, Lỗi kết nối DB). |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Input Fields)
* **Full Name:** `string`, tối thiểu 2 ký tự, bắt buộc.
* **Email:** `string`, định dạng hợp lệ, duy nhất (Unique), bắt buộc.
* **Password:** `string`, tối thiểu 8 ký tự, bao gồm chữ và số, bắt buộc.
* **Confirm Password:** `string`, phải trùng khớp với `Password`.

#### 3.2. Logic lưu trữ (Database - Bảng `users` & `carts`)
* **Bảng `users`**:
    * `role`: Gán mặc định là `'Customer'`.
    * `auth_provider`: Gán mặc định là `'local'`.
    * `status`: Gán mặc định là `1` (Active).
    * `password`: Lưu dưới dạng chuỗi đã băm (BCrypt).
* **Bảng `carts`**:
    * Tự động tạo 1 dòng mới với `user_id` vừa được sinh ra để sẵn sàng cho việc mua hàng.

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Xác thực dữ liệu (Validation):** Thực hiện cả ở Frontend (trải nghiệm người dùng) và Backend (bảo mật dữ liệu).
* **Bảo mật mật khẩu:** Tuyệt đối không lưu mật khẩu gốc. Sử dụng `BCrypt` với độ khó (Work Factor) phù hợp.
* **Chống Spam:** Có thể tích hợp **Google reCAPTCHA** để ngăn chặn việc tạo tài khoản ảo hàng loạt bằng bot.
* **Tính toàn vẹn (Transaction):** Việc tạo `users` và `carts` phải nằm trong một **Database Transaction** (Nếu tạo giỏ hàng lỗi thì phải hủy việc tạo user).

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Email đã được sử dụng** | Thông báo: "Email này đã được đăng ký, vui lòng sử dụng email khác hoặc đăng nhập". |
| **Mật khẩu quá yếu** | Cảnh báo: "Mật khẩu cần tối thiểu 8 ký tự, bao gồm cả chữ và số". |
| **Mất kết nối Internet** | Hiển thị Toast thông báo: "Không thể kết nối máy chủ, vui lòng thử lại sau". |
| **Lỗi Transaction** | Rollback dữ liệu và thông báo: "Có lỗi xảy ra trong quá trình khởi tạo tài khoản". |

### 6. Giao diện (UI/UX)
* **Real-time Validation:** Hiển thị dấu tích xanh hoặc báo đỏ ngay khi người dùng đang nhập (ví dụ: mật khẩu không khớp).
* **Password Toggle:** Nút ẩn/hiện mật khẩu để người dùng kiểm tra lại thông tin.
* **Redirect:** Sau khi đăng ký thành công, tự động điền Email vào trang Login để người dùng chỉ cần nhập Pass.


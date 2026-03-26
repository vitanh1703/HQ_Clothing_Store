#  Software Requirement Specification (SRS)
## Chức năng: Hệ thống Xác thực người dùng (User Authentication)
**Mã chức năng:** AUTH-02  
**Trạng thái:** Review  
**Người soạn thảo:** [Nguyễn Thị Hảo]  
**Vai trò:** Developer
**Dự án:** H&Q Clothing Store 

---

### 1. Mô tả tổng quan (Description)
Cung cấp cơ chế xác thực bảo mật cho phép người dùng truy cập vào hệ thống H&Q. Hệ thống phân quyền dựa trên 3 vai trò chính (Admin, Staff, Customer) để đảm bảo người dùng chỉ tiếp cận đúng các tính năng được phép. Hỗ trợ đăng nhập truyền thống và Google OAuth2.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập URL `/login` | Hiển thị giao diện đăng nhập (Form & Nút Google). |
| 2a | Nhập Email/Password và nhấn "Login" | Gửi request POST tới API Backend `/api/auth/login`. |
| 2b | Nhấn "Login with Google" | Chuyển hướng tới Google Identity Provider để xác thực. |
| 3 | Hệ thống kiểm tra thông tin | Truy vấn bảng `users`, so khớp `password_hash` hoặc `google_id`. |
| 4 | Xác thực thành công | Trả về **JWT Token** (chứa ID, Email, Role). |
| 5 | Điều hướng theo Role | **Admin/Staff:** Vào Dashboard quản trị. <br> **Customer:** Vào trang chủ mua sắm. |
| 6 | Xác thực thất bại | Thông báo lỗi cụ thể (Sai thông tin/Tài khoản bị khóa). |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Input Fields)
* **Email:** `string`, bắt buộc, định dạng email hợp lệ (Dùng cho cả Local và Google).
* **Password:** `string`, tối thiểu 8 ký tự (Chỉ bắt buộc nếu `auth_provider = 'local'`).
* **Google ID:** `string`, nhận được sau khi người dùng xác thực thành công với Google.

#### 3.2. Dữ liệu lưu trữ (Database - Bảng `users`)
Hệ thống sẽ truy vấn và cập nhật các trường sau:
* `email`: Dùng để định danh duy nhất.
* `password`: Chuỗi đã băm (Hashed) bằng BCrypt.
* `role`: Lấy giá trị ('Admin', 'Staff', 'Customer') để phân quyền.
* `auth_provider`: Phân biệt nguồn ('local' hoặc 'google').
* `google_id`: Lưu trữ định danh Google để nhận diện trong các lần sau.
* `status`: Kiểm tra trạng thái (1: Active, 0: Locked).

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Giao thức:** Bắt buộc sử dụng **HTTPS** (SSL/TLS) cho mọi yêu cầu API.
* **Mã hóa:** Tuyệt đối không lưu mật khẩu dạng văn bản thuần. Sử dụng thư viện `BCrypt.Net` hoặc `Identity PasswordHasher`.
* **JWT (JSON Web Token):** Token được đính kèm vào Header `Authorization: Bearer <token>` trong các request tiếp theo.
* **CORS:** Chỉ cho phép Origin từ tên miền của Frontend (React) truy cập API.
* **Brute-force:** Tự động khóa đăng nhập 15 phút nếu nhập sai mật khẩu quá 5 lần liên tiếp.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Email chưa đăng ký** | Thông báo: "Email hoặc mật khẩu không chính xác". |
| **Tài khoản bị khóa (`status=0`)** | Thông báo: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin". |
| **Đăng nhập Google lần đầu** | Hệ thống tự động Insert 1 dòng mới vào bảng `users` với `role = 'Customer'` và tạo 1 `carts` tương ứng. |
| **Phiên làm việc hết hạn** | API trả về mã lỗi `401 Unauthorized`, Frontend tự động xóa Token và chuyển về trang Login. |

### 6. Giao diện (UI/UX)
* **Responsive:** Giao diện co giãn tốt trên cả Mobile và Desktop.
* **Feedback:** Hiển thị Spinner khi đang gửi yêu cầu xác thực.
* **Accessibility:** Hỗ trợ nhấn `Enter` để thực hiện gửi form nhanh.
* **Remember Me:** Sử dụng Persistent Storage để lưu trạng thái đăng nhập nếu người dùng tích chọn.

---
# 📘 Software Requirement Specification (SRS)
## Chức năng: Đăng nhập & Google OAuth (User Authentication)
**Mã chức năng:** AUTH-02  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Đặng Thị Quỳnh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store 

---

### 1. Mô tả tổng quan (Description)
Cung cấp cơ chế xác thực bảo mật cho phép người dùng truy cập vào hệ thống H&Q. Hệ thống phân quyền dựa trên 3 vai trò chính (Admin, Staff, Customer) để đảm bảo người dùng chỉ tiếp cận đúng các tính năng được phép. Ngoài phương thức đăng nhập truyền thống bằng Email/Password, hệ thống còn tích hợp đăng nhập nhanh qua tài khoản Google sử dụng thư viện `@react-oauth/google`.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang Đăng nhập | Frontend hiển thị form nhập liệu và nút "Tiếp tục với Google". |
| 2a | **Đăng nhập truyền thống:** Nhập Email/Password và nhấn "Đăng nhập" | Gọi API `POST /api/auth/login`. Backend kiểm tra `email` và so khớp `password` (BCrypt). |
| 2b | **Đăng nhập Google:** Nhấn nút "Tiếp tục với Google" | Component `<GoogleLogin />` kích hoạt popup chọn tài khoản Google của người dùng. |
| 3b | Xác thực Google thành công ở Frontend | Google trả về `credential` (JWT của Google). Frontend gửi chuỗi này lên API `POST /api/auth/google-login`. |
| 4 | Xử lý tại Backend | Backend (sử dụng `Google.Apis.Auth`) verify `credential`. Truy vấn bảng `users` theo `email` hoặc `google_id`. |
| 5 | Cấp phát Token | Nếu hợp lệ, hệ thống sinh ra **JWT (JSON Web Token)** nội bộ và trả về cho Frontend lưu vào LocalStorage/Cookies. |
| 6 | Điều hướng theo Role | **Admin/Staff:** Redirect vào Dashboard. <br> **Customer:** Redirect về Trang chủ hoặc trang trước đó. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Input Fields)
* **Email:** `string`, bắt buộc, định dạng email hợp lệ (Dùng cho cả Local và Google).
* **Password:** `string`, tối thiểu 8 ký tự (Chỉ bắt buộc nếu `auth_provider = 'local'`).
* **Credential Token (Google):** Chuỗi JWT mã hóa thông tin tài khoản (Email, Name, Picture) do Google trả về.

#### 3.2. Dữ liệu lưu trữ (Database - Bảng `users`)
Khi xác thực, hệ thống sẽ đối chiếu và lưu trữ vào các trường sau:
* `email`: Khóa duy nhất (Unique) để định danh tài khoản.
* `password`: Chuỗi đã băm (Hashed) bằng BCrypt (sẽ là `NULL` nếu tài khoản chỉ dùng Google).
* `role`: Phân quyền người dùng (`'Admin'`, `'Staff'`, `'Customer'`).
* `auth_provider`: Phân biệt nguồn đăng nhập (`'local'` hoặc `'google'`).
* `google_id`: Chuỗi ID định danh từ Google để tránh trùng lặp.
* `avatar_url`: Lưu link ảnh đại diện (kéo từ Google Profile).
* `status`: Trạng thái hoạt động (`1: Hoạt động`, `0: Khóa`).

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Giao thức:** Bắt buộc sử dụng **HTTPS** (SSL/TLS) cho mọi yêu cầu API.
* **Mã hóa:** Tuyệt đối không lưu mật khẩu dạng văn bản thuần. Sử dụng thư viện `BCrypt.Net` hoặc `Identity PasswordHasher`.
* **Tích hợp Google OAuth:** Sử dụng thư viện `@react-oauth/google` bọc ngoài App bằng `<GoogleOAuthProvider clientId="...">`. Client ID phải được whitelist domain ở Google Cloud Console (cả `localhost` và domain deploy).
* **JWT Authentication:** Token cấp phát có thời hạn (VD: 1 ngày). Đính kèm vào Header `Authorization: Bearer <token>` ở các request cần bảo mật.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Sai Email hoặc Password (Local)** | Hiển thị thông báo chung: "Email hoặc mật khẩu không chính xác" (Tránh việc hacker biết email nào đã tồn tại). |
| **Tài khoản bị khóa (`status=0`)** | Thông báo: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin". |
| **Đăng nhập Google lần đầu (Email chưa tồn tại)** | Hệ thống tự động Insert bản ghi mới vào bảng `users` (`auth_provider = 'google'`, `role = 'Customer'`) và tự động tạo 1 `carts` rỗng cho user đó. |
| **Email đã tồn tại dưới dạng Local nhưng chọn Đăng nhập Google** | Hệ thống nhận diện trùng `email`, thực hiện update bổ sung `google_id`, `auth_provider = 'google'` (Merge account) và cho phép đăng nhập thành công. |
| **Phiên làm việc hết hạn** | API trả về mã lỗi `401 Unauthorized`, Frontend tự động xóa Token và chuyển về trang Login. |

---

### 6. Giao diện (UI/UX)
* **Bố cục (Layout):** Form đăng nhập đơn giản, tập trung vào ô nhập liệu và nút Call-to-action (CTA). Thiết kế một nút Đăng nhập Google chuẩn Material Design nổi bật.
* **Validation:** Kiểm tra định dạng Email hợp lệ và Password không được để trống ngay tại Frontend trước khi gọi API (hiển thị text màu đỏ báo lỗi).
* **Loading State:** Hiển thị hiệu ứng Spinner hoặc disable nút "Đăng nhập" khi đang đợi phản hồi từ Server để tránh click nhiều lần.
* **UX Tiện ích:** Có nút (icon mắt) để ẩn/hiện mật khẩu. Hỗ trợ ấn `Enter` để submit form.

---
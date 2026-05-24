# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý thông tin cá nhân (Profile Management)
**Mã chức năng:** AUTH-03  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Nguyễn Thị Hảo  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ Quản lý hồ sơ cho phép người dùng (Khách hàng, Nhân viên, Quản lý) xem và cập nhật thông tin cá nhân của mình. Đối với khách hàng, việc cập nhật đầy đủ địa chỉ và số điện thoại là bước rất quan trọng để hệ thống có thể tự động điền (Auto-fill) vào biểu mẫu khi thực hiện quy trình thanh toán (Checkout).

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang "Hồ sơ của tôi" (`/profile`) | Gửi Token JWT gọi API `GET /api/users/profile`. Trả về dữ liệu chi tiết của user hiện tại. |
| 2 | Chỉnh sửa thông tin (Họ tên, SĐT, Địa chỉ) | Frontend cho phép nhập liệu, validate (SĐT phải đủ 10 số, không chứa chữ cái). |
| 3 | Nhấn "Lưu thay đổi" | Gọi API `PUT /api/users/profile`. Backend lưu cập nhật vào bảng `users`. |
| 4 | Đổi mật khẩu (Chỉ dành cho tài khoản Local) | Khách hàng nhập Mật khẩu cũ và Mật khẩu mới. Gọi API `POST /api/users/change-password`. |
| 5 | Xem Lịch sử đơn hàng | Chuyển sang Tab "Đơn hàng", hệ thống sẽ tải danh sách lịch sử mua sắm của Khách hàng (Chi tiết xem tại `SRS_ORDER.MD`). |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu Bảng `users` (Hiển thị & Chỉnh sửa)
* **`email`**: Dữ liệu Read-only (Không cho phép người dùng tự sửa Email để tránh xung đột tài khoản định danh).
* **`full_name`**: Chuỗi văn bản, bắt buộc nhập.
* **`phone`**: Chuỗi số, tối đa 15 ký tự. Dùng làm số liên hệ nhận hàng.
* **`address`**: Chuỗi văn bản dài. Dùng làm địa chỉ nhận hàng mặc định.
* **`avatar_url`**: Link ảnh đại diện (Được đồng bộ tự động nếu đăng nhập bằng Google).

#### 3.2. Logic Bảo mật (Security Logic)
* **Mã hóa mật khẩu:** Mật khẩu mới được băm (Hash) lại bằng thuật toán `BCrypt` trước khi lưu đè vào CSDL. Không bao giờ lưu dạng Plain-text.
* **Kiểm tra Auth Provider:** Nếu `auth_provider = 'google'`, hệ thống sẽ **ẩn/khóa** hoàn toàn Tab "Đổi mật khẩu", vì tài khoản Google không có mật khẩu nội bộ.

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Xác thực JWT (Authentication):** Tất cả các API thuộc phân hệ này bắt buộc phải có Header `Authorization: Bearer <token>`.
* **Ngăn chặn IDOR (Insecure Direct Object Reference):** API Cập nhật hồ sơ không được nhận `userId` từ body hay param (để tránh user này sửa data của user khác). Backend phải tự giải mã `userId` từ chính Token đang truyền lên.
* **Đồng bộ Checkout:** Khi người dùng vào trang Thanh toán (`/checkout`), dữ liệu `full_name`, `phone`, `address` từ Profile sẽ được tự động fill sẵn vào Form để tiết kiệm thời gian.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Nhập sai mật khẩu cũ** | API `change-password` đối chiếu BCrypt trả về lỗi `400`. Giao diện hiển thị: "Mật khẩu hiện tại không chính xác". |
| **Để trống trường bắt buộc** | Nút "Lưu thay đổi" không hoạt động hoặc báo đỏ các trường (Họ tên, SĐT). |
| **SĐT sai định dạng** | Biểu thức Regex ở Frontend chặn và báo lỗi nếu có chữ cái, hoặc độ dài không đạt chuẩn (10-11 số). |

---

### 6. Giao diện (UI/UX)
* **Bố cục Tab ngang (Tab Navigation):** Menu chuyển đổi mượt mà giữa các mục: 
  1. Hồ sơ của tôi (Thông tin chung)
  2. Đổi mật khẩu (Ẩn đối với tài khoản Google)
  3. Lịch sử đơn hàng
* **Trạng thái lưu (Loading State):** Nút Lưu chuyển thành trạng thái "Đang cập nhật..." (Kèm Spinner) để ngăn người dùng nhấp đúp sinh nhiều request.
* **Ảnh đại diện mặc định (Fallback Avatar):** Nếu `avatar_url` là null, hiển thị một ảnh Placeholder (Avatar trống) hoặc ký tự đầu tiên của tên.

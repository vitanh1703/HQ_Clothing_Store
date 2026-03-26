# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý thông tin cá nhân (Profile Management)
**Mã chức năng:** AUTH-03  
**Trạng thái:** Review  
**Người soạn thảo:** [Đặng Thị Quỳnh]  
**Vai trò:** Developer
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cho phép người dùng (Khách hàng, Nhân viên, Quản lý) xem và cập nhật thông tin cá nhân của mình. Đối với khách hàng, việc cập nhật địa chỉ và số điện thoại là bắt buộc để thực hiện quy trình thanh toán và giao hàng.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang "Tài khoản của tôi" | Truy vấn bảng `users` để hiển thị thông tin hiện tại. |
| 2 | Chỉnh sửa thông tin (Họ tên, SĐT, Địa chỉ) | Cho phép nhập liệu và validate định dạng (SĐT phải là số). |
| 3 | Thay đổi ảnh đại diện | Chọn file ảnh từ thiết bị hoặc giữ ảnh từ Google. |
| 4 | Nhấn "Lưu thay đổi" | API `/api/users/profile` cập nhật dữ liệu vào bảng `users`. |
| 5 | Đổi mật khẩu (Nếu là Local Account) | Yêu cầu nhập mật khẩu cũ, mật khẩu mới và xác nhận. |
| 6 | Cập nhật thành công | Hiển thị Toast thông báo và cập nhật thông tin hiển thị trên Navbar. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu hiển thị & Chỉnh sửa
* **Full Name:** `string`, lấy từ `full_name`.
* **Phone:** `string`, tối đa 15 ký tự, chỉ chứa số.
* **Address:** `text`, địa chỉ giao hàng chi tiết.
* **Avatar:** `string` (URL), có thể là link Google hoặc đường dẫn ảnh trên server.
* **Email:** `string`, chỉ cho phép xem (Read-only) để đảm bảo tính định danh.

#### 3.2. Logic bảo mật (Security Logic)
* **Phân quyền:** Người dùng chỉ có quyền sửa Profile của chính mình (kiểm tra `UserId` từ JWT Token).
* **Đổi mật khẩu:** Chỉ hiển thị tính năng này nếu `auth_provider = 'local'`. Nếu là `'google'`, ẩn phần đổi mật khẩu.
* **Mã hóa:** Mật khẩu mới phải được băm lại bằng `BCrypt` trước khi lưu.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Upload Ảnh:** Giới hạn dung lượng ảnh đại diện < 2MB. Hỗ trợ định dạng `.jpg`, `.png`, `.webp`.
* **Xử lý ảnh:** Backend nên lưu ảnh vào thư mục `wwwroot/uploads/avatars` hoặc sử dụng dịch vụ Cloud (Cloudinary/S3).
* **Đồng bộ:** Nếu người dùng cập nhật thông tin, các đơn hàng (`orders`) trong tương lai sẽ lấy địa chỉ mới này làm mặc định.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **SĐT sai định dạng** | Hiển thị lỗi: "Số điện thoại không hợp lệ (phải từ 10-11 chữ số)". |
| **Mật khẩu cũ không khớp** | Thông báo: "Mật khẩu hiện tại không chính xác". |
| **File ảnh quá lớn** | Cảnh báo: "Dung lượng ảnh vượt quá 2MB, vui lòng chọn ảnh khác". |
| **Email trùng lặp** | (Nếu cho sửa email) Kiểm tra email mới đã có ai dùng chưa trước khi cập nhật. |

### 6. Giao diện (UI/UX)
* **Giao diện chia tab:** Chia thành các mục: "Thông tin chung", "Đổi mật khẩu", "Lịch sử mua hàng".
* **Preview Avatar:** Hiển thị ảnh mới ngay khi người dùng chọn file trước khi nhấn Lưu.
* **Trạng thái chờ:** Hiển thị nút "Đang lưu..." để tránh người dùng nhấn nhiều lần.


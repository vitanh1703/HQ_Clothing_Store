# Software Requirement Specification (SRS)
## Chức năng: Danh sách sản phẩm yêu thích (Wishlist)
**Mã chức năng:** USER-01  
**Trạng thái:** Review  
**Người soạn thảo:** [Nguyễn Thị Hảo]
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cho phép khách hàng lưu trữ các sản phẩm quan tâm vào một danh sách riêng tư. Tính năng này giúp người dùng dễ dàng tìm lại sản phẩm và theo dõi biến động giá hoặc tình trạng hàng hóa mà không cần thêm vào giỏ hàng.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn icon "Trái tim" tại Card sản phẩm hoặc trang Chi tiết | API `/api/wishlist/add` kiểm tra đăng nhập và lưu vào bảng `wishlists`. |
| 2 | Truy cập trang "Sản phẩm yêu thích" | Hệ thống truy vấn bảng `wishlists` JOIN với bảng `products`. |
| 3 | Nhấn "Thêm vào giỏ" từ Wishlist | Chuyển hướng người dùng chọn Size/Màu hoặc thêm trực tiếp nếu đã chọn trước đó. |
| 4 | Xóa sản phẩm khỏi danh sách | Gửi request DELETE để loại bỏ bản ghi trong bảng `wishlists`. |
| 5 | Nhận thông báo (Tùy chọn) | Hệ thống hiển thị nhãn "Giảm giá" nếu sản phẩm trong Wishlist có chương trình `promotions`. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `wishlists`)
* **`user_id`**: Định danh người dùng sở hữu danh sách.
* **`product_id`**: Định danh sản phẩm được yêu thích (Lưu theo sản phẩm gốc, không lưu theo biến thể để khách tự chọn size sau).
* **`created_at`**: Thời điểm thêm vào danh sách.

#### 3.2. Logic hiển thị
* **Giá:** Hiển thị giá thấp nhất hiện tại của sản phẩm đó.
* **Trạng thái:** Hiển thị "Còn hàng" hoặc "Hết hàng" dựa trên tổng kho của các biến thể.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Xác thực:** Chỉ người dùng đã đăng nhập mới có thể sử dụng tính năng Wishlist (Yêu cầu JWT Token).
* **Số lượng:** Giới hạn tối đa 50 sản phẩm trong danh sách yêu thích của mỗi User để tránh rác dữ liệu.
* **Đồng bộ UI:** Khi người dùng nhấn yêu thích, icon trái tim phải đổi màu ngay lập tức (Real-time feedback) mà không cần load lại trang.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Chưa đăng nhập mà nhấn yêu thích** | Hiển thị thông báo (Modal/Toast): "Vui lòng đăng nhập để lưu sản phẩm yêu thích". |
| **Sản phẩm đã có trong danh sách** | Hệ thống không tạo mới mà thông báo: "Sản phẩm này đã có trong danh sách yêu thích của bạn". |
| **Sản phẩm bị xóa khỏi hệ thống** | Tự động ẩn hoặc xóa bản ghi tương ứng trong `wishlists`. |

### 6. Giao diện (UI/UX)
* **Icon tương tác:** Sử dụng icon Trái tim (Outline khi chưa chọn, Filled khi đã chọn).
* **Trang danh sách:** Thiết kế dạng lưới (Grid) tương tự trang Catalog nhưng có thêm nút "Xóa" nhanh.
* **Thông báo:** Hiển thị số lượng sản phẩm yêu thích (Badge) trên icon trái tim ở Header/Navbar.


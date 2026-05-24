# 📘 Software Requirement Specification (SRS)
## Chức năng: Danh sách sản phẩm yêu thích (Wishlist)
**Mã chức năng:** USER-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Đặng Thị Quỳnh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ Yêu thích (Wishlist) cho phép khách hàng lưu trữ các sản phẩm (cụ thể tới từng phân loại Size/Màu sắc) mà họ đang quan tâm vào một danh sách cá nhân. Tính năng này giúp người dùng dễ dàng tìm lại, theo dõi tình trạng tồn kho hoặc chờ đợi các chương trình khuyến mãi trước khi quyết định thêm vào Giỏ hàng.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn icon "Trái tim" tại trang Sản phẩm | Giao diện gửi request API `POST /api/wishlist/add`. Hệ thống kiểm tra xác thực (JWT) và lưu `variant_id` vào bảng `wishlist`. |
| 2 | Truy cập trang "Yêu thích" (`/wishlist`) | Hệ thống gọi API truy vấn bảng `wishlist` JOIN với `product_variants` và `products` để hiển thị danh sách. |
| 3 | Nhấn "Thêm vào giỏ" từ Wishlist | Vì đã lưu trữ sẵn `variant_id`, hệ thống tự động đẩy thẳng sản phẩm với đúng Size/Màu đó vào Giỏ hàng mà khách không cần thao tác chọn lại. |
| 4 | Xóa khỏi danh sách yêu thích | Người dùng nhấn lại vào icon Trái tim (hoặc nút Xóa). Gửi request `DELETE` để loại bỏ bản ghi trong CSDL. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu lưu trữ (Bảng `wishlist`)
* **`user_id`**: Khóa ngoại định danh người dùng sở hữu danh sách.
* **`variant_id`**: Khóa ngoại liên kết tới biến thể cụ thể (Hệ thống thiết kế lưu chính xác SKU/Size/Color mà khách hàng thích, không lưu chung chung).
* **`added_at`**: Thời điểm (Timestamp) thêm vào danh sách yêu thích để sắp xếp.

#### 3.2. Ràng buộc Dữ liệu (Database Constraint)
* **Unique Key:** CSDL thiết lập ràng buộc `UNIQUE KEY unique_wishlist_variant (user_id, variant_id)` để đảm bảo một khách hàng không thể thêm trùng lặp cùng một biến thể vào Wishlist nhiều lần.

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Xác thực (Authentication):** Chỉ người dùng đã đăng nhập (có Token hợp lệ) mới có thể sử dụng tính năng Wishlist. Khách vãng lai khi nhấn Trái tim sẽ bị hệ thống yêu cầu chuyển hướng sang trang Đăng nhập.
* **Toàn vẹn dữ liệu (Cascade):** Nhờ thiết lập `ON DELETE CASCADE` trong MySQL, khi một biến thể (`product_variants`) hoặc một tài khoản (`users`) bị xóa, các bản ghi Wishlist liên quan sẽ tự động bị xóa theo để tránh dữ liệu rác.
* **Trải nghiệm Real-time:** Khi nhấn Yêu thích, icon trái tim ở Frontend sử dụng React State để chuyển sang màu đỏ (Filled) ngay lập tức (Optimistic UI) trong lúc gọi API.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Khách hàng chưa đăng nhập** | Bắt sự kiện Click, hiển thị Modal hoặc Toast nhắc nhở: "Vui lòng đăng nhập để sử dụng tính năng Yêu thích" kèm nút chuyển hướng. |
| **Sản phẩm yêu thích đã hết hàng** | Sản phẩm vẫn được giữ trong Wishlist nhưng ảnh bị làm mờ, hiển thị nhãn đỏ "Hết hàng" và nút "Thêm vào giỏ" bị vô hiệu hóa. |
| **Biến thể bị Shop ngừng kinh doanh (Xóa)** | Do có ràng buộc Cascade, sản phẩm tự động biến mất khỏi danh sách Wishlist của khách hàng. |

---

### 6. Giao diện (UI/UX)
* **Icon tương tác:** Sử dụng icon Trái tim (Outline viền đen khi chưa chọn, Filled màu đỏ/đen khi đã thêm vào Wishlist). Nằm ở góc trên cùng của Card Sản phẩm và bên cạnh nút "Thêm vào giỏ" trong trang Chi tiết.
* **Trang danh sách (Wishlist Page):** Thiết kế dạng Grid tương tự trang Cửa hàng (Catalog). Mỗi thẻ sản phẩm sẽ hiển thị rõ thông tin Size/Màu mà khách đã chọn.
* **Bộ đếm (Badge):** (Tùy chọn) Hiển thị số lượng sản phẩm đang yêu thích trên icon Trái tim ở thanh Navbar (Header) bên cạnh Giỏ hàng.

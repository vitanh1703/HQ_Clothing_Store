# 📘 Software Requirement Specification (SRS)
## Chức năng: Chi tiết sản phẩm & Lựa chọn biến thể (Product Detail)
**Mã chức năng:** PROD-02  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Đặng Thị Quỳnh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Hiển thị toàn bộ thông tin chi tiết của một sản phẩm cụ thể bao gồm hình ảnh, mô tả, đánh giá (Reviews) và các lựa chọn biến thể (Size, Màu sắc). Phân hệ này đóng vai trò trung tâm trong trải nghiệm mua sắm, cho phép người dùng xem xét kỹ sản phẩm, chọn đúng tổ hợp phân loại mong muốn và thực hiện hành động Thêm vào giỏ hàng (Add to Cart) hoặc Lưu vào danh sách yêu thích (Wishlist).

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn vào một sản phẩm từ trang Chủ/Cửa hàng | Trình duyệt điều hướng sang `/product/{id}`. Frontend gọi API `GET /api/products/{id}`. |
| 2 | Xem ảnh và mô tả sản phẩm | Hệ thống trả về dữ liệu `products`, kèm mảng `product_variants` và `reviews`. |
| 3 | Chọn Kích cỡ (Size) và Màu sắc (Color) | Trạng thái Component cập nhật. Hệ thống tự động trích xuất `price` và `stock_quantity` của `variant` khớp với lựa chọn. |
| 4 | Điều chỉnh số lượng (Quantity) | Frontend kiểm tra không cho phép nhập số lượng `< 1` hoặc `> stock_quantity`. |
| 5 | Nhấn "Thêm vào giỏ hàng" | Gọi API `POST /api/cart/add` với Payload: `variantId` và `quantity`. Nếu thành công, hiển thị thông báo góc màn hình. |
| 6 | Nhấn icon "Trái tim" (Wishlist) | Gửi API lưu `variantId` vào bảng `wishlist` tương ứng với `user_id`. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu hiển thị (Display Data)
* **Thông tin gốc (`products`):** `name`, `brand_text`, `image_url`, `description`.
* **Danh sách biến thể (`product_variants`):** `id`, `size`, `color`, `price`, `stock_quantity`.
* **Đánh giá (`reviews`):** Danh sách comment, `rating` (1-5 sao), JOIN với `users` để lấy tên và Avatar người đánh giá.

#### 3.2. Logic xử lý biến thể (Variant Logic)
* **Giá động (Dynamic Pricing):** Giá sản phẩm hiển thị sẽ thay đổi ngay lập tức trên UI dựa vào mức giá riêng của từng tổ hợp Size/Màu mà người dùng chọn.
* **Kiểm tra tồn kho (Stock Checking):** 
  * Nếu biến thể có `stock_quantity > 0`: Nút "Thêm vào giỏ hàng" hoạt động bình thường.
  * Nếu `stock_quantity = 0`: Nút bấm bị vô hiệu hóa (Disabled) và đổi thành chữ "HẾT HÀNG".

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Quản lý trạng thái (State Management):** Bắt buộc sử dụng React State (`selectedSize`, `selectedColor`) để lưu trữ lựa chọn của người dùng. Không cho phép gửi Request Add to Cart nếu chưa chọn đủ 2 thuộc tính này.
* **Bảo mật Cart & Wishlist:** Các hành động gọi API Thêm giỏ hàng / Wishlist yêu cầu gửi kèm JWT Token. Nếu người dùng chưa đăng nhập, Frontend sẽ chuyển hướng (Redirect) về trang `/auth`.
* **HTML Rendering:** Phần `description` của sản phẩm có thể chứa mã HTML (do Admin soạn thảo từ Rich Text Editor), Frontend cần dùng thuộc tính `dangerouslySetInnerHTML` để render an toàn.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Truy cập ID sản phẩm không tồn tại** | API trả về `404 Not Found`. Frontend catch lỗi và hiển thị trang thông báo "Sản phẩm không tồn tại hoặc đã bị xóa" kèm nút Về Trang chủ. |
| **Nhấn "Thêm vào giỏ" khi chưa chọn đủ thuộc tính** | Nút bấm rung/lắc nhẹ (Shake animation) và hiển thị Toast thông báo đỏ: "Vui lòng chọn Size và Màu sắc trước khi thêm". |
| **Khách cố tình nhập tay số lượng > Tồn kho** | Ô Input tự động nhảy lùi về số lượng `stock_quantity` lớn nhất đang có của biến thể đó. |
| **Sản phẩm mới chưa có Đánh giá** | Ẩn số sao trung bình ở phần Header, mục Bình luận hiển thị Empty State: "Chưa có đánh giá nào. Hãy là người đầu tiên trải nghiệm sản phẩm!". |

---

### 6. Giao diện (UI/UX)
* **Breadcrumb Navigation:** Có thanh điều hướng `Trang chủ > Danh mục > Tên sản phẩm` ở trên cùng để người dùng dễ dàng quay lại.
* **Bố cục 2 cột (Desktop):**
  * Cột trái: Hình ảnh sản phẩm khổ lớn (Hỗ trợ click vào để xem Fullscreen).
  * Cột phải: Thông tin (Tên, Giá, Đánh giá, Các nút chọn Size/Color theo dạng Selector hình vuông/tròn).
* **Sticky Add-to-Cart (Mobile):** Khi người dùng cuộn (scroll) qua khỏi phần thông tin chính, một thanh bar mỏng chứa nút "Thêm vào giỏ" sẽ luôn bám dính ở dưới cùng màn hình điện thoại để tăng tỷ lệ chuyển đổi (Conversion Rate).
* **Accordion Tabs:** Phần "Mô tả chi tiết", "Hướng dẫn bảo quản", "Chính sách đổi trả" được thiết kế dạng thả xuống (Collapse/Accordion) để giao diện không bị quá dài.

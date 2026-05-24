# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý giỏ hàng (Shopping Cart)
**Mã chức năng:** CART-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Diêm Việt Anh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp nơi lưu trữ tạm thời các sản phẩm biến thể (Size/Màu sắc) mà khách hàng dự định mua. Hệ thống hỗ trợ cập nhật số lượng trực tiếp, xóa sản phẩm và tự động tính toán tổng giá trị tạm tính (Subtotal) dựa trên giá mới nhất của sản phẩm trước khi tiến hành thanh toán.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn "Thêm vào giỏ" từ trang Chi tiết | Gọi API `POST /api/cart/add`. Backend kiểm tra `variant_id`, nếu đã có trong giỏ thì tăng `quantity`, chưa có thì thêm mới vào `cart_items`. |
| 2 | Truy cập trang Giỏ hàng (`/cart`) | Gọi API `GET /api/cart/{userId}`. Backend truy vấn `carts` JOIN `cart_items`, `product_variants` và `products` để trả về danh sách. |
| 3 | Thay đổi số lượng (Tăng/Giảm) | Giao diện cho phép tăng/giảm, gọi API cập nhật. Hệ thống chặn không cho phép tăng vượt quá `stock_quantity` của kho. |
| 4 | Xóa sản phẩm khỏi giỏ | Người dùng nhấn Icon Thùng rác, hệ thống xóa bản ghi tương ứng khỏi `cart_items`. |
| 5 | Chuyển sang "Thanh toán" | Người dùng chốt danh sách sản phẩm và nhấn "Thanh toán". Dữ liệu (State) được truyền thẳng sang trang `/checkout`. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu hiển thị (Mapping)
* **Sản phẩm:** Tên sản phẩm (`name`), Ảnh đại diện (`image_url`), Kích cỡ (`size`), Màu sắc (`color`).
* **Đơn giá:** Lấy `price` trực tiếp và mới nhất từ bảng `product_variants`.
* **Số lượng:** Cột `quantity` lưu trong bảng `cart_items`.
* **Thành tiền (Subtotal):** Tính bằng `price * quantity` cho từng dòng sản phẩm.

#### 3.2. Logic tính toán (Calculation Logic)
* **Giá động (Dynamic Pricing):** Giá trong giỏ hàng không được lưu cứng mà luôn ánh xạ theo `price` của biến thể tại thời điểm truy vấn. Nếu Shop cập nhật giá, giỏ hàng của khách tự động hiển thị theo giá mới.
* **Tổng tiền (Total Amount):** Cộng dồn thành tiền của các sản phẩm để hiển thị số tiền thanh toán dự kiến.

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Tự động khởi tạo:** Theo thiết kế (trong `SRS_REGISTER.MD`), mỗi người dùng khi tạo tài khoản sẽ được tự động Insert sẵn 1 bản ghi vào bảng `carts` (`1-1` relationship). Do đó, không cần kiểm tra việc khởi tạo giỏ lúc thêm sản phẩm.
* **Xác thực API (Authentication):** Endpoint giỏ hàng yêu cầu JWT Token. Người dùng chưa đăng nhập sẽ bị điều hướng sang trang Đăng nhập khi ấn "Thêm vào giỏ".
* **Ràng buộc khóa ngoại (Cascade):** Khi một biến thể (`product_variants`) bị Admin xóa khỏi hệ thống, các bản ghi `cart_items` liên quan cũng sẽ tự động bị xóa theo (Nhờ `ON DELETE CASCADE` trong Database).

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Biến thể sản phẩm bị Admin xóa** | Do có ràng buộc Cascade, sản phẩm tự động biến mất khỏi giỏ hàng. |
| **Tồn kho về 0 (Out of stock)** | Hiển thị nhãn "Hết hàng" (màu đỏ) và vô hiệu hóa nút Thanh toán của sản phẩm đó. |
| **Nhập số lượng bằng tay (Manual Input) > Tồn kho** | Frontend tự động lùi về số `stock_quantity` lớn nhất đang có của biến thể và hiển thị Toast nhắc nhở. |
| **Giỏ hàng rỗng** | Ẩn khu vực tính tiền, hiển thị hình ảnh Empty Cart và nút "Tiếp tục mua sắm" điều hướng về `/products`. |

---

### 6. Giao diện (UI/UX)
* **Bố cục (Layout):** Chia làm 2 cột trên Desktop (Cột trái: Danh sách sản phẩm, Cột phải: Khung tổng tiền). Xếp chồng dạng Stack trên Mobile.
* **Card Sản phẩm (Cart Item):** Hiển thị rõ ảnh, tên, Size/Màu, đơn giá và Control tăng/giảm số lượng. Có nút xóa dạng Icon thùng rác góc phải.
* **Thông báo (Toast):** Thêm vào giỏ thành công ở trang chi tiết sẽ hiện Toast thông báo mini ở góc màn hình mà không bắt buộc người dùng chuyển trang.

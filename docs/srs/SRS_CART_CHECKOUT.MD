# 📘 Software Requirement Specification (SRS)
## Chức năng: Luồng giỏ hàng & Đặt hàng (Cart & Checkout)
**Mã chức năng:** CART-03  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** [Diêm Việt Anh]  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp quy trình toàn diện từ việc khách hàng chọn thêm sản phẩm (theo Size, Màu sắc - Variant) vào Giỏ hàng (`carts`), tính toán giá trị đơn hàng (áp dụng mã giảm giá `promotions`), cho đến bước xác nhận thanh toán (Checkout) và tạo đơn hàng chính thức (`orders`) trên hệ thống.

---

### 2. Luồng nghiệp vụ (User Workflow)
| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn "Thêm vào giỏ" tại trang chi tiết sản phẩm | Hệ thống (API `/api/cart/add`) kiểm tra `variant_id` và số lượng tồn kho. Nếu đủ hàng, thêm hoặc cập nhật số lượng trong bảng `cart_items`. |
| 2 | Truy cập trang Giỏ hàng (`/cart`) | Fetch danh sách `cart_items` theo `user_id`. Khách hàng có thể tăng/giảm số lượng hoặc xóa sản phẩm khỏi giỏ hàng. |
| 3 | Nhấn "Thanh toán" | Chuyển sang trang Checkout, yêu cầu nhập thông tin giao hàng (Họ tên, SĐT, Địa chỉ). |
| 4 | Nhập mã giảm giá (Voucher) | API kiểm tra mã trong bảng `promotions` (còn hạn, đủ điều kiện giá trị đơn tối thiểu). Nếu hợp lệ, trừ tiền (`FixedAmount` hoặc `Percentage`). |
| 5 | Chọn phương thức thanh toán & Đặt hàng | Khách hàng chọn COD (Thanh toán khi nhận hàng) hoặc VNPAY. Gửi request tạo `orders`. |
| 6 | Xử lý sau đặt hàng | Hệ thống tạo `orders`, `order_items` lưu `price_at_purchase`. Xóa các `cart_items` đã mua. Nếu thanh toán VNPAY, sinh URL và Redirect. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu Giỏ hàng (`carts` & `cart_items`)
* **`carts`**: Liên kết `user_id` (1 User - 1 Cart).
* **`cart_items`**: Lưu `cart_id`, `variant_id` (Đại diện cho size/color cụ thể của sản phẩm), `quantity` (Mặc định >= 1).

#### 3.2. Dữ liệu Đơn hàng (`orders` & `order_items`)
* **`orders`**: 
  * `order_code`: Mã đơn hàng duy nhất (VD: `HQ2604100902115`).
  * `total_amount`: Tổng tiền cần thanh toán.
  * `status`: Trạng thái đơn (Mặc định `Pending`, có thể là `Shipping`, `Success`, `Cancel`).
  * `full_name`, `phone`, `address`: Địa chỉ giao hàng thực tế.
* **`order_items`**:
  * Lưu `variant_id` và `quantity`.
  * `price_at_purchase`: Cực kỳ quan trọng, dùng để chốt giá tại thời điểm mua (không bị ảnh hưởng nếu shop đổi giá sau này).

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Validation Server-side:** Toàn bộ việc tính toán tổng tiền (Subtotal) và áp mã giảm giá phải thực hiện trên Backend để tránh khách hàng dùng công cụ (Inspect/DevTools) sửa giá trị.
* **Bảo mật thanh toán VNPAY:** Sử dụng `VnPayLibrary` sinh mã Hash `vnp_SecureHash` (HmacSHA512) xác thực tính toàn vẹn của URL thanh toán (Tránh bị giả mạo tham số số tiền chuyển khoản).
* **Dọn dẹp đơn rác (Background Job):** Hệ thống có một Background Service (`UnpaidOrdersCleanupService.cs`) tự động quét và hủy các đơn hàng `Pending` quá 24 giờ vào 5:00 sáng mỗi ngày, đồng thời phục hồi tồn kho.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Hết hàng khi đang thanh toán** | Kiểm tra lần cuối trước khi ghi DB. Nếu hết, báo lỗi: "Sản phẩm [Tên] đã hết hàng, vui lòng tải lại giỏ hàng." |
| **Mã giảm giá hết lượt/hết hạn** | Check `usage_limit`, `used_count` và `end_date` trong `promotions`. Nếu không đạt, trả về `400 Bad Request` kèm Message. |
| **Người dùng hủy thanh toán VNPAY** | Redirect về trang giỏ hàng. Đơn hàng ở trạng thái `Pending`. Người dùng có thể ấn thanh toán lại. |

---

### 6. Giao diện (UI/UX)
* **Giỏ hàng Sidebar / Cart Page:** Thiết kế hiện đại, làm nổi bật nút "Thanh toán", hiển thị rõ tổng tiền, phí ship và số tiền được giảm.
* **Checkout Form:** Hiển thị form điền địa chỉ với validate rõ ràng (Tên, Email, SĐT). Có summary các sản phẩm sẽ mua ở cột bên phải.
* **Nút bấm phản hồi:** Hiển thị trạng thái "Đang xử lý..." (Spinner) khi khách hàng ấn Đặt hàng để tránh tình trạng duplicate click sinh ra 2 đơn hàng liên tiếp.

---
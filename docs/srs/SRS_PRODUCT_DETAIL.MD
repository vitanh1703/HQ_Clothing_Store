#  Software Requirement Specification (SRS)
## Chức năng: Chi tiết sản phẩm & Lựa chọn biến thể (Product Detail)
**Mã chức năng:** PROD-02  
**Trạng thái:** Review  
**Người soạn thảo:** [Nguyễn Thị Hảo] 
**Vai trò:** Developer 
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Hiển thị thông tin chi tiết của một sản phẩm cụ thể bao gồm hình ảnh, mô tả, đánh giá và các lựa chọn biến thể (Size, Màu). Cho phép người dùng chọn đúng tổ hợp mong muốn để thêm vào giỏ hàng hoặc danh sách yêu thích.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Nhấn vào một sản phẩm từ trang Catalog | Truy vấn `products` JOIN `product_variants` theo `id/slug`. |
| 2 | Xem ảnh và mô tả sản phẩm | Hiển thị Slider hình ảnh và nội dung từ bảng `products`. |
| 3 | Chọn Màu sắc (Color) | Cập nhật danh sách các Size tương ứng còn hàng cho màu đó. |
| 4 | Chọn Kích cỡ (Size) | Hiển thị giá chính xác và số lượng tồn kho của biến thể đó. |
| 5 | Thay đổi số lượng mua | Kiểm tra không cho phép vượt quá `stock_quantity`. |
| 6 | Nhấn "Thêm vào giỏ hàng" | API `/api/cart/add` lưu thông tin vào bảng `cart_items`. |
| 7 | Nhấn "Yêu thích" | Lưu thông tin vào bảng `wishlists`. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu hiển thị
* **Thông tin gốc:** Tên, Mô tả, Chất liệu, Hướng dẫn giặt là (từ bảng `products`).
* **Danh sách biến thể:** Lấy tất cả `size`, `color`, `price`, `stock_quantity` từ bảng `product_variants`.
* **Đánh giá:** Danh sách bình luận và số sao trung bình từ bảng `reviews`.

#### 3.2. Logic xử lý biến thể (Variant Logic)
* **Giá động:** Giá sản phẩm có thể thay đổi ngay lập tức khi người dùng đổi Size (Ví dụ: Size XXL có thể đắt hơn).
* **Kiểm tra tồn kho:** * Nếu biến thể có `stock_quantity > 0`: Cho phép chọn và mua.
    * Nếu `stock_quantity = 0`: Hiển thị trạng thái "Hết hàng" và khóa nút "Thêm vào giỏ".

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Image Gallery:** Hỗ trợ tính năng Zoom ảnh và chuyển đổi ảnh theo màu sắc đã chọn.
* **Đồng bộ trạng thái:** Sử dụng **React State** để quản lý `selectedColor` và `selectedSize`, đảm bảo UI cập nhật ngay khi người dùng click.
* **URL:** Slug phải chứa thông tin thân thiện (Ví dụ: `/product/ao-polo-nam-hq`).

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Sản phẩm không tồn tại** | Hiển thị trang 404 Custom của H&Q Store. |
| **Chưa chọn Size/Màu đã nhấn Mua** | Hiển thị thông báo (Toast): "Vui lòng chọn Kích cỡ và Màu sắc trước khi thêm vào giỏ". |
| **Số lượng mua > Tồn kho** | Tự động điều chỉnh về số lượng tối đa đang có và thông báo cho khách. |
| **Sản phẩm chưa có đánh giá** | Hiển thị: "Chưa có đánh giá nào. Hãy là người đầu tiên mua và đánh giá sản phẩm này!". |

### 6. Giao diện (UI/UX)
* **Breadcrumb:** Đường dẫn điều hướng (Trang chủ > Áo > Áo Polo).
* **Social Share:** Nút chia sẻ sản phẩm lên Facebook/Zalo.
* **Sticky Add-to-Cart:** (Trên Mobile) Nút mua hàng luôn hiện ở dưới cùng màn hình khi cuộn trang.
* **Review Section:** Hiển thị phân trang đánh giá và ảnh chụp thực tế từ khách hàng.

# 📘 Software Requirement Specification (SRS)
## Chức năng: Danh mục & Tìm kiếm sản phẩm (Product Catalog)
**Mã chức năng:** PROD-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Đặng Thị Quỳnh
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Phân hệ Cửa hàng (Shop/Catalog) cung cấp giao diện trực quan cho phép khách hàng khám phá toàn bộ các bộ sưu tập thời trang của H&Q Store. Hệ thống kết hợp bộ lọc (Filter) đa tầng theo Danh mục, Khoảng giá, Kích thước (Size) và Màu sắc (Color), giúp người dùng dễ dàng thu hẹp phạm vi và tìm thấy sản phẩm ưng ý một cách nhanh chóng nhất.

---

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang "Sản phẩm" (`/products`) | Gọi API `GET /api/products`. Trả về danh sách sản phẩm (mặc định phân trang, sắp xếp mới nhất). |
| 2 | Chọn Danh mục ở Sidebar | Frontend đính kèm param `categoryId` gọi lại API, giao diện cập nhật chỉ hiển thị sản phẩm thuộc danh mục đó. |
| 3 | Kéo thanh trượt khoảng giá | Hệ thống cập nhật truy vấn `minPrice` và `maxPrice`, hiển thị các sản phẩm nằm trong ngân sách. |
| 4 | Tick chọn Size / Màu sắc | Backend truy vấn chéo vào bảng `product_variants` để chỉ trả về các sản phẩm chứa Size/Màu mà khách tìm. |
| 5 | Gõ từ khóa vào thanh Search | Gọi API tìm kiếm `LIKE %keyword%` vào trường `name` và `brand_text` của bảng `products`. |
| 6 | Click vào một sản phẩm cụ thể | Điều hướng sang URL `/product/{id}` để xem chi tiết thông tin và đặt hàng. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu hiển thị trên Giao diện (Product Card)
Mỗi thẻ sản phẩm (Card) trên màn hình sẽ cần hiển thị:
* **Ảnh đại diện:** Trích xuất từ trường `image_url` của bảng `products`.
* **Thương hiệu & Tên:** Lấy từ `brand_text` (Thường là 'H&Q') và trường `name`.
* **Mức giá hiển thị:** Truy vấn `MIN(price)` từ bảng `product_variants` của sản phẩm đó để hiển thị mức giá khởi điểm (VD: "Từ 150.000đ").
* **Trạng thái tồn kho:** Nếu tổng `stock_quantity` của tất cả các biến thể = 0, đánh dấu là "Hết hàng".

#### 3.2. Logic Bộ Lọc tại Backend (Filter & Sort)
* Lọc **Category:** Match trực tiếp với trường `category_id`.
* Lọc **Size & Color:** Yêu cầu `INNER JOIN` với bảng `product_variants` để truy vấn chính xác (S, M, L, Trắng, Đen).
* Sắp xếp **(Sort By):** Hỗ trợ `price_asc` (Giá thấp đến cao), `price_desc` (Giá cao xuống thấp), `newest` (Hàng mới về).

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Chống quá tải truy vấn (N+1 Query):** Backend ASP.NET Core phải sử dụng `.Include(p => p.Variants)` khi lấy danh sách sản phẩm thay vì lặp qua từng phần tử để gọi DB.
* **Phân trang (Pagination):** Backend hỗ trợ trả về `TotalItems`, `TotalPages` cùng dữ liệu phân trang, tránh kéo toàn bộ dữ liệu làm sập trình duyệt của người dùng.
* **Tối ưu Mobile:** Bộ lọc Sidebar trên Desktop phải được thiết kế dạng Modal/Drawer (Vuốt từ dưới lên hoặc cạnh sang) trên thiết bị di động.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Lọc quá sâu không ra kết quả** | Hiển thị UI: "Không tìm thấy sản phẩm phù hợp. Vui lòng xóa bớt bộ lọc." kèm theo nút "Xóa tất cả bộ lọc". |
| **Hết hàng (Out of Stock)** | Ảnh sản phẩm bị làm mờ xám (Grayscale), có badge đỏ ghi chữ "Hết Hàng" đè lên và vô hiệu hóa nút "Thêm vào giỏ". |
| **Lỗi kết nối / Đang fetch API** | Frontend hiển thị "Skeleton Loading" (Cấu trúc khung xám nhấp nháy) để giữ trải nghiệm mượt mà không bị giật layout. |

---

### 6. Giao diện (UI/UX)
* **Grid Layout:** 
  * **Desktop:** Chia tỉ lệ Grid 2 cột: Cột trái (Sidebar Filter chiếm khoảng 1/4), Cột phải hiển thị lưới sản phẩm (3-4 Card / hàng).
  * **Mobile:** Lưới hiển thị 2 Card / hàng. Nút "Lọc" nổi bật ở trên cùng.
* **Tương tác Filter:** Khi người dùng tick vào bộ lọc (ví dụ: Chọn Màu Đen), giao diện tự động reload lại danh sách ngay lập tức mà không cần bấm nút "Áp dụng".
* **Hiệu ứng Hover:** Khi di chuột (hover) vào hình ảnh sản phẩm, viền thẻ đổi màu nhẹ và nút "Xem chi tiết" hiện lên.

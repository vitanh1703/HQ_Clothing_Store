# Software Requirement Specification (SRS)

## Chức năng: Quản lý sản phẩm (Product Management)
**Mã chức năng:** PROD-02  
**Trạng thái:** Draft / Review  
**Người soạn thảo:** [Đặng Thị Quỳnh]  
**Vai trò:** Developer

---

### 1. Mô tả tổng quan (Description)
Cung cấp giao diện quản trị cho phép Quản trị viên (Admin) thực hiện các thao tác thêm, sửa, xóa và theo dõi danh mục hàng hóa trong kho. Hệ thống tập trung vào việc quản lý biến thể sản phẩm (Size, Màu sắc) và hình ảnh để đảm bảo dữ liệu hiển thị chính xác cho khách hàng.

---

### 2. Luồng nghiệp vụ (User Workflow) - Thêm mới sản phẩm
| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập Dashboard Admin > "Thêm sản phẩm" | Hiển thị form nhập liệu sản phẩm mới. |
| 2 | Nhập thông tin (Tên, Giá, Mô tả, Danh mục...) | Validate dữ liệu (Tên không trùng, Giá không âm). |
| 3 | Tải lên Ảnh đại diện & Ảnh chi tiết | Hiển thị bản xem trước (Preview) của ảnh đã upload. |
| 4 | Cấu hình biến thể (Size, Màu sắc, Số lượng tồn) | Khởi tạo bảng danh sách tồn kho dựa trên biến thể đã chọn. |
| 5 | Nhấn "Lưu sản phẩm" | Lưu dữ liệu vào Database, thông báo thành công và chuyển về trang danh sách. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Input Fields)
* **Tên sản phẩm:** `string`, bắt buộc, duy nhất (Unique).
* **Giá:** `decimal`, bắt buộc, giá trị phải $\ge 0$.
* **Mô tả:** `text` (HTML/Rich Text), cung cấp thông tin chất liệu, bảng size.
* **Danh mục:** `dropdown`, chọn từ danh sách có sẵn (Nam, Nữ, Phụ kiện...).
* **Ảnh đại diện:** `file` (jpg, png), bắt buộc 1 ảnh chính.
* **Ảnh chi tiết:** `list of files`, tối đa 5 ảnh.
* **Biến thể (Variants):** Mảng đối tượng gồm `Size` (S, M, L, XL), `Color` (Vàng, Đen...), `Stock` (Số lượng).

#### 3.2. Dữ liệu lưu trữ (Database - Bảng `products` & `product_variants`)
* `product_id`: primary key.
* `name`: unique index.
* `price`: decimal(18,2).
* `thumbnail_url`: string (đường dẫn lưu trữ ảnh trên server/cloud).
* `variant_id`: primary key cho bảng biến thể.
* `quantity`: int (số lượng tồn kho cho từng size/màu).

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Xử lý hình ảnh:** Hệ thống tự động tối ưu hóa dung lượng ảnh (compress) trước khi lưu để tăng tốc độ tải trang.
* **Ràng buộc Database:** Sử dụng **Transaction** khi lưu sản phẩm và biến thể để đảm bảo tính toàn vẹn dữ liệu (không lưu sản phẩm nếu biến thể bị lỗi).
* **Quyền truy cập:** Chỉ người dùng có role `Admin` mới có quyền truy cập vào các API POST/PUT/DELETE liên quan đến sản phẩm.
* **Hệ quản trị:** Dữ liệu được lưu trữ và truy vấn thông qua **MySQL 8.0**.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)
* **Trường hợp:** Nhập tên sản phẩm đã tồn tại.  
    * *Xử lý:* Thông báo lỗi: "Tên sản phẩm này đã được sử dụng, vui lòng chọn tên khác".
* **Trường hợp:** File ảnh tải lên vượt quá dung lượng quy định (ví dụ > 2MB).  
    * *Xử lý:* Hiển thị cảnh báo: "Dung lượng ảnh quá lớn, vui lòng chọn ảnh dưới 2MB".
* **Trường hợp:** Xóa sản phẩm đang có trong đơn hàng của khách.  
    * *Xử lý:* Không cho phép xóa vật lý (Physical Delete), thực hiện ẩn sản phẩm (Soft Delete) để giữ lịch sử đơn hàng.

---

### 6. Giao diện (UI/UX)
* **Dashboard:** Danh sách sản phẩm dạng bảng có chức năng tìm kiếm nhanh và phân trang.
* **Trạng thái kho:** Đánh dấu màu đỏ cho các sản phẩm có số lượng tồn kho `< 5`.
* **Kéo thả ảnh:** Hỗ trợ tính năng Drag & Drop để upload ảnh chi tiết nhanh chóng.
* **Định dạng:** Tự động căn lề và định dạng tiền tệ (VNĐ) khi Admin nhập giá.

---
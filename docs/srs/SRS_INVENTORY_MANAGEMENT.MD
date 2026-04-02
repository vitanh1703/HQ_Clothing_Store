# 📘 Software Requirement Specification (SRS)
## Chức năng: Quản lý Kho hàng & Biến thể (Inventory Management)
**Mã chức năng:** ADM-01  
**Trạng thái:** Review  
**Người soạn thảo:** [Đặng Thị Quỳnh]
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp công cụ cho Quản lý (Admin) và Nhân viên (Staff) để quản lý danh sách sản phẩm, nhà cung cấp và số lượng tồn kho thực tế. Hệ thống cho phép cập nhật chi tiết từng biến thể (Size, Màu) để đảm bảo dữ liệu bán hàng trên website luôn chính xác.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập Dashboard Quản trị | Hiển thị danh sách Sản phẩm kèm trạng thái tồn kho. |
| 2 | Thêm/Sửa Sản phẩm (`products`) | Nhập tên, mô tả, chọn danh mục (`categories`) và nhà cung cấp (`suppliers`). |
| 3 | Quản lý Biến thể (`product_variants`) | Thêm các dòng Size/Màu, thiết lập giá bán và số lượng nhập kho ban đầu. |
| 4 | Nhập thêm hàng (Restock) | Chọn biến thể cụ thể, cộng thêm số lượng vào `stock_quantity`. |
| 5 | Quản lý Nhà cung cấp | Thêm thông tin liên hệ xưởng may/đối tác cung cấp hàng. |
| 6 | Cảnh báo hàng sắp hết | Hệ thống đánh dấu đỏ các sản phẩm có tồn kho < 5. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu đầu vào (Input Fields)
* **Product Info:** Tên, Mô tả, CategoryID, SupplierID.
* **Variant Info:** Size (S, M, L...), Màu (Trắng, Đen...), SKU (Mã kho), Giá bán, Số lượng tồn.
* **Supplier Info:** Tên công ty, Số điện thoại, Địa chỉ.

#### 3.2. Logic nghiệp vụ (Business Logic)
* **Tính toán tồn kho:** `stock_quantity` tăng khi nhập hàng và tự động giảm khi có đơn hàng `Success` (được xử lý trong `SRS_SALE_02`).
* **Ràng buộc SKU:** Mỗi biến thể phải có một mã SKU duy nhất để phục vụ việc quét mã hoặc tìm kiếm kho nhanh.
* **Giá biến thể:** Cho phép giá của Size XL cao hơn Size S nếu Quản lý thiết lập.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Phân quyền:** Chỉ `Admin` và `Staff` mới có quyền truy cập các API `/api/admin/*`.
* **Tính toàn vẹn:** Khi xóa một `Category`, hệ thống phải cảnh báo nếu đang có `Products` thuộc danh mục đó.
* **Hình ảnh:** Hỗ trợ upload nhiều ảnh cho một sản phẩm thông qua thư viện xử lý file của ASP.NET Core.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Nhập số lượng âm** | Hệ thống chặn và báo lỗi: "Số lượng nhập kho phải lớn hơn 0". |
| **Trùng mã SKU** | Thông báo: "Mã SKU này đã tồn tại, vui lòng kiểm tra lại". |
| **Sản phẩm đang có đơn hàng** | Không cho phép xóa sản phẩm nếu nó đang nằm trong các đơn hàng chưa hoàn thành. |

### 6. Giao diện (UI/UX)
* **Inventory Dashboard:** Bảng (Table) hiển thị danh sách, hỗ trợ tìm kiếm theo tên hoặc SKU.
* **Color Picker:** Giao diện chọn màu trực quan cho các biến thể.
* **Stock Alert Badge:** Hiển thị nhãn "Sắp hết hàng" hoặc "Hết hàng" nổi bật để Admin dễ theo dõi.


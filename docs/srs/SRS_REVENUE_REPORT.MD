# 📘 Software Requirement Specification (SRS)
## Chức năng: Báo cáo & Thống kê doanh thu (Revenue Reporting)
**Mã chức năng:** ADM-03  
**Trạng thái:** Review  
**Người soạn thảo:** [Đặng Thị Quỳnh]  
**Vai trò:** Developer   
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp cái nhìn tổng thể về tình hình kinh doanh của cửa hàng thông qua các số liệu thống kê và biểu đồ trực quan. Hệ thống giúp Admin theo dõi doanh thu, lợi nhuận, số lượng đơn hàng và xác định các mặt hàng bán chạy nhất để đưa ra chiến lược nhập hàng phù hợp.

### 2. Luồng nghiệp vụ (Admin Workflow)

| Bước | Hành động quản lý | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang "Báo cáo doanh thu" | Hiển thị Dashboard tổng quan (Doanh thu tháng này, Đơn hàng mới). |
| 2 | Chọn khoảng thời gian (Từ ngày - Đến ngày) | Hệ thống truy vấn bảng `orders` lọc theo `order_date` và `status = 'Success'`. |
| 3 | Xem biểu đồ tăng trưởng | Hiển thị biểu đồ đường (Line Chart) theo ngày hoặc tháng. |
| 4 | Xem danh sách sản phẩm bán chạy | Truy vấn bảng `order_items` JOIN `products`, sắp xếp theo `SUM(quantity)` giảm dần. |
| 5 | Xuất báo cáo (Tùy chọn) | Xuất dữ liệu ra file Excel hoặc PDF để lưu trữ ngoại tuyến. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Các chỉ số quan trọng (KPIs)
* **Tổng doanh thu:** `SUM(total_amount)` từ các đơn hàng có trạng thái thành công.
* **Số lượng đơn hàng:** Đếm tổng số bản ghi trong bảng `orders` theo mốc thời gian.
* **Giá trị trung bình đơn (AOV):** `Tổng doanh thu / Tổng đơn hàng`.
* **Sản phẩm phổ biến:** Top 5 sản phẩm có số lượng bán ra cao nhất trong bảng `order_items`.

#### 3.2. Logic truy vấn (Query Logic)
* **Lọc theo trạng thái:** Chỉ những đơn hàng có `status = 'Success'` mới được tính vào doanh thu thực tế. Các đơn `Cancel` hoặc `Pending` không được tính.
* **Thời gian thực:** Dữ liệu phải được cập nhật ngay lập tức khi một đơn hàng được nhân viên xác nhận thành công.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Phân quyền:** Chỉ duy nhất Actor `Admin` mới có quyền truy cập vào các API báo cáo tài chính.
* **Hiệu suất:** Với dữ liệu lớn, sử dụng `Index` cho cột `order_date` và `status` trong MySQL để tăng tốc độ truy vấn.
* **Thư viện hiển thị:** Sử dụng **Chart.js** hoặc **Recharts** trong React để vẽ biểu đồ từ dữ liệu JSON nhận được từ Backend.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Không có dữ liệu trong kỳ** | Hiển thị thông báo: "Không có giao dịch nào phát sinh trong khoảng thời gian này". |
| **Khoảng thời gian sai (Ngày kết thúc < Ngày bắt đầu)** | Hiển thị lỗi: "Ngày kết thúc phải lớn hơn ngày bắt đầu". |
| **Dữ liệu đơn hàng bị lỗi** | Loại bỏ các đơn hàng có `total_amount <= 0` khỏi báo cáo để tránh sai lệch. |

### 6. Giao diện (UI/UX)
* **Dashboard Widgets:** Các ô thông số (Card) nằm trên cùng (Doanh thu, Khách hàng mới, Đơn hàng).
* **Charts:** Biểu đồ cột (Bar Chart) cho doanh thu theo tháng và Biểu đồ tròn (Pie Chart) cho cơ cấu danh mục sản phẩm.
* **Data Table:** Danh sách chi tiết các đơn hàng thành công bên dưới biểu đồ.


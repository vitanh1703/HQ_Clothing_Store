# 📘 Software Requirement Specification (SRS)
## Chức năng: Báo cáo & Thống kê doanh thu (Revenue Reporting)
**Mã chức năng:** ADM-03  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Nguyễn Thị Hảo  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp cái nhìn tổng thể về tình hình kinh doanh của cửa hàng thông qua các số liệu thống kê và biểu đồ trực quan (Sử dụng thư viện Recharts). Hệ thống giúp Admin theo dõi doanh thu thực tế, số lượng đơn hàng đã hoàn tất và xác định các mặt hàng/danh mục bán chạy nhất để đưa ra chiến lược nhập hàng hoặc khuyến mãi phù hợp.

---

### 2. Luồng nghiệp vụ (Admin Workflow)

| Bước | Hành động của Admin | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập trang Dashboard Quản trị | Giao diện tự động gọi các API thống kê tổng quan. |
| 2 | Xem các chỉ số KPI | Hệ thống trả về Tổng doanh thu, Tổng đơn hàng, Số lượng Khách hàng và so sánh với kỳ trước. |
| 3 | Lọc theo thời gian (Filter) | Admin chọn mốc thời gian (Tuần này, Tháng này, Năm nay). Backend truy vấn bảng `orders` lọc theo `order_date` và `status`. |
| 4 | Xem biểu đồ tăng trưởng | Frontend sử dụng `recharts` để vẽ biểu đồ Cột/Đường (Bar/Line Chart) biểu diễn xu hướng doanh thu. |
| 5 | Xem danh sách sản phẩm bán chạy | Truy vấn `order_items` JOIN `product_variants` để tìm các SKU có `SUM(quantity)` cao nhất. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Các chỉ số quan trọng (KPIs)
* **Tổng doanh thu thực (Actual Revenue):** Tính bằng `SUM(total_amount)` của tất cả các đơn hàng có trạng thái là `Success`.
* **Tổng đơn hàng:** Tổng số `COUNT(id)` các đơn phát sinh, có thể phân loại theo `status` (Bao nhiêu đơn Thành công, Hủy, Đang giao).
* **Sản phẩm phổ biến (Top Selling):** Lấy danh sách biến thể bán chạy nhất thông qua `order_items`.

#### 3.2. Logic truy vấn (Query Logic)
* **Ghi nhận doanh thu:** Bắt buộc **chỉ** tính tổng `total_amount` của những đơn hàng `status = 'Success'`. Các đơn `Pending`, `Shipping` chỉ được tính vào Doanh thu dự kiến (Expected Revenue). Các đơn `Cancel` không được tính.
* **Thời điểm ghi nhận:** Dựa vào `order_date` (Hoặc `payment_date` nếu là đơn thanh toán VNPAY/VietQR).

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Phân quyền (Authorization):** Chỉ duy nhất Actor có role `Admin` hoặc `Staff` mới có quyền gọi các API Thống kê (`/api/admin/dashboard/...`).
* **Tối ưu truy vấn (Performance):** Backend nên thiết kế DTO gộp (Aggregation) dùng `GROUP BY` để trả về dữ liệu nhỏ gọn cho biểu đồ, tránh việc gửi mảng hàng ngàn đơn hàng xuống Frontend để tính toán.
* **Thư viện Giao diện:** Bắt buộc sử dụng `recharts` (đã cài đặt trong `package.json` của React) để render biểu đồ nhằm đảm bảo tính đồng bộ và Responsive trên Mobile.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Không có dữ liệu trong kỳ** | Biểu đồ hiển thị Empty State (Màn hình trống) kèm dòng chữ: "Chưa có dữ liệu thống kê cho khoảng thời gian này." |
| **Lọc sai khoảng thời gian (Ngày kết thúc < Ngày bắt đầu)** | Frontend chặn ngay tại DatePicker, báo lỗi và không gọi API. |
| **Sản phẩm bị xóa nhưng vẫn còn trong báo cáo cũ** | SQL JOIN với bảng `products` có thể trả về null, Frontend phải sử dụng giá trị fallback (VD: "Sản phẩm đã xóa") để báo cáo không bị gián đoạn. |

---

### 6. Giao diện (UI/UX)
* **Cards (Chỉ số tóm tắt):** Bố trí 4 thẻ ngang trên cùng: Tổng doanh thu (màu xanh lá), Đơn hàng chờ xử lý (màu vàng), Tổng số khách (màu xanh dương), Đơn đã hủy (màu đỏ).
* **Biểu đồ Khu vực (Area Chart / Bar Chart):** Hiển thị doanh thu theo các ngày trong tháng. Trục X là Ngày, Trục Y là số tiền (VNĐ). Khi Hover vào sẽ hiện Tooltip chi tiết.
* **Bảng Top Sản phẩm:** Bên cạnh hoặc bên dưới biểu đồ, hiển thị Top 5 hoặc Top 10 sản phẩm đóng góp nhiều doanh thu nhất.

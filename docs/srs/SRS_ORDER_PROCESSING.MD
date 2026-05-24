# 📘 Software Requirement Specification (SRS)
## Chức năng: Xử lý & Quản lý đơn hàng (Order Processing)
**Mã chức năng:** ORD-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Nguyễn Thị Hảo  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp công cụ toàn diện cho Ban Quản trị (Admin) và Nhân viên (Staff) để tiếp nhận, theo dõi và cập nhật trạng thái đơn hàng. Hệ thống kiểm soát chặt chẽ vòng đời của một đơn hàng từ khi `Pending` (Chờ xử lý) cho đến khi `Success` (Thành công) hoặc `Cancel` (Hủy), kết hợp với Background Service tự động dọn dẹp các đơn hàng rác/chưa thanh toán.

---

### 2. Luồng nghiệp vụ (Staff Workflow)

| Bước | Hành động nhân viên / Hệ thống | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập Dashboard "Quản lý Đơn hàng" | Hiển thị danh sách các đơn hàng mới nhất với trạng thái `Pending`. |
| 2 | Xét duyệt & Đóng gói | Nhân viên kiểm tra thông tin khách hàng (Tên, SĐT, Địa chỉ). |
| 3 | Chuyển trạng thái sang "Đang giao" | Admin cập nhật `status = 'Shipping'`. (Nếu là VNPAY, Webhook/IPN có thể tự động cập nhật). |
| 4 | Cập nhật "Giao thành công" | Admin cập nhật `status = 'Success'`. Ghi nhận doanh thu chính thức. |
| 5 | Xử lý Hủy đơn (Thủ công) | Nếu khách yêu cầu hủy hoặc Boom hàng, nhân viên chuyển `status = 'Cancel'`. Kho được hoàn lại. |
| 6 | **Tự động hủy đơn (Hệ thống)** | Background Job `UnpaidOrdersCleanupService` chạy ngầm lúc 5:00 sáng mỗi ngày, tự động chuyển `Cancel` và xóa các đơn `Pending` quá 24h. |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu Bảng `orders`
* **Mã đơn hàng:** `order_code` (VD: HQ2604100902115).
* **Thông tin khách:** `full_name`, `phone`, `email`, `address`.
* **Tổng tiền:** `total_amount` (đã áp dụng khuyến mãi).
* **Trạng thái:** `status` (Enum: `Pending`, `Shipping`, `Success`, `Cancel`).
* **Thời gian:** `order_date` (Ngày đặt) và `payment_date` (Ngày thanh toán online).

#### 3.2. Logic chuyển đổi trạng thái (Status Logic)
* **Pending -> Shipping:** Hàng đã xuất kho, giao cho đơn vị vận chuyển.
* **Shipping -> Success:** Khách đã nhận hàng và thanh toán (với COD).
* **Bất kỳ -> Cancel:** Đơn hàng bị hủy. Hệ thống thực hiện Rollback: Trả lại `stock_quantity` vào bảng `product_variants`.

---

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Tự động hóa dọn rác (Cron Job):** Hệ thống tích hợp `BackgroundService` trong .NET (chạy đa luồng) để tự động xóa đơn chưa thanh toán sau 24h, giúp giải phóng lượng tồn kho ảo bị chiếm dụng.
* **Toàn vẹn dữ liệu:** Không cho phép Nhân viên/Admin xóa trực tiếp đơn hàng thành công khỏi Database để phục vụ việc đối soát doanh thu. Chỉ thao tác trên trạng thái.
* **Bảo mật:** API `/api/admin/orders` được bảo vệ bởi JWT Token, chỉ có Role `Admin` hoặc `Staff` mới được gọi.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Khách đổi ý muốn đổi Size/Màu** | Admin có quyền từ chối nếu đơn đã ở trạng thái `Shipping`. Nếu ở `Pending`, có thể hủy đơn để khách đặt lại. |
| **Khách thanh toán VNPAY lỗi mạng** | Đơn hàng treo ở `Pending`. Sau 24h hệ thống tự động quét và thu hồi tồn kho (nhờ `UnpaidOrdersCleanupService`). |
| **Lỗi cập nhật đồng thời (Concurrency)** | Sử dụng EF Core Transaction để đảm bảo nếu đổi trạng thái lỗi, kho sẽ không bị trừ/cộng sai lệch. |

---

### 6. Giao diện (UI/UX)
* **Data Table trực quan:** Bảng quản lý đơn hàng hỗ trợ phân trang (Pagination), tìm kiếm theo `order_code` hoặc `phone`.
* **Huy hiệu trạng thái (Status Badge):** 
  * 🟡 `Pending` (Chờ xử lý)
  * 🔵 `Shipping` (Đang giao)
  * 🟢 `Success` (Thành công)
  * 🔴 `Cancel` (Đã hủy)
* **Order Detail Modal:** Click vào mỗi đơn hàng sẽ hiện Popup chi tiết các món đồ (`order_items`) kèm giá tiền tại thời điểm mua (`price_at_purchase`).

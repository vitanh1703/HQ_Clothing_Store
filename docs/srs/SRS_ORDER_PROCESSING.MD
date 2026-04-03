#  Software Requirement Specification (SRS)
## Chức năng: Xử lý & Quản lý đơn hàng (Order Processing)
**Mã chức năng:** ADM-02  
**Trạng thái:** Review  
**Người soạn thảo:** [Nguyễn Thị Hảo] 
**Vai trò:** Developer   
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Cung cấp công cụ cho Nhân viên và Quản lý để tiếp nhận, xác nhận và cập nhật lộ trình của đơn hàng. Hệ thống quản lý chặt chẽ các trạng thái từ lúc khách đặt hàng cho đến khi hàng đến tay người dùng hoặc bị hoàn trả.

### 2. Luồng nghiệp vụ (Staff Workflow)

| Bước | Hành động nhân viên | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập danh sách "Đơn hàng mới" | Hiển thị các đơn hàng có trạng thái `Pending`. |
| 2 | Kiểm tra thông tin & Gọi điện xác nhận | Xem chi tiết địa chỉ, SĐT và các món đồ khách đặt. |
| 3 | Chuyển trạng thái sang "Đang giao" | Cập nhật `status = 'Shipping'`. In hóa đơn bán hàng. |
| 4 | Cập nhật "Giao thành công" | Cập nhật `status = 'Success'`. Ghi nhận doanh thu vào hệ thống. |
| 5 | Xử lý Hủy đơn | Nếu khách hủy hoặc không liên lạc được, chuyển `status = 'Cancel'`. |
| 6 | Hoàn kho (Nếu hủy) | Hệ thống tự động cộng lại số lượng vào `stock_quantity` trong bảng `product_variants`. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Hiển thị danh sách đơn hàng
* **Mã đơn hàng:** `id` từ bảng `orders`.
* **Thông tin khách:** Tên, SĐT, Email (JOIN từ bảng `users`).
* **Tổng tiền:** `total_amount` (đã bao gồm giảm giá).
* **Trạng thái hiện tại:** `Pending`, `Shipping`, `Success`, `Cancel`.

#### 3.2. Logic chuyển đổi trạng thái (Status Logic)
* **Pending -> Shipping:** Nhân viên đã đóng gói và gửi hàng cho đơn vị vận chuyển.
* **Shipping -> Success:** Khách đã nhận hàng và thanh toán (nếu là COD).
* **Shipping/Pending -> Cancel:** Khách đổi ý hoặc giao hàng thất bại. **Lưu ý:** Chỉ khi chuyển về `Cancel`, hệ thống mới thực hiện hoàn kho.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Quyền hạn:** Khách hàng chỉ được xem đơn của mình. Nhân viên/Admin được xem và sửa trạng thái của tất cả đơn hàng.
* **Tính bất biến:** Không được phép xóa (Delete) đơn hàng khỏi CSDL để phục vụ việc đối soát tài chính. Chỉ được phép thay đổi trạng thái.
* **Audit Log:** (Tùy chọn) Lưu lại thông tin nhân viên nào đã thực hiện thay đổi trạng thái đơn hàng để quản lý trách nhiệm.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Khách yêu cầu sửa địa chỉ** | Cho phép Nhân viên sửa trực tiếp trong bảng `orders` nếu đơn hàng vẫn ở trạng thái `Pending`. |
| **Khách muốn thêm sản phẩm** | Yêu cầu hủy đơn cũ và tạo đơn mới (để đảm bảo tính nhất quán của hóa đơn). |
| **Giao hàng thất bại nhiều lần** | Hệ thống gợi ý chuyển trạng thái đơn hàng sang `Cancel` và hoàn kho. |

### 6. Giao diện (UI/UX)
* **Order List Table:** Hỗ trợ lọc theo Ngày đặt, Trạng thái và tìm kiếm theo Mã đơn hàng/SĐT khách.
* **Status Badge:** Sử dụng màu sắc để phân biệt (Vàng: Đang chờ, Xanh dương: Đang giao, Xanh lá: Thành công, Đỏ: Đã hủy).
* **Invoice View:** Giao diện xem trước hóa đơn để in ra dán lên gói hàng.


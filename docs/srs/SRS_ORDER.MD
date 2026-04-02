# Software Requirement Specification (SRS)

## Chức năng: Quản lý & Theo dõi đơn hàng (Order Tracking)
**Mã chức năng:** ORDER-05  
**Trạng thái:** Draft / Review  
**Người soạn thảo:** [Đặng Thị Quỳnh]  
**Vai trò:** Developer

---

### 1. Mô tả tổng quan (Description)
Cung cấp khả năng giám sát vòng đời của một đơn hàng từ khi khởi tạo đến khi hoàn tất. Cho phép Khách hàng nắm bắt lộ trình hàng hóa và Admin kiểm soát luồng vận hành, đảm bảo tính chính xác giữa dữ liệu đơn hàng và số lượng tồn kho thực tế.

---

### 2. Luồng nghiệp vụ (User Workflow)

#### 2.1. Phía Khách hàng (Customer)
| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập "Lịch sử đơn hàng" | Liệt kê danh sách các đơn hàng đã đặt (mới nhất lên đầu). |
| 2 | Nhấn vào một đơn hàng cụ thể | Hiển thị chi tiết: Sản phẩm, giá, địa chỉ và Trạng thái hiện tại. |
| 3 | Nhấn "Hủy đơn" (Chỉ khi trạng thái là `Pending`) | Gửi yêu cầu hủy đơn, cập nhật trạng thái đơn thành `Cancelled`. |

#### 2.2. Phía Quản trị viên (Admin/Staff)
| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Xem danh sách đơn hàng tổng | Lọc đơn hàng theo trạng thái (Chờ duyệt, Đang giao, v.v.). |
| 2 | Duyệt đơn & Nhập mã vận đơn | Cập nhật trạng thái sang `Shipping`, lưu thông tin đối tác giao hàng. |
| 3 | Xác nhận "Đã giao hàng" | Hệ thống tự động kiểm tra và trừ số lượng sản phẩm trong kho (Inventory Update). |

---

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Các trạng thái đơn hàng (Order Statuses)
* **Pending (Chờ xử lý):** Đơn hàng mới tạo, khách có quyền tự hủy.
* **Confirmed (Đã xác nhận):** Admin đã kiểm tra kho và chấp nhận đơn.
* **Shipping (Đang giao):** Hàng đã giao cho đơn vị vận chuyển, có mã vận đơn.
* **Delivered (Đã giao):** Khách đã nhận hàng thành công.
* **Cancelled (Đã hủy):** Đơn bị hủy bởi khách hoặc Admin.

#### 3.2. Dữ liệu lưu trữ (Database - Bảng `orders` & `order_logs`)
* `order_status`: string, lưu trạng thái hiện tại.
* `tracking_number`: string, mã vận đơn từ nhà vận chuyển.
* `shipped_date`: datetime, thời điểm bắt đầu giao hàng.
* `delivery_date`: datetime, thời điểm hoàn tất đơn hàng.

---

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Tự động hóa tồn kho:** Khi `order_status` chuyển sang `Delivered`, hệ thống phải thực hiện trừ số lượng tương ứng trong bảng `product_variants`.
* **Tính toàn vẹn:** Sử dụng **Database Transaction** để đảm bảo: Nếu việc trừ kho thất bại, trạng thái đơn hàng không được phép chuyển sang `Delivered`.
* **Thông báo:** Tự động gửi Email/Thông báo hệ thống cho khách hàng mỗi khi trạng thái đơn hàng thay đổi.
* **Quyền hạn:** Khách hàng chỉ xem được đơn của chính mình (kiểm tra `customer_id` qua Token). Admin/Staff xem được toàn bộ.

---

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)
* **Trường hợp:** Khách hàng yêu cầu hủy đơn khi hàng đã ở trạng thái `Shipping`.  
    * *Xử lý:* Hệ thống không cho phép khách tự hủy. Hiển thị thông báo: "Đơn hàng đã được gửi đi, vui lòng liên hệ hotline để được hỗ trợ".
* **Trường hợp:** Sản phẩm trong kho bị hư hỏng/hết hàng đột xuất sau khi khách đã đặt.  
    * *Xử lý:* Admin thực hiện hủy đơn và nhập lý do "Hết hàng". Hệ thống gửi thông báo xin lỗi và hoàn tiền (nếu đã thanh toán trước).
* **Trường hợp:** Lỗi kết nối khi cập nhật trạng thái đơn hàng.  
    * *Xử lý:* Hiển thị lỗi "Cập nhật thất bại, vui lòng kiểm tra lại kết nối". Không thực hiện trừ kho nếu trạng thái chưa cập nhật thành công.

---

### 6. Giao diện (UI/UX)
* **Thanh tiến trình (Progress Bar):** Hiển thị trực quan lộ trình đơn hàng cho khách (ví dụ: Đặt hàng -> Xác nhận -> Đang giao -> Thành công).
* **Màu sắc trạng thái:** * Xanh lá: Đã giao thành công.
    * Cam/Vàng: Đang xử lý hoặc Đang giao.
    * Đỏ: Đơn đã hủy.
* **Chi tiết đơn hàng:** Hiển thị ảnh thumbnail nhỏ của từng món đồ để khách dễ nhận diện.

---
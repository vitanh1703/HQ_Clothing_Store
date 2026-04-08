---

# 👕 H&Q Clothing Store - Website Bán Quần Áo Thời Trang

[![Framework](https://img.shields.io/badge/Framework-ASP.NET%20Core%209.0-purple)](https://dotnet.microsoft.com/)
[![Library](https://img.shields.io/badge/Library-React%2018-blue)](https://reactjs.org/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-MySQL-orange)](https://www.mysql.com/)

## 👥 Thành viên nhóm - Cửa hàng H&Q

| STT | Họ và Tên | MSSV | Vai trò chính |
| :--- | :--- | :--- | :--- |
| 1 | **Diêm Việt Anh** | 23810310083 | Fullstack Developer / Leader |
| 2 | **Nguyễn Thị Hảo** | 23810310152 | Frontend Developer / Designer |
| 3 | **Đặng Thị Quỳnh** | 23810310156 | Backend Developer / Tester |

---

## 📋 Mục lục
1. [Giới thiệu](#-giới-thiệu)
2. [Tính năng](#-tính-năng)
3. [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
4. [Cấu trúc dự án](#-cấu-trúc-dự-án)
5. [Cài đặt và chạy](#-cài-đặt-và-chạy)
6. [API Endpoints](#-api-endpoints)
7. [Tài liệu SRS](#-software-requirement-specifications-srs)

---

## 🌟 Giới thiệu
**H&Q Clothing Store** là nền tảng thương mại điện tử chuyên biệt cho ngành thời trang. Hệ thống tập trung vào trải nghiệm mua sắm hiện đại, tối ưu trên cả thiết bị di động và máy tính, hỗ trợ khách hàng mua sắm dễ dàng và giúp quản trị viên quản lý kho hàng hiệu quả.

---

## ✨ Tính năng

### 👤 Khách hàng
| Tính năng | Mô tả |
| :--- | :--- |
| **🛍️ Duyệt sản phẩm** | Xem danh sách quần áo theo danh mục (Nam, Nữ, Phụ kiện) |
| **🔍 Bộ lọc thông minh** | Lọc sản phẩm theo giá, kích thước (S, M, L, XL) và màu sắc |
| **🛒 Giỏ hàng** | Thêm/bớt sản phẩm, cập nhật số lượng và tính tổng tiền |
| **💳 Thanh toán** | Nhập thông tin giao hàng và chọn phương thức thanh toán |
| **📱 Tài khoản cá nhân** | Quản lý lịch sử đơn hàng và thông tin cá nhân |

### ⚙️ Quản trị (Admin)
| Tính năng | Mô tả |
| :--- | :--- |
| **📦 Quản lý sản phẩm** | Thêm, sửa, xóa sản phẩm và cập nhật số lượng tồn kho |
| **📋 Quản lý đơn hàng** | Theo dõi trạng thái đơn hàng (Chờ xử lý, Đang giao, Đã giao) |
| **📈 Báo cáo doanh thu** | Xem thống kê bán hàng theo ngày/tháng |

---

## 🛠 Công nghệ sử dụng

* **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React.
* **Backend:** ASP.NET Core 9.0 Web API, Entity Framework Core.
* **Database:** MySQL 8.0.
* **DevOps:** Docker, Docker Compose.

---

## 📁 Cấu trúc dự án

```bash
hq-clothing-store/
├── 📂 backend/                 # ASP.NET Core API
│   ├── Controllers/            # API Endpoints
│   ├── Models/                 # Entities
│   ├── DTOs/                   # Data Transfer Objects
│   └── Data/                   # DbContext & Migrations
├── 📂 frontend/                # React App
│   ├── 📂 src/
│   │   ├── 📂 components/      # UI Components
│   │   ├── 📂 pages/           # Screen Pages
│   │   └── 📂 services/        # API Calls (Axios)
└── docker-compose.yml          # Docker Configuration
```

---

## 🚀 Cài đặt và chạy

### 1️⃣ Clone dự án
```bash
git clone <repository-url>
cd hq-clothing-store
```

### 2️⃣ Cấu hình Database (MySQL)
Chỉnh sửa chuỗi kết nối trong `backend/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Port=3306;Database=hq_clothing_db;User=root;Password=your_password;"
}
```
*Chạy lệnh migration:* `dotnet ef database update`

### 3️⃣ Khởi chạy
* **Backend:** `cd backend && dotnet run`
* **Frontend:** `cd frontend && npm install && npm run dev`

---

## 📡 API Endpoints chính

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **GET** | `/api/products` | Lấy danh sách sản phẩm |
| **POST** | `/api/orders` | Tạo đơn hàng mới |
| **GET** | `/api/categories` | Lấy danh sách danh mục |

---

## 🐳 Triển khai với Docker (MySQL Ready)
Dự án đã được cấu hình sẵn `docker-compose.yml` để khởi chạy đồng thời cả API và MySQL Server:

```bash
docker-compose up -d
```

---

## 📄 Software Requirement Specifications (SRS)

### 📂 Danh sách tài liệu chi tiết

| Chức năng | Thành viên thực hiện | Link tài liệu |
| :--- | :--- | :--- |
| Đăng ký | Diêm Việt Anh | [Xem](docs/srs/SRS_REGISTER.MD) |
| Đăng nhập | Nguyễn Thị Hảo | [Xem](docs/srs/SRS_LOGIN.MD) |
| Quản lý hồ sơ | Đặng Thị Quỳnh | [Xem](docs/srs/SRS_PROFILE_MANAGEMENT.MD) |
| Quản lý sản phẩm | Đặng Thị Quỳnh | [Xem](docs/srs/SRS_PRODUCT.MD) |
| Danh mục sản phẩm | Diêm Việt Anh | [Xem](docs/srs/SRS_PRODUCT_CATALOG.MD) |
| Chi tiết sản phẩm | Nguyễn Thị Hảo | [Xem](docs/srs/SRS_PRODUCT_DETAIL.MD) |
| Đánh giá sản phẩm | Đặng Thị Quỳnh | [Xem](docs/srs/SRS_PRODUCT_REVIEW.MD) |
| Giỏ hàng | Đặng Thị Quỳnh | [Xem](docs/srs/SRS_SHOPPING_CART.MD) |
| Cart & Checkout | Diêm Việt Anh | [Xem](docs/srs/SRS_CART_CHECKOUT.MD) |
| Danh sách yêu thích | Nguyễn Thị Hảo | [Xem](docs/srs/SRS_WISH_LIST.MD) |
| Đơn hàng | Đặng Thị Quỳnh | [Xem](docs/srs/SRS_ORDER.MD) |
| Xử lý đơn hàng | Nguyễn Thị Hảo | [Xem](docs/srs/SRS_ORDER_PROCESSING.MD) |
| Thanh toán | Diêm Việt Anh | [Xem](docs/srs/SRS_CHECKOUT_PAYMENT.MD) |
| Mã khuyến mãi | Nguyễn Thị Hảo | [Xem](docs/srs/SRS_PROMOTION_CODE.MD) |
| Quản lý kho | Đặng Thị Quỳnh | [Xem](docs/srs/SRS_INVENTORY_MANAGEMENT.MD) |
| Báo cáo doanh thu | Đặng Thị Quỳnh | [Xem](docs/srs/SRS_REVENUE_REPORT.MD) |
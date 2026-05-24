# 👕 H&Q Clothing Store - Website Bán Quần Áo Thời Trang

[![Framework](https://img.shields.io/badge/Framework-ASP.NET%20Core%209.0-purple)](https://dotnet.microsoft.com/)
[![Library](https://img.shields.io/badge/Library-React%2018-blue)](https://reactjs.org/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-MySQL-orange)](https://www.mysql.com/)

**H&Q Clothing Store** là nền tảng thương mại điện tử chuyên biệt cho ngành thời trang. Hệ thống hỗ trợ khách hàng mua sắm trực tuyến dễ dàng và giúp quản trị viên quản lý kho hàng hiệu quả.

**Link deloy web** vitanh17.id.vn
---

## 📋 Mục lục
1. [Thành viên nhóm](#-thành-viên-nhóm)
2. [Giới thiệu](#-giới-thiệu)
3. [Tính năng](#-tính-năng)
4. [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
5. [Cấu trúc dự án](#-cấu-trúc-dự-án)
6. [Cài đặt và chạy](#-cài-đặt-và-chạy)
7. [API Endpoints](#-api-endpoints)

---

## 👥 Thành viên nhóm - Cửa hàng H&Q

| STT | Họ và Tên | MSSV | Nội dung thực hiện |
| :--- | :--- | :--- | :--- |
| 1 | **Diêm Việt Anh** | 23810310083 | Thanh toán VNPAY, Luồng đơn hàng, module Giỏ hàng và Deploy website |
| 2 | **Nguyễn Thị Hảo** | 23810310152 | Quản trị hệ thống (Admin), Xác thực qua mail, Module Chương trình Khuyến mãi |
| 3 | **Đặng Thị Quỳnh** | 23810310156 | Module Tin tức, Dịch vụ Tiện ích và Sản phẩm, Đăng nhập bằng Google |

---

## 🌟 Giới thiệu
Dự án **H&Q** tập trung vào trải nghiệm mua sắm hiện đại, tối ưu trên cả thiết bị di động và máy tính. Website cho phép người dùng duyệt sản phẩm theo danh mục, xem chi tiết kích thước/màu sắc và thực hiện quy trình thanh toán an toàn.

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
| **💬 Phản hồi** | Gửi đánh giá và bình luận cho từng sản phẩm |
| **💬 Chatbot** | Khách hàng có thể nhắn tin để tư vấn sản phẩm, chọn size, hỗ trợ đặt hàng và giải đáp thắc mắc nhanh chóng 24/7. |

### ⚙️ Quản trị (Admin)
| Tính năng | Mô tả |
| :--- | :--- |
| **👥 Quản lý khách hàng** | Theo dõi, cập nhật và quản lý thông tin khách hàng trong hệ thống |
| **📦 Quản lý nhà cung cấp** | Thêm, sửa, xóa và quản lý thông tin nhà cung cấp sản phẩm |
| **📦 Quản lý sản phẩm** | Thêm, sửa, xóa sản phẩm và cập nhật số lượng tồn kho |
| **📋 Quản lý đơn hàng** | Theo dõi trạng thái đơn hàng (Chờ xử lý, Đang giao, Đã giao) |
| **📈 Báo cáo doanh thu** | Xem thống kê bán hàng theo ngày/tháng |
| **🏷️ Quản lý khuyến mại** | Tạo và quản lý các chương trình giảm giá, ưu đãi sản phẩm |
| **📚 Quản lý kho** | Kiểm tra số lượng tồn kho và cập nhật trạng thái hàng hóa |
| **📰 Quản lý tin tức** | Đăng tải, chỉnh sửa và quản lý các bài viết tin tức |

---

## 🛠 Công nghệ sử dụng

### Frontend
- **React 18** & **TypeScript**
- **Tailwind CSS** (Giao diện chuẩn Responsive)
- **Lucide React** (Icons hệ thống)

### Backend
- **ASP.NET Core 9.0 Web API**
- **Entity Framework Core** (Pomelo.EntityFrameworkCore.MySql)
- **MySQL 8.0**

---

## 📁 Cấu trúc dự án

```bash
hq-clothing-store/
├── 📂 backend/                 # ASP.NET Core API
│   ├── Controllers/            # API cho Products, Orders, Users...
│   ├── Models/                 # Entities (Product, Category, Order...)
│   ├── DTOs/                   # Data Transfer Objects
│   └── Data/                   # DbContext & Seeding Data (MySQL Config)
├── 📂 frontend/                # React App
│   ├── 📂 src/
│   │   ├── 📂 components/      # Navbar, ProductCard, Cart, Checkout...
│   │   ├── 📂 pages/           # Home, ProductDetail, Profile...
│   │   └── 📂 services/        # Axios API Config
└── docker-compose.yml          # Triển khai với Docker (App + MySQL Server)

```
## 🚀 Cài đặt và chạy

Để khởi chạy dự án, hãy đảm bảo bạn đã cài đặt: **.NET 9 SDK**, **Node.js (v18+)** và **MySQL Server**.

### 1\. Clone dự án

```bash
git clone https://github.com/vitanh1703/HQ_Clothing_Store.git
cd hq-clothing-store
```

### 2. Cấu hình Cơ sở dữ liệu

1. **Tạo database trong MySQL**:
   Mở **MySQL Workbench** hoặc **Terminal** và chạy câu lệnh:
   ```sql
   CREATE DATABASE hq_clothing_db;
   ```

2. **Cập nhật chuỗi kết nối**:
   Mở file `backend/appsettings.json` và thay đổi thông tin `User` và `Password` theo cấu hình MySQL của bạn:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Port=3306;Database=hq_clothing_db;User=YOUR_USER;Password=YOUR_PASSWORD;"
   }
   ```

3. **Khởi tạo dữ liệu từ file SQL**:
   * Mở công cụ quản lý MySQL (như MySQL Workbench, Navicat hoặc phpMyAdmin).
   * Chọn database `hq_clothing_db` vừa tạo.
   * Sử dụng tính năng **Import** hoặc **Open SQL Script** để mở file database của dự án (ví dụ: `database.sql` hoặc file `.sql` tương ứng).
   * Nhấn **Execute** (hình tia sét) để tạo toàn bộ bảng và dữ liệu mẫu.

### 3\. Chạy Backend (API)

```bash
# Tại thư mục backend
dotnet run --urls "https://localhost:7137;http://localhost:5257"
```

### 4\. Chạy Frontend (UI)

Mở một terminal mới:

```bash
cd frontend
npm install
npm install recharts
npm run dev
```

*Truy cập website tại: `http://localhost:5173`*
---

## 📡 API Endpoints chính

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **GET** | `/api/products` | Lấy danh sách sản phẩm |
| **GET** | `/api/products/{id}` | Xem chi tiết sản phẩm |
| **POST** | `/api/orders` | Tạo đơn hàng mới |
| **GET** | `/api/categories` | Lấy danh sách danh mục |

---

---
##  Software Requirement Specifications (SRS)

## 📂 Danh sách tài liệu

| Chức năng | Tên  | Ngày thực hiện | Link |
|----------|-------------|----------------|------|
| Đăng ký | Diêm Việt Anh | ... | [Xem](docs/srs/SRS_REGISTER.MD) |
| Đăng nhập | Nguyễn Thị Hảo | ... | [Xem](docs/srs/SRS_LOGIN.MD) |
| Quản lý hồ sơ | Đặng Thị Quỳnh | ... | [Xem](docs/srs/SRS_PROFILE_MANAGEMENT.MD) |
| Quản lý sản phẩm | Đặng Thị Quỳnh | ... | [Xem](docs/srs/SRS_PRODUCT.MD) |
| Danh mục sản phẩm | Diêm Việt Anh | ... | [Xem](docs/srs/SRS_PRODUCT_CATALOG.MD) |
| Chi tiết sản phẩm | Nguyễn Thị Hảo | ... | [Xem](docs/srs/SRS_PRODUCT_DETAIL.MD) |
| Đánh giá sản phẩm | Đặng Thị Quỳnh | ... | [Xem](docs/srs/SRS_PRODUCT_REVIEW.MD) |
| Giỏ hàng | Đặng Thị Quỳnh | ... | [Xem](docs/srs/SRS_SHOPPING_CART.MD) |
| Cart & Checkout | Diêm Việt Anh | ... | [Xem](docs/srs/SRS_CART_CHECKOUT.MD) |
| Danh sách yêu thích | Nguyễn Thị Hảo | ... | [Xem](docs/srs/SRS_WISH_LIST.MD) |
| Đơn hàng | Đặng Thị Quỳnh | ... | [Xem](docs/srs/SRS_ORDER.MD) |
| Xử lý đơn hàng | Nguyễn Thị Hảo | ... | [Xem](docs/srs/SRS_ORDER_PROCESSING.MD) |
| Thanh toán | Diêm Việt Anh | ... | [Xem](docs/srs/SRS_CHECKOUT_PAYMENT.MD) |
| Mã khuyến mãi | Nguyễn Thị Hảo | ... | [Xem](docs/srs/SRS_PROMOTION_CODE.MD) |
| Quản lý kho | Đặng Thị Quỳnh | ... | [Xem](docs/srs/SRS_INVENTORY_MANAGEMENT.MD) |
| Báo cáo doanh thu | Đặng Thị Quỳnh | ... | [Xem](docs/srs/SRS_REVENUE_REPORT.MD) |

# 👕 H&Q Clothing Store - Website Bán Quần Áo Thời Trang

[![Framework](https://img.shields.io/badge/Framework-ASP.NET%20Core%209.0-purple)](https://dotnet.microsoft.com/)
[![Library](https://img.shields.io/badge/Library-React%2018-blue)](https://reactjs.org/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-MySQL-orange)](https://www.mysql.com/)

**H&Q Clothing Store** là nền tảng thương mại điện tử chuyên biệt cho ngành thời trang. Hệ thống hỗ trợ khách hàng mua sắm trực tuyến dễ dàng và giúp quản trị viên quản lý kho hàng hiệu quả.

---

## 📋 Mục lục
1. [Giới thiệu](#-giới-thiệu)
2. [Tính năng](#-tính-năng)
3. [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
4. [Cấu trúc dự án](#-cấu-trúc-dự-án)
5. [Cài đặt và chạy](#-cài-đặt-và-chạy)
6. [API Endpoints](#-api-endpoints)
7. [Thành viên nhóm](#-thành-viên-nhóm)

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

### ⚙️ Quản trị (Admin)
| Tính năng | Mô tả |
| :--- | :--- |
| **📦 Quản lý sản phẩm** | Thêm, sửa, xóa sản phẩm và cập nhật số lượng tồn kho |
| **📋 Quản lý đơn hàng** | Theo dõi trạng thái đơn hàng (Chờ xử lý, Đang giao, Đã giao) |
| **📈 Báo cáo doanh thu** | Xem thống kê bán hàng theo ngày/tháng |

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

### 1️⃣ Clone dự án
```bash
git clone <repository-url>
cd hq-clothing-store
```

### 2️⃣ Cấu hình Database (MySQL)
Chỉnh sửa chuỗi kết nối trong `backend/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Port=3306;Database=hq_store_db;User=root;Password=your_password;"
}
```
*Chạy lệnh migration:* `dotnet ef database update`

### 3️⃣ Khởi chạy
- **Backend:** `cd backend && dotnet run`
- **Frontend:** `cd frontend && npm install && npm run dev`

---

## 📡 API Endpoints chính

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **GET** | `/api/products` | Lấy danh sách sản phẩm |
| **GET** | `/api/products/{id}` | Xem chi tiết sản phẩm |
| **POST** | `/api/orders` | Tạo đơn hàng mới |
| **GET** | `/api/categories` | Lấy danh sách danh mục |

---

## 🐳 Triển khai với Docker (MySQL Ready)
Dự án đã được cấu hình sẵn `docker-compose.yml` để khởi chạy đồng thời cả API và MySQL Server:
```bash
# Khởi động hệ thống
docker-compose up -d --build
```

---

## 👥 Thành viên nhóm - Cửa hàng H&Q

| STT | Họ và Tên | MSSV |
| :--- | :--- | :--- |
| 1 | **Diêm Việt Anh** | 23810310083 |
| 2 | **Nguyễn Thị Hảo** | 23810310152 |
| 3 | **Đặng Thị Quỳnh** | 23810310156 |

---

## 📘 Software Requirement Specifications (SRS)

### 🔐 Authentication
- [User Login (AUTH-02)](docs/SRS/SRS_Login.md)

---

## 📂 Danh sách tài liệu

| ID | Chức năng | Link |
|----|----------|------|
| AUTH-02 | Đăng nhập | [Xem](docs/SRS/SRS_LOGIN.MD) |
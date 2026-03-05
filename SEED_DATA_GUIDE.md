# Database Seeding Guide

Tệp `seed.js` chứa toàn bộ dữ liệu test cho hệ thống e-commerce VNTechWeb.

## 📋 Dữ Liệu Test Bao Gồm

| Model | Số lượng | Ghi chú |
|-------|---------|--------|
| Region | 3 | Bắc, Trung, Nam |
| Brand | 4 | Apple, Samsung, Xiaomi, Sony |
| Category | 4 | Điện thoại, Laptop, Phụ kiện, Gopro |
| Product | 4 | iPhone 15 Pro, Galaxy S24, Xiaomi 14, MacBook Pro |
| ProductVariant | 4 | Các variant khác nhau của sản phẩm |
| Province | 12 | Các tỉnh thành Việt Nam |
| Ward | 8 | Các phường xã |
| Warehouse | 3 | Kho Bắc, Trung, Nam |
| Inventory | 4 | Tồn kho per warehouse |
| ShippingMethod | 3 | Tiêu chuẩn, Nhanh, Hỏa tốc |
| ShippingMethodRegion | 8 | Chi phí vận chuyển theo vùng |
| Voucher | 3 | Mã giảm giá khác nhau |
| User | 3 | 2 khách hàng + 1 admin |
| UserAddress | 3 | Địa chỉ giao hàng |
| Cart | 2 | Giỏ hàng của 2 người dùng |
| CartItem | 3 | Sản phẩm trong giỏ |
| Order | 2 | Đơn hàng mẫu |
| OrderDetail | 3 | Chi tiết từng sản phẩm trong đơn |
| Payment | 2 | Thông tin thanh toán |
| OrderStatusHistory | 5 | Lịch sử trạng thái đơn hàng |
| FlashSale | 2 | Flash sale |
| FlashSaleItem | 2 | Sản phẩm trong flash sale |
| Review | 2 | Đánh giá sản phẩm |
| VoucherProduct | 4 | Liên kết voucher-sản phẩm |
| UsedVoucher | 1 | Lịch sử sử dụng voucher |

## 🚀 Cách Chạy

### 1. Cập nhật `package.json`

Thêm script seed vào `package.json`:

```json
{
  "scripts": {
    "seed": "node app/seeds/seed.js"
  }
}
```

### 2. Chạy Seed

```bash
npm run seed
```

Hoặc chạy trực tiếp:

```bash
node app/seeds/seed.js
```

### 3. Cấu hình MongoDB URI (tuỳ chọn)

Mặc định script sẽ kết nối tới `mongodb://localhost:27017/vntechweb`

Để thay đổi, set biến môi trường:

```bash
MONGODB_URI=mongodb://your-server:27017/your-db npm run seed
```

Hoặc tạo file `.env` và thêm:

```
MONGODB_URI=mongodb://localhost:27017/vntechweb
```

## 📝 Chi Tiết Dữ Liệu Test

### Người Dùng (Users)

1. **Khách hàng 1 - Nguyễn Văn A**
   - Email: `nguyenvana@example.com`
   - Vùng: Bắc (Hà Nội)
   - Vai trò: Khách hàng
   - Địa chỉ: Hoàn Kiếm, Hà Nội

2. **Khách hàng 2 - Trần Thị B**
   - Email: `tranthib@example.com`
   - Vùng: Nam (TP. Hồ Chí Minh)
   - Vai trò: Khách hàng
   - Địa chỉ: Q1, Q3 TP.HCM

3. **Admin**
   - Email: `admin@vntechweb.com`
   - Vai trò: Admin
   - Vùng: Bắc

### Sản Phẩm (Products)

1. **iPhone 15 Pro** - 24.990.000đ
   - Variant: 128GB, 256GB
   - Tồn kho: 50 | Đã bán: 120

2. **Galaxy S24** - 19.990.000đ
   - Variant: 8GB, 12GB
   - Tồn kho: 60 | Đã bán: 150

3. **Xiaomi 14** - 12.990.000đ
   - Variant: Đen, Trắng
   - Tồn kho: 100 | Đã bán: 200

4. **MacBook Pro 16** - 42.990.000đ
   - Variant: M3 Max với 18GB, 36GB RAM
   - Tồn kho: (tùy kho)

### Đơn Hàng (Orders)

1. **ORD001 - Nguyễn Văn A**
   - Trạng thái: Đang xử lý
   - Tổng tiền: ~70.980.000đ (sau giảm)
   - Voucher: GIAM10 (-4.999.000đ)
   - Phương thức: COD

2. **ORD002 - Trần Thị B**
   - Trạng thái: Hoàn thành
   - Tổng tiền: 25.980.000đ (2x Xiaomi 14)
   - Phương thức: Credit Card

### Mã Giảm Giá (Vouchers)

1. **GIAM10** - Giảm 10% tất cả sản phẩm
   - Hiệu lực: 01/03/2025 - 31/03/2025
   - Số lượng: 1000

2. **GIAM50K** - Giảm 50.000đ cho đơn từ 500k
   - Hiệu lực: 01/02/2025 - 31/12/2025
   - Đã sử dụng: 120/500

3. **VIP20** - VIP Giảm 20%
   - Hiệu lực: 01/01/2025 - 31/12/2025
   - Đã sử dụng: 25/100

## ⚠️ Lưu Ý

- Script sẽ **xoá toàn bộ dữ liệu cũ** trước khi seed
- Kết nối MongoDB phải hoạt động trước khi chạy
- Mật khẩu người dùng (mat_khau) là placeholder, cần cập nhật trong ứng dụng thực tế
- Các tệp hình ảnh sử dụng placeholder URLs, thay bằng URL thực tế khi cần

## 🔄 Cập nhật/Mở rộng Seed Data

Để thêm dữ liệu mới, chỉnh sửa các section tương ứng trong `seed.js`:

```javascript
// Ví dụ: Thêm brand mới
const brands = await BrandModel.insertMany([
  { ten_thuong_hieu: 'Brand Mới', ... }
]);
```

## 📞 Hỗ Trợ

Nếu gặp lỗi:
1. Kiểm tra MongoDB đã chạy hay chưa
2. Kiểm tra MONGODB_URI có đúng không
3. Xem lỗi chi tiết trong console
4. Đảm bảo tệp `app/model/index.js` được import đúng

import mongoose from 'mongoose';
import models from '../model/index.js';
import dotenv from 'dotenv';

dotenv.config();

const {
  RegionModel,
  BrandModel,
  CategoryModel,
  ProductModel,
  ProductVariantModel,
  FlashSaleModel,
  FlashSaleItemModel,
  ProvinceModel,
  WardModel,
  UserModel,
  UserAddressModel,
  WarehouseModel,
  InventoryModel,
  ShippingMethodModel,
  ShippingMethodRegionModel,
  VoucherModel,
  VoucherProductModel,
  FlashSaleOrderModel,
  UsedVoucherModel,
  CartModel,
  CartItemModel,
  OrderModel,
  OrderDetailModel,
  PaymentModel,
  OrderStatusHistoryModel,
  ReviewModel
} = models;

const MONGODB_URI = process.env.MongoDB_URL;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    // Clear existing data
    await Promise.all([
      RegionModel.deleteMany({}),
      BrandModel.deleteMany({}),
      CategoryModel.deleteMany({}),
      ProductModel.deleteMany({}),
      ProductVariantModel.deleteMany({}),
      FlashSaleModel.deleteMany({}),
      FlashSaleItemModel.deleteMany({}),
      ProvinceModel.deleteMany({}),
      WardModel.deleteMany({}),
      UserModel.deleteMany({}),
      UserAddressModel.deleteMany({}),
      WarehouseModel.deleteMany({}),
      InventoryModel.deleteMany({}),
      ShippingMethodModel.deleteMany({}),
      ShippingMethodRegionModel.deleteMany({}),
      VoucherModel.deleteMany({}),
      VoucherProductModel.deleteMany({}),
      FlashSaleOrderModel.deleteMany({}),
      UsedVoucherModel.deleteMany({}),
      CartModel.deleteMany({}),
      CartItemModel.deleteMany({}),
      OrderModel.deleteMany({}),
      OrderDetailModel.deleteMany({}),
      PaymentModel.deleteMany({}),
      OrderStatusHistoryModel.deleteMany({}),
      ReviewModel.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // 1. SEED REGIONS
    const regions = await RegionModel.insertMany([
      { ma_vung: 'bac', ten_vung: 'Miền Bắc', mo_ta: 'Khu vực Bắc Việt Nam' },
      { ma_vung: 'trung', ten_vung: 'Miền Trung', mo_ta: 'Khu vực Trung Việt Nam' },
      { ma_vung: 'nam', ten_vung: 'Miền Nam', mo_ta: 'Khu vực Nam Việt Nam' }
    ]);
    console.log('✅ Seeded 3 regions');

    // 2. SEED BRANDS
    const brands = await BrandModel.insertMany([
      { ten_thuong_hieu: 'Apple', mo_ta: 'Sản phẩm Apple chính hãng', logo_url: 'https://via.placeholder.com/100?text=Apple', slug: 'apple' },
      { ten_thuong_hieu: 'Samsung', mo_ta: 'Điện thoại Samsung', logo_url: 'https://via.placeholder.com/100?text=Samsung', slug: 'samsung' },
      { ten_thuong_hieu: 'Xiaomi', mo_ta: 'Điện thoại Xiaomi giá rẻ', logo_url: 'https://via.placeholder.com/100?text=Xiaomi', slug: 'xiaomi' },
      { ten_thuong_hieu: 'Sony', mo_ta: 'Sản phẩm điện tử Sony', logo_url: 'https://via.placeholder.com/100?text=Sony', slug: 'sony' }
    ]);
    console.log('✅ Seeded 4 brands');

    // 3. SEED CATEGORIES
    const categories = await CategoryModel.insertMany([
      { ten_danh_muc: 'Điện thoại', mo_ta: 'Các loại điện thoại thông minh', slug: 'dien-thoai', thu_tu: 1 },
      { ten_danh_muc: 'Laptop', mo_ta: 'Máy tính xách tay', slug: 'laptop', thu_tu: 2 },
      { ten_danh_muc: 'Phụ kiện', mo_ta: 'Phụ kiện điện thoại, máy tính', slug: 'phu-kien', thu_tu: 3 },
      { ten_danh_muc: 'Gopro', mo_ta: 'Camera hành động Gopro', slug: 'gopro', thu_tu: 4 }
    ]);
    console.log('✅ Seeded 4 categories');

    // 4. SEED PRODUCTS
    const products = await ProductModel.insertMany([
      {
        ma_san_pham: 'iphone15pro',
        ten_san_pham: 'iPhone 15 Pro',
        danh_muc_id: categories[0]._id,
        thuong_hieu_id: brands[0]._id,
        mo_ta_ngan: 'iPhone 15 Pro - Chiếc điện thoại flagship của Apple',
        mo_ta_chi_tiet: 'iPhone 15 Pro có camera 48MP, chip A17 Pro, kính Gorilla Glass mới',
        link_anh_dai_dien: 'https://via.placeholder.com/200?text=iPhone15Pro',
        hinh_anh: ['https://via.placeholder.com/200?text=iPhone15Pro1', 'https://via.placeholder.com/200?text=iPhone15Pro2'],
        thuoc_tinh: [
          { ten: 'Màu sắc', gia_tri: 'Đen, Bạc, Vàng' },
          { ten: 'Dung lượng', gia_tri: '128GB, 256GB, 512GB, 1TB' }
        ],
        gia_ban: 24990000,
        gia_niem_yet: 29990000,
        site_created: 'bac'
      },
      {
        ma_san_pham: 'samsung-s24',
        ten_san_pham: 'Samsung Galaxy S24',
        danh_muc_id: categories[0]._id,
        thuong_hieu_id: brands[1]._id,
        mo_ta_ngan: 'Samsung Galaxy S24 - Điện thoại flagship 2024',
        mo_ta_chi_tiet: 'Màn hình Dynamic AMOLED 2X 6.2 inch, camera AI, pin 4000mAh',
        link_anh_dai_dien: 'https://via.placeholder.com/200?text=GalaxyS24',
        hinh_anh: ['https://via.placeholder.com/200?text=GalaxyS241', 'https://via.placeholder.com/200?text=GalaxyS242'],
        thuoc_tinh: [
          { ten: 'Màu sắc', gia_tri: 'Đen, Bạc, Xanh' },
          { ten: 'RAM', gia_tri: '8GB, 12GB' }
        ],
        gia_ban: 19990000,
        gia_niem_yet: 23990000,
        site_created: 'bac'
      },
      {
        ma_san_pham: 'xiaomi-14',
        ten_san_pham: 'Xiaomi 14',
        danh_muc_id: categories[0]._id,
        thuong_hieu_id: brands[2]._id,
        mo_ta_ngan: 'Xiaomi 14 - Giá rẻ, chất lượng tốt',
        mo_ta_chi_tiet: 'Camera 50MP Leica, chip Snapdragon 8 Gen 3',
        link_anh_dai_dien: 'https://via.placeholder.com/200?text=Xiaomi14',
        hinh_anh: ['https://via.placeholder.com/200?text=Xiaomi141'],
        thuoc_tinh: [
          { ten: 'Màu sắc', gia_tri: 'Đen, Trắng' }
        ],
        gia_ban: 12990000,
        gia_niem_yet: 15990000,
        site_created: 'nam'
      },
      {
        ma_san_pham: 'macbook-pro-16',
        ten_san_pham: 'MacBook Pro 16 inch',
        danh_muc_id: categories[1]._id,
        thuong_hieu_id: brands[0]._id,
        mo_ta_ngan: 'MacBook Pro 16 inch M3 Max',
        mo_ta_chi_tiet: 'Chip M3 Max, 36GB RAM, 1TB SSD, Retina display XDR',
        link_anh_dai_dien: 'https://via.placeholder.com/200?text=MacBookPro16',
        hinh_anh: ['https://via.placeholder.com/200?text=MacBookPro161'],
        thuoc_tinh: [
          { ten: 'Chip', gia_tri: 'M3 Max' },
          { ten: 'RAM', gia_tri: '18GB, 36GB' }
        ],
        gia_ban: 42990000,
        gia_niem_yet: 55990000,
        site_created: 'bac'
      }
    ]);
    console.log('✅ Seeded 4 products');

    // 5. SEED PRODUCT VARIANTS
    const variants = await ProductVariantModel.insertMany([
      {
        san_pham_id: products[0]._id,
        ma_sku: 'iphone15pro-128gb-black',
        ten_hien_thi: 'iPhone 15 Pro 128GB Đen',
        gia_niem_yet: 29990000,
        gia_ban: 24990000,
        so_luong_ton_kho: 50,
        luot_ban: 120,
        anh_dai_dien: 'https://via.placeholder.com/200?text=iPhone15ProBlack'
      },
      {
        san_pham_id: products[0]._id,
        ma_sku: 'iphone15pro-256gb-black',
        ten_hien_thi: 'iPhone 15 Pro 256GB Đen',
        gia_niem_yet: 31990000,
        gia_ban: 26990000,
        so_luong_ton_kho: 35,
        luot_ban: 85,
        anh_dai_dien: 'https://via.placeholder.com/200?text=iPhone15ProBlack256'
      },
      {
        san_pham_id: products[1]._id,
        ma_sku: 'samsung-s24-8gb-black',
        ten_hien_thi: 'Galaxy S24 8GB Đen',
        gia_niem_yet: 23990000,
        gia_ban: 19990000,
        so_luong_ton_kho: 60,
        luot_ban: 150,
        anh_dai_dien: 'https://via.placeholder.com/200?text=GalaxyS24Black'
      },
      {
        san_pham_id: products[2]._id,
        ma_sku: 'xiaomi-14-black',
        ten_hien_thi: 'Xiaomi 14 Đen',
        gia_niem_yet: 15990000,
        gia_ban: 12990000,
        so_luong_ton_kho: 100,
        luot_ban: 200,
        anh_dai_dien: 'https://via.placeholder.com/200?text=Xiaomi14Black'
      }
    ]);
    console.log('✅ Seeded 4 product variants');

    // 6. SEED PROVINCES
    const provinces = await ProvinceModel.insertMany([
      { ma_tinh: '01', ten_tinh: 'Hà Nội', vung_id: 'bac' },
      { ma_tinh: '02', ten_tinh: 'Hà Giang', vung_id: 'bac' },
      { ma_tinh: '04', ten_tinh: 'Quảng Ninh', vung_id: 'bac' },
      { ma_tinh: '24', ten_tinh: 'Quảng Nam', vung_id: 'trung' },
      { ma_tinh: '27', ten_tinh: 'Đà Nẵng', vung_id: 'trung' },
      { ma_tinh: '28', ten_tinh: 'Quảng Ngãi', vung_id: 'trung' },
      { ma_tinh: '29', ten_tinh: 'Bình Định', vung_id: 'trung' },
      { ma_tinh: '36', ten_tinh: 'Đồng Tháp', vung_id: 'nam' },
      { ma_tinh: '37', ten_tinh: 'Liên Chiểu', vung_id: 'nam' },
      { ma_tinh: '48', ten_tinh: 'TP. Hồ Chí Minh', vung_id: 'nam' },
      { ma_tinh: '49', ten_tinh: 'Bình Dương', vung_id: 'nam' },
      { ma_tinh: '52', ten_tinh: 'Đồng Nai', vung_id: 'nam' }
    ]);
    console.log('✅ Seeded 12 provinces');

    // 7. SEED WARDS
    const wards = await WardModel.insertMany([
      { ma_phuong_xa: '00001', ten_phuong_xa: 'Hoàn Kiếm', tinh_thanh_id: provinces[0]._id, loai: 'phuong' },
      { ma_phuong_xa: '00002', ten_phuong_xa: 'Đống Đa', tinh_thanh_id: provinces[0]._id, loai: 'phuong' },
      { ma_phuong_xa: '00003', ten_phuong_xa: 'Ba Đình', tinh_thanh_id: provinces[0]._id, loai: 'phuong' },
      { ma_phuong_xa: '00004', ten_phuong_xa: 'Cầu Giấy', tinh_thanh_id: provinces[0]._id, loai: 'phuong' },
      { ma_phuong_xa: '00005', ten_phuong_xa: 'Hai Bà Trưng', tinh_thanh_id: provinces[0]._id, loai: 'phuong' },
      { ma_phuong_xa: '48001', ten_phuong_xa: '1', tinh_thanh_id: provinces[9]._id, loai: 'phuong' },
      { ma_phuong_xa: '48002', ten_phuong_xa: '3', tinh_thanh_id: provinces[9]._id, loai: 'phuong' },
      { ma_phuong_xa: '48003', ten_phuong_xa: '7', tinh_thanh_id: provinces[9]._id, loai: 'phuong' }
    ]);
    console.log('✅ Seeded 8 wards');

    // 8. SEED WAREHOUSES
    const warehouses = await WarehouseModel.insertMany([
      {
        ten_kho: 'Kho Hà Nội',
        vung_id: 'bac',
        phuong_xa_id: wards[0]._id,
        dia_chi_chi_tiet: '123 Phố Cấu, Hoàn Kiếm, Hà Nội',
        so_dien_thoai: '0243123456'
      },
      {
        ten_kho: 'Kho Đà Nẵng',
        vung_id: 'trung',
        phuong_xa_id: wards[5]._id,
        dia_chi_chi_tiet: '456 Đường Trần Phú, Đà Nẵng',
        so_dien_thoai: '0363456789'
      },
      {
        ten_kho: 'Kho TP. Hồ Chí Minh',
        vung_id: 'nam',
        phuong_xa_id: wards[6]._id,
        dia_chi_chi_tiet: '789 Đường Nguyễn Hữu Cảnh, Q1, Hồ Chí Minh',
        so_dien_thoai: '0283789012'
      }
    ]);
    console.log('✅ Seeded 3 warehouses');

    // 9. SEED INVENTORY
    const inventory = await InventoryModel.insertMany([
      {
        variant_id: variants[0]._id,
        kho_id: warehouses[0]._id,
        so_luong_kha_dung: 30,
        so_luong_da_dat: 5,
        muc_ton_kho_toi_thieu: 10
      },
      {
        variant_id: variants[0]._id,
        kho_id: warehouses[2]._id,
        so_luong_kha_dung: 20,
        so_luong_da_dat: 3,
        muc_ton_kho_toi_thieu: 10
      },
      {
        variant_id: variants[2]._id,
        kho_id: warehouses[0]._id,
        so_luong_kha_dung: 40,
        so_luong_da_dat: 8,
        muc_ton_kho_toi_thieu: 15
      },
      {
        variant_id: variants[2]._id,
        kho_id: warehouses[2]._id,
        so_luong_kha_dung: 20,
        so_luong_da_dat: 4,
        muc_ton_kho_toi_thieu: 15
      }
    ]);
    console.log('✅ Seeded 4 inventory records');

    // 10. SEED SHIPPING METHODS
    const shippingMethods = await ShippingMethodModel.insertMany([
      { ten_phuong_thuc: 'Tiêu chuẩn', mo_ta: 'Giao hàng từ 3-5 ngày', chi_phi_co_ban: 0 },
      { ten_phuong_thuc: 'Nhanh', mo_ta: 'Giao hàng từ 1-2 ngày', chi_phi_co_ban: 0 },
      { ten_phuong_thuc: 'Hỏa tốc', mo_ta: 'Giao hàng cùng ngày', chi_phi_co_ban: 0 }
    ]);
    console.log('✅ Seeded 3 shipping methods');

    // 11. SEED SHIPPING METHOD REGIONS
    const shippingRegions = await ShippingMethodRegionModel.insertMany([
      {
        shipping_method_id: shippingMethods[0]._id,
        region_id: 'bac',
        chi_phi_van_chuyen: 25000,
        thoi_gian_giao_du_kien: 4
      },
      {
        shipping_method_id: shippingMethods[0]._id,
        region_id: 'trung',
        chi_phi_van_chuyen: 35000,
        thoi_gian_giao_du_kien: 5
      },
      {
        shipping_method_id: shippingMethods[0]._id,
        region_id: 'nam',
        chi_phi_van_chuyen: 30000,
        thoi_gian_giao_du_kien: 4
      },
      {
        shipping_method_id: shippingMethods[1]._id,
        region_id: 'bac',
        chi_phi_van_chuyen: 50000,
        thoi_gian_giao_du_kien: 2
      },
      {
        shipping_method_id: shippingMethods[1]._id,
        region_id: 'trung',
        chi_phi_van_chuyen: 60000,
        thoi_gian_giao_du_kien: 2
      },
      {
        shipping_method_id: shippingMethods[1]._id,
        region_id: 'nam',
        chi_phi_van_chuyen: 55000,
        thoi_gian_giao_du_kien: 2
      },
      {
        shipping_method_id: shippingMethods[2]._id,
        region_id: 'bac',
        chi_phi_van_chuyen: 100000,
        thoi_gian_giao_du_kien: 0
      },
      {
        shipping_method_id: shippingMethods[2]._id,
        region_id: 'nam',
        chi_phi_van_chuyen: 100000,
        thoi_gian_giao_du_kien: 0
      }
    ]);
    console.log('✅ Seeded 8 shipping method regions');

    // 12. SEED VOUCHERS
    const vouchers = await VoucherModel.insertMany([
      {
        ma_voucher: 'GIAM10',
        ten_voucher: 'Giảm 10% tất cả sản phẩm',
        loai_giam_gia: 'phan_tram',
        gia_tri_giam: 10,
        gia_tri_giam_toi_da: 500000,
        dieu_kien_ap_dung: 0,
        so_luong_phat_hanh: 1000,
        ngay_bat_dau: new Date('2025-03-01'),
        ngay_ket_thuc: new Date('2025-03-31')
      },
      {
        ma_voucher: 'GIAM50K',
        ten_voucher: 'Giảm 50.000đ cho đơn từ 500k',
        loai_giam_gia: 'so_tien',
        gia_tri_giam: 50000,
        dieu_kien_ap_dung: 500000,
        so_luong_phat_hanh: 500,
        so_luong_da_dung: 120,
        ngay_bat_dau: new Date('2025-02-01'),
        ngay_ket_thuc: new Date('2025-12-31')
      },
      {
        ma_voucher: 'VIP20',
        ten_voucher: 'VIP - Giảm 20%',
        loai_giam_gia: 'phan_tram',
        gia_tri_giam: 20,
        gia_tri_giam_toi_da: 1000000,
        dieu_kien_ap_dung: 0,
        so_luong_phat_hanh: 100,
        so_luong_da_dung: 25,
        ngay_bat_dau: new Date('2025-01-01'),
        ngay_ket_thuc: new Date('2025-12-31')
      }
    ]);
    console.log('✅ Seeded 3 vouchers');

    // 13. SEED USERS
    const users = await UserModel.insertMany([
      {
        ho_ten: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        so_dien_thoai: '0901234567',
        mat_khau: '$2b$10$...',
        vai_tro: 'khach_hang',
        vung_id: 'bac',
        avatar_url: 'https://via.placeholder.com/100?text=UserA',
        bio: 'Người yêu thích공nghệ',
        dia_chi: [
          {
            ten_nguoi_nhan: 'Nguyễn Văn A',
            so_dien_thoai: '0901234567',
            tinh_thanh: 'Hà Nội',
            phuong_xa: 'Hoàn Kiếm',
            dia_chi_chi_tiet: '123 Phố Cấu, Hoàn Kiếm',
            la_mac_dinh: true
          }
        ]
      },
      {
        ho_ten: 'Trần Thị B',
        email: 'tranthib@example.com',
        so_dien_thoai: '0909876543',
        mat_khau: '$2b$10$...',
        vai_tro: 'khach_hang',
        vung_id: 'nam',
        avatar_url: 'https://via.placeholder.com/100?text=UserB',
        bio: 'Yêu thích mua sắm online',
        dia_chi: [
          {
            ten_nguoi_nhan: 'Trần Thị B',
            so_dien_thoai: '0909876543',
            tinh_thanh: 'TP. Hồ Chí Minh',
            phuong_xa: 'Quận 1',
            dia_chi_chi_tiet: '456 Đường Nguyễn Hữu Cảnh',
            la_mac_dinh: true
          },
          {
            ten_nguoi_nhan: 'Trần Thị B',
            so_dien_thoai: '0909876543',
            tinh_thanh: 'TP. Hồ Chí Minh',
            phuong_xa: 'Quận 3',
            dia_chi_chi_tiet: '789 Đường Ly Thường Kiệt',
            la_mac_dinh: false
          }
        ]
      },
      {
        ho_ten: 'Admin User',
        email: 'admin@vntechweb.com',
        so_dien_thoai: '0900000000',
        mat_khau: '$2b$10$...',
        vai_tro: 'admin',
        vung_id: 'bac',
        avatar_url: 'https://via.placeholder.com/100?text=Admin'
      }
    ]);
    console.log('✅ Seeded 3 users');

    // 14. SEED USER ADDRESSES
    const addresses = await UserAddressModel.insertMany([
      {
        user_id: users[0]._id,
        loai_dia_chi: 'nha_rieng',
        is_default: true,
        ten_nguoi_nhan: 'Nguyễn Văn A',
        sdt_nguoi_nhan: '0901234567',
        phuong_xa_id: wards[0]._id,
        dia_chi_cu_the: '123 Phố Cấu, Hoàn Kiếm'
      },
      {
        user_id: users[1]._id,
        loai_dia_chi: 'nha_rieng',
        is_default: true,
        ten_nguoi_nhan: 'Trần Thị B',
        sdt_nguoi_nhan: '0909876543',
        phuong_xa_id: wards[6]._id,
        dia_chi_cu_the: '456 Đường Nguyễn Hữu Cảnh, Q1'
      },
      {
        user_id: users[1]._id,
        loai_dia_chi: 'cong_ty',
        is_default: false,
        ten_nguoi_nhan: 'Công ty ABC',
        sdt_nguoi_nhan: '0909876543',
        phuong_xa_id: wards[7]._id,
        dia_chi_cu_the: '789 Đường Ly Thường Kiệt, Q3'
      }
    ]);
    console.log('✅ Seeded 3 user addresses');

    // 15. SEED CARTS
    const carts = await CartModel.insertMany([
      {
        nguoi_dung_id: users[0]._id,
        vung_id: 'bac'
      },
      {
        nguoi_dung_id: users[1]._id,
        vung_id: 'nam'
      }
    ]);
    console.log('✅ Seeded 2 carts');

    // 16. SEED CART ITEMS
    const cartItems = await CartItemModel.insertMany([
      {
        gio_hang_id: carts[0]._id,
        variant_id: variants[0]._id,
        so_luong: 1
      },
      {
        gio_hang_id: carts[0]._id,
        variant_id: variants[2]._id,
        so_luong: 2
      },
      {
        gio_hang_id: carts[1]._id,
        variant_id: variants[1]._id,
        so_luong: 1
      }
    ]);
    console.log('✅ Seeded 3 cart items');

    // 17. SEED ORDERS
    const orders = await OrderModel.insertMany([
      {
        ma_don_hang: 'ORD001',
        nguoi_dung_id: users[0]._id,
        vung_don_hang: 'bac',
        site_processed: 'bac',
        shipping_method_region_id: shippingRegions[0]._id,
        dia_chi_giao_hang_id: addresses[0]._id,
        kho_giao_hang: warehouses[0]._id,
        voucher_id: vouchers[0]._id,
        tong_tien_hang: 24990000 + 25980000,
        phi_van_chuyen: 25000,
        chi_phi_noi_bo: 0,
        gia_tri_giam_voucher: 4999000,
        tong_thanh_toan: (24990000 + 25980000 + 25000) - 4999000,
        payment_method: 'cod',
        ghi_chu_order: 'Vui lòng giao vào buổi chiều',
        trang_thai: 'dang_xu_ly'
      },
      {
        ma_don_hang: 'ORD002',
        nguoi_dung_id: users[1]._id,
        vung_don_hang: 'nam',
        site_processed: 'nam',
        shipping_method_region_id: shippingRegions[2]._id,
        dia_chi_giao_hang_id: addresses[1]._id,
        kho_giao_hang: warehouses[2]._id,
        tong_tien_hang: 12990000 * 2,
        phi_van_chuyen: 30000,
        chi_phi_noi_bo: 0,
        gia_tri_giam_voucher: 0,
        tong_thanh_toan: 12990000 * 2 + 30000,
        payment_method: 'credit_card',
        trang_thai: 'hoan_thanh'
      }
    ]);
    console.log('✅ Seeded 2 orders');

    // 18. SEED ORDER DETAILS
    const orderDetails = await OrderDetailModel.insertMany([
      {
        don_hang_id: orders[0]._id,
        variant_id: variants[0]._id,
        warehouse_id: warehouses[0]._id,
        warehouse_region: 'bac',
        so_luong: 1,
        don_gia: 24990000,
        thanh_tien: 24990000
      },
      {
        don_hang_id: orders[0]._id,
        variant_id: variants[1]._id,
        warehouse_id: warehouses[0]._id,
        warehouse_region: 'bac',
        so_luong: 1,
        don_gia: 26990000,
        thanh_tien: 26990000
      },
      {
        don_hang_id: orders[1]._id,
        variant_id: variants[3]._id,
        warehouse_id: warehouses[2]._id,
        warehouse_region: 'nam',
        so_luong: 2,
        don_gia: 12990000,
        thanh_tien: 25980000
      }
    ]);
    console.log('✅ Seeded 3 order details');

    // 19. SEED PAYMENTS
    const payments = await PaymentModel.insertMany([
      {
        don_hang_id: orders[0]._id,
        phuong_thuc: 'cod',
        so_tien: (24990000 + 25980000 + 25000) - 4999000,
        trang_thai: 'pending',
        ma_giao_dich: 'TXN001'
      },
      {
        don_hang_id: orders[1]._id,
        phuong_thuc: 'credit_card',
        so_tien: 12990000 * 2 + 30000,
        trang_thai: 'success',
        ma_giao_dich: 'TXN002'
      }
    ]);
    console.log('✅ Seeded 2 payments');

    // 20. SEED ORDER STATUS HISTORY
    const statusHistory = await OrderStatusHistoryModel.insertMany([
      {
        don_hang_id: orders[0]._id,
        trang_thai_cu: null,
        trang_thai_moi: 'cho_xac_nhan',
        ghi_chu: 'Đơn hàng vừa được tạo',
        nguoi_thao_tac: users[2]._id
      },
      {
        don_hang_id: orders[0]._id,
        trang_thai_cu: 'cho_xac_nhan',
        trang_thai_moi: 'dang_xu_ly',
        ghi_chu: 'Đã xác nhận, đang chuẩn bị',
        nguoi_thao_tac: users[2]._id
      },
      {
        don_hang_id: orders[1]._id,
        trang_thai_cu: null,
        trang_thai_moi: 'cho_xac_nhan',
        ghi_chu: 'Đơn hàng vừa được tạo',
        nguoi_thao_tac: users[2]._id
      },
      {
        don_hang_id: orders[1]._id,
        trang_thai_cu: 'cho_xac_nhan',
        trang_thai_moi: 'dang_giao',
        ghi_chu: 'Giao cho shipper',
        nguoi_thao_tac: users[2]._id
      },
      {
        don_hang_id: orders[1]._id,
        trang_thai_cu: 'dang_giao',
        trang_thai_moi: 'hoan_thanh',
        ghi_chu: 'Khách hàng đã nhận hàng',
        nguoi_thao_tac: users[1]._id
      }
    ]);
    console.log('✅ Seeded 5 order status histories');

    // 21. SEED FLASH SALES
    const flashSales = await FlashSaleModel.insertMany([
      {
        ten_flash_sale: 'Flash Sale iPhone 15 Pro',
        mo_ta: 'Giảm giá lên đến 20% cho iPhone 15 Pro',
        ngay_bat_dau: new Date('2025-03-05'),
        ngay_ket_thuc: new Date('2025-03-06'),
        vung_id: 'bac',
        trang_thai: 'cho',
        nguoi_tao: users[2]._id
      },
      {
        ten_flash_sale: 'Flash Sale Toàn Kho',
        mo_ta: 'Giảm giá toàn kho, tất cả sản phẩm',
        ngay_bat_dau: new Date('2025-03-01'),
        ngay_ket_thuc: new Date('2025-03-03'),
        vung_id: 'nam',
        trang_thai: 'ket_thuc',
        nguoi_tao: users[2]._id
      }
    ]);
    console.log('✅ Seeded 2 flash sales');

    // 22. SEED FLASH SALE ITEMS
    const flashSaleItems = await FlashSaleItemModel.insertMany([
      {
        flash_sale_id: flashSales[0]._id,
        variant_id: variants[0]._id,
        gia_goc: 24990000,
        gia_flash_sale: 19990000,
        so_luong_ton: 50,
        da_ban: 15,
        gioi_han_mua: 5,
        trang_thai: 'dang_ban'
      },
      {
        flash_sale_id: flashSales[1]._id,
        variant_id: variants[2]._id,
        gia_goc: 12990000,
        gia_flash_sale: 10990000,
        so_luong_ton: 100,
        da_ban: 35,
        gioi_han_mua: 10,
        trang_thai: 'dang_ban'
      }
    ]);
    console.log('✅ Seeded 2 flash sale items');

    // 23. SEED REVIEWS
    const reviews = await ReviewModel.insertMany([
      {
        san_pham_id: products[0]._id,
        nguoi_dung_id: users[1]._id,
        don_hang_id: orders[1]._id,
        diem_danh_gia: 5,
        tieu_de: 'Sản phẩm tuyệt vời!',
        noi_dung: 'iPhone 15 Pro chính hãng, giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng',
        hinh_anh: ['https://via.placeholder.com/200?text=Review1']
      },
      {
        san_pham_id: products[2]._id,
        nguoi_dung_id: users[0]._id,
        don_hang_id: orders[0]._id,
        diem_danh_gia: 4,
        tieu_de: 'Chất lượng cam tốt',
        noi_dung: 'Xiaomi 14 chất lượng tốt, giá hợp lý. Camera ranh manual setting',
        hinh_anh: ['https://via.placeholder.com/200?text=Review2', 'https://via.placeholder.com/200?text=Review3']
      }
    ]);
    console.log('✅ Seeded 2 reviews');

    // 24. SEED VOUCHER PRODUCTS
    const voucherProducts = await VoucherProductModel.insertMany([
      {
        voucher_id: vouchers[0]._id,
        san_pham_id: variants[0]._id
      },
      {
        voucher_id: vouchers[0]._id,
        san_pham_id: variants[2]._id
      },
      {
        voucher_id: vouchers[2]._id,
        san_pham_id: variants[0]._id
      },
      {
        voucher_id: vouchers[2]._id,
        san_pham_id: variants[1]._id
      }
    ]);
    console.log('✅ Seeded 4 voucher products');

    // 25. SEED USED VOUCHERS
    const usedVouchers = await UsedVoucherModel.insertMany([
      {
        voucher_id: vouchers[0]._id,
        nguoi_dung_id: users[0]._id,
        don_hang_id: orders[0]._id,
        gia_tri_giam: 4999000
      }
    ]);
    console.log('✅ Seeded 1 used voucher');

    console.log('\n✅ ✅ ✅ Database seeding completed successfully! ✅ ✅ ✅');
    console.log('\n📊 SEEDING SUMMARY:');
    console.log('   • 3 Regions');
    console.log('   • 4 Brands');
    console.log('   • 4 Categories');
    console.log('   • 4 Products');
    console.log('   • 4 Product Variants');
    console.log('   • 12 Provinces');
    console.log('   • 8 Wards');
    console.log('   • 3 Warehouses');
    console.log('   • 4 Inventory records');
    console.log('   • 3 Shipping Methods');
    console.log('   • 8 Shipping Method Regions');
    console.log('   • 3 Vouchers');
    console.log('   • 3 Users (including 1 admin)');
    console.log('   • 3 User Addresses');
    console.log('   • 2 Carts');
    console.log('   • 3 Cart Items');
    console.log('   • 2 Orders');
    console.log('   • 3 Order Details');
    console.log('   • 2 Payments');
    console.log('   • 5 Order Status Histories');
    console.log('   • 2 Flash Sales');
    console.log('   • 2 Flash Sale Items');
    console.log('   • 2 Reviews');
    console.log('   • 4 Voucher Products');
    console.log('   • 1 Used Voucher');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

async function main() {
  await connectDB();
  await seedDatabase();
}

main().catch(console.error);

import mongoose from "mongoose";

// ==================== REGION MODEL ====================

const regionSchema = new mongoose.Schema({
  ma_vung: { type: String, required: true, unique: true, enum: ['bac', 'trung', 'nam'] },
  ten_vung: { type: String, required: true, maxlength: 50 },
  mo_ta: { type: String, maxlength: 500 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const RegionModel = mongoose.model('Region', regionSchema);

// ==================== BRAND MODEL ====================

const brandSchema = new mongoose.Schema({
  ten_thuong_hieu: { type: String, required: true, maxlength: 100 },
  mo_ta: { type: String, maxlength: 500 },
  logo_url: { type: String, maxlength: 500 },
  slug: { type: String, required: true, unique: true, maxlength: 255 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const BrandModel = mongoose.model('Brand', brandSchema);

// ==================== CATEGORY MODEL ====================

const categorySchema = new mongoose.Schema({
  ten_danh_muc: { type: String, required: true, maxlength: 100 },
  mo_ta: { type: String, maxlength: 500 },
  anh_url: { type: String, maxlength: 500 },
  thu_tu: { type: Number, default: 0 },
  danh_muc_cha_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  slug: { type: String, required: true, unique: true, maxlength: 255 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const CategoryModel = mongoose.model('Category', categorySchema);

// ==================== PRODUCT MODEL ====================

const productSchema = new mongoose.Schema({
  ma_san_pham: { type: String, required: true, unique: true, maxlength: 100 },
  ten_san_pham: { type: String, required: true, maxlength: 255 },
  danh_muc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  thuong_hieu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  mo_ta_ngan: { type: String, maxlength: 500 },
  mo_ta_chi_tiet: { type: String },
  link_anh_dai_dien: { type: String, maxlength: 500 },
  hinh_anh: [{ type: String }],
  thuoc_tinh: [{
    ten: String,
    gia_tri: mongoose.Schema.Types.Mixed
  }],
  trang_thai: { type: Number, default: 1 },
  luot_xem: { type: Number, default: 0 },
  site_created: { type: String, maxlength: 10, default: 'bac' },
  gia_ban: { type: Number, default: 0 },
  gia_niem_yet: { type: Number, default: 0 },
  custom_data: mongoose.Schema.Types.Mixed
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' },
  strict: false
});

const ProductModel = mongoose.model('Product', productSchema);

// ==================== PRODUCT VARIANT MODEL ====================

const productVariantSchema = new mongoose.Schema({
  san_pham_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  ma_sku: { type: String, required: true, unique: true, maxlength: 100 },
  ten_hien_thi: { type: String, required: true, maxlength: 255 },
  gia_niem_yet: { type: Number, required: true, default: 0 },
  gia_ban: { type: Number, required: true, default: 0 },
  so_luong_ton_kho: { type: Number, default: 0 },
  luot_ban: { type: Number, default: 0 },
  anh_dai_dien: { type: String, maxlength: 500 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const ProductVariantModel = mongoose.model('ProductVariant', productVariantSchema);

// ==================== FLASH SALE MODEL ====================

const flashSaleSchema = new mongoose.Schema({
  ten_flash_sale: { type: String, required: true, maxlength: 255 },
  mo_ta: { type: String, maxlength: 500 },
  ngay_bat_dau: { type: Date, required: true },
  ngay_ket_thuc: { type: Date, required: true },
  vung_id: { type: String, maxlength: 20 },
  trang_thai: {
    type: String,
    enum: ['cho', 'dang_dien_ra', 'ket_thuc', 'huy'],
    default: 'cho'
  },
  nguoi_tao: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const FlashSaleModel = mongoose.model('FlashSale', flashSaleSchema);

// ==================== FLASH SALE ITEM MODEL ====================

const flashSaleItemSchema = new mongoose.Schema({
  flash_sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashSale', required: true },
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  gia_goc: { type: Number, required: true, default: 0 },
  gia_flash_sale: { type: Number, required: true, default: 0 },
  so_luong_ton: { type: Number, default: 0 },
  da_ban: { type: Number, default: 0 },
  gioi_han_mua: { type: Number },
  thu_tu: { type: Number, default: 0 },
  trang_thai: {
    type: String,
    enum: ['dang_ban', 'het_hang', 'dung_ban'],
    default: 'dang_ban'
  }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const FlashSaleItemModel = mongoose.model('FlashSaleItem', flashSaleItemSchema);

// ==================== PROVINCE MODEL ====================

const provinceSchema = new mongoose.Schema({
  ma_tinh: { type: String, required: true, unique: true, maxlength: 50 },
  ten_tinh: { type: String, required: true, maxlength: 100 },
  vung_id: { type: String, required: true, maxlength: 50 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const ProvinceModel = mongoose.model('Province', provinceSchema);

// ==================== WARD MODEL ====================

const wardSchema = new mongoose.Schema({
  ma_phuong_xa: { type: String, required: true, unique: true, maxlength: 50 },
  ten_phuong_xa: { type: String, required: true, maxlength: 100 },
  tinh_thanh_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
  loai: { type: String, maxlength: 50 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const WardModel = mongoose.model('Ward', wardSchema);

// ==================== USER MODEL ====================

const userSchema = new mongoose.Schema({
  ho_ten: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  so_dien_thoai: { type: String, maxlength: 20 },
  mat_khau: { type: String, required: true, maxlength: 255 },
  vai_tro: { type: String, enum: ['admin', 'nhan_vien', 'khach_hang'], default: 'khach_hang' },
  vung_id: { type: String, maxlength: 10, default: 'bac' },
  avatar_url: { type: String },
  bio: { type: String },
  dia_chi: [{
    ten_nguoi_nhan: String,
    so_dien_thoai: String,
    tinh_thanh: String,
    phuong_xa: String,
    dia_chi_chi_tiet: String,
    la_mac_dinh: { type: Boolean, default: false }
  }],
  preferences: mongoose.Schema.Types.Mixed,
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_dang_ky', updatedAt: 'ngay_cap_nhat' },
  strict: false
});

const UserModel = mongoose.model('User', userSchema);

// ==================== USER ADDRESS MODEL ====================

const userAddressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loai_dia_chi: { type: String, enum: ['nha_rieng', 'cong_ty', 'giao_hang'], default: 'nha_rieng' },
  is_default: { type: Boolean, default: false },
  ten_nguoi_nhan: { type: String, required: true, maxlength: 100 },
  sdt_nguoi_nhan: { type: String, required: true, maxlength: 15 },
  phuong_xa_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
  dia_chi_cu_the: { type: String, required: true, maxlength: 200 },
  ghi_chu: { type: String, maxlength: 500 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const UserAddressModel = mongoose.model('UserAddress', userAddressSchema);

// ==================== WAREHOUSE MODEL ====================

const warehouseSchema = new mongoose.Schema({
  ten_kho: { type: String, required: true, maxlength: 200 },
  vung_id: { type: String, required: true, maxlength: 10 },
  phuong_xa_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward' },
  dia_chi_chi_tiet: { type: String, maxlength: 500 },
  so_dien_thoai: { type: String, maxlength: 15 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const WarehouseModel = mongoose.model('Warehouse', warehouseSchema);

// ==================== INVENTORY MODEL ====================

const inventorySchema = new mongoose.Schema({
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  kho_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  so_luong_kha_dung: { type: Number, default: 0 },
  so_luong_da_dat: { type: Number, default: 0 },
  muc_ton_kho_toi_thieu: { type: Number, default: 10 },
  so_luong_nhap_lai: { type: Number, default: 50 },
  lan_nhap_hang_cuoi: { type: Date, default: Date.now }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const InventoryModel = mongoose.model('Inventory', inventorySchema);

// ==================== VOUCHER MODEL ====================

const voucherSchema = new mongoose.Schema({
  ma_voucher: { type: String, required: true, unique: true, maxlength: 50 },
  ten_voucher: { type: String, required: true, maxlength: 255 },
  loai_giam_gia: { type: String, enum: ['phan_tram', 'so_tien'], default: 'phan_tram' },
  gia_tri_giam: { type: Number, required: true, default: 0 },
  gia_tri_giam_toi_da: { type: Number },
  dieu_kien_ap_dung: { type: Number, default: 0 },
  so_luong_phat_hanh: { type: Number, default: 0 },
  so_luong_da_dung: { type: Number, default: 0 },
  ngay_bat_dau: { type: Date },
  ngay_ket_thuc: { type: Date },
  trang_thai: { type: String, enum: ['hoat_dong', 'het_han', 'huy'], default: 'hoat_dong' }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const VoucherModel = mongoose.model('Voucher', voucherSchema);

// ==================== VOUCHER PRODUCT MODEL ====================

const voucherProductSchema = new mongoose.Schema({
  voucher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', required: true },
  san_pham_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const VoucherProductModel = mongoose.model('VoucherProduct', voucherProductSchema);

// ==================== FLASH SALE ORDER MODEL ====================

const flashSaleOrderSchema = new mongoose.Schema({
  flash_sale_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashSaleItem', required: true },
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  don_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  so_luong: { type: Number, required: true },
  gia_flash_sale: { type: Number, required: true }
}, {
  timestamps: { createdAt: 'ngay_mua', updatedAt: 'ngay_cap_nhat' }
});

const FlashSaleOrderModel = mongoose.model('FlashSaleOrder', flashSaleOrderSchema);

// ==================== USED VOUCHER MODEL ====================

const usedVoucherSchema = new mongoose.Schema({
  voucher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', required: true },
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  don_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  gia_tri_giam: { type: Number, required: true }
}, {
  timestamps: { createdAt: 'ngay_su_dung', updatedAt: 'ngay_cap_nhat' }
});

const UsedVoucherModel = mongoose.model('UsedVoucher', usedVoucherSchema);

// ==================== SHIPPING METHOD MODEL ====================

const shippingMethodSchema = new mongoose.Schema({
  ten_phuong_thuc: { type: String, required: true, maxlength: 100 },
  mo_ta: { type: String, maxlength: 500 },
  chi_phi_co_ban: { type: Number, required: true, default: 0 },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const ShippingMethodModel = mongoose.model('ShippingMethod', shippingMethodSchema);

// ==================== SHIPPING METHOD REGION MODEL ====================

const shippingMethodRegionSchema = new mongoose.Schema({
  shipping_method_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingMethod', required: true },
  region_id: { type: String, required: true, enum: ['bac', 'trung', 'nam'] },
  chi_phi_van_chuyen: { type: Number, required: true, default: 0 },
  thoi_gian_giao_du_kien: { type: Number },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const ShippingMethodRegionModel = mongoose.model('ShippingMethodRegion', shippingMethodRegionSchema);

// ==================== CART MODEL ====================

const cartSchema = new mongoose.Schema({
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vung_id: { type: String, enum: ['bac', 'trung', 'nam'], default: 'bac' },
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const CartModel = mongoose.model('Cart', cartSchema);

// ==================== CART ITEM MODEL ====================

const cartItemSchema = new mongoose.Schema({
  gio_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  so_luong: { type: Number, required: true, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_them', updatedAt: 'ngay_cap_nhat' }
});

const CartItemModel = mongoose.model('CartItem', cartItemSchema);

// ==================== ORDER MODEL ====================

const orderSchema = new mongoose.Schema({
  ma_don_hang: { type: String, required: true, unique: true, maxlength: 50 },
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vung_don_hang: { type: String, enum: ['bac', 'trung', 'nam'], required: true },
  site_processed: { type: String, enum: ['bac', 'trung', 'nam'], required: true },
  shipping_method_region_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingMethodRegion', required: true },
  dia_chi_giao_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress', required: true },
  is_split_order: { type: Boolean, default: false },
  kho_giao_hang: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  voucher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' },
  tong_tien_hang: { type: Number, required: true },
  phi_van_chuyen: { type: Number, default: 0 },
  chi_phi_noi_bo: { type: Number, default: 0 },
  gia_tri_giam_voucher: { type: Number, default: 0 },
  tong_thanh_toan: { type: Number, required: true },
  payment_method: { type: String, maxlength: 50 },
  ghi_chu_order: { type: String },
  trang_thai: { type: String, enum: ['cho_xac_nhan', 'dang_xu_ly', 'dang_giao', 'hoan_thanh', 'huy'], default: 'cho_xac_nhan' }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const OrderModel = mongoose.model('Order', orderSchema);

// ==================== ORDER DETAIL MODEL ====================

const orderDetailSchema = new mongoose.Schema({
  don_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  warehouse_region: { type: String, enum: ['bac', 'trung', 'nam'], required: true },
  flash_sale_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashSaleItem' },
  so_luong: { type: Number, required: true },
  don_gia: { type: Number, required: true },
  thanh_tien: { type: Number, required: true }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const OrderDetailModel = mongoose.model('OrderDetail', orderDetailSchema);

// ==================== PAYMENT MODEL ====================

const paymentSchema = new mongoose.Schema({
  don_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  phuong_thuc: { type: String, enum: ['cod', 'credit_card', 'momo', 'vnpay'], required: true },
  so_tien: { type: Number, required: true },
  trang_thai: { type: String, enum: ['pending', 'success', 'failed', 'refunded'], default: 'pending' },
  ma_giao_dich: { type: String, maxlength: 100 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

// ==================== ORDER STATUS HISTORY MODEL ====================

const orderStatusHistorySchema = new mongoose.Schema({
  don_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  trang_thai_cu: { type: String },
  trang_thai_moi: { type: String, required: true },
  ghi_chu: { type: String, maxlength: 500 },
  nguoi_thao_tac: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const OrderStatusHistoryModel = mongoose.model('OrderStatusHistory', orderStatusHistorySchema);

// ==================== REVIEW MODEL ====================

const reviewSchema = new mongoose.Schema({
  san_pham_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  nguoi_dung_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  don_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  diem_danh_gia: { type: Number, required: true, min: 1, max: 5 },
  tieu_de: { type: String, maxlength: 255 },
  noi_dung: { type: String },
  hinh_anh: [{ type: String }],
  trang_thai: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

const ReviewModel = mongoose.model('Review', reviewSchema);

// ==================== EXPORT ALL MODELS ====================

export default {
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
};

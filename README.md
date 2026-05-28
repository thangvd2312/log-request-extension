# 🏦 MB Bank Request Logger

> Chrome Extension giúp bắt request API, lưu thông tin đăng nhập và **xem lịch sử giao dịch MB Bank** trực tiếp từ popup.

## ✨ Features

- **🔍 Auto-capture API requests** — Tự động bắt request đến các API của MB Bank (balance, transaction, loan...)
- **📋 Lưu Request Headers & Body** — Lưu thông tin xác thực để tái sử dụng
- **💰 Xem lịch sử giao dịch** — Query và hiển thị lịch sử giao dịch theo ngày & tài khoản
- **🎨 UI đẹp, responsive** — Popup với table formatting, currency display
- **🟢🔴 Phân loại giao dịch** — Màu xanh (nhận tiền), đỏ (chuyển tiền) tự động
- **🔒 Privacy-first** — Không gửi dữ liệu ra ngoài, lưu local trong Chrome storage

## 📸 Screenshots

> _Coming soon — extension đang hoạt động thực tế_

## 🚀 Cài đặt

### Load unpacked (Development)

1. Clone repo này:
   ```bash
   git clone https://github.com/thangvd2312/log-request-extension.git
   cd log-request-extension
   ```

2. Mở Chrome → truy cập `chrome://extensions/`

3. Bật **Developer mode** (góc trên bên phải)

4. Click **Load unpacked** → chọn folder extension

5. Extension sẽ xuất hiện trên toolbar

### Chrome Web Store

> 📦 Đang phát triển để publish lên Chrome Web Store

## 📖 Hướng dẫn sử dụng

### Bước 1: Capture API Requests

1. Truy cập **MB Bank Internet Banking** (https://online.mbbank.com.vn)
2. Đăng nhập vào tài khoản
3. Extension tự động bắt & lưu các request liên quan

### Bước 2: Xem Lịch Sử Giao Dịch

1. Click icon extension để mở popup
2. Nhập **Số tài khoản**
3. Chọn khoảng **Từ ngày** → **Đến ngày**
4. Click **Filter**

Bảng giao dịch sẽ hiển thị với định dạng tiền VNĐ, phân loại nhận/chuyển tiền bằng màu sắc.

## 🛠️ Tech Stack

- **Manifest V3** — Chrome Extension API mới nhất
- **Chrome Web Request API** — `onBeforeRequest`, `onBeforeSendHeaders`, `onCompleted`
- **Chrome Storage API** — Lưu dữ liệu local
- **Vanilla JavaScript** — Không framework, không dependencies
- **CSS3** — Custom responsive styling

## 📂 Cấu trúc project

```
├── manifest.json          # Extension config (Manifest V3)
├── background.js          # Service worker - intercept MB Bank API
├── popup.html             # Popup UI
├── popup.js               # Popup logic - hiển thị captured data
├── getTransaction.js      # Query & hiển thị lịch sử giao dịch
└── styles.css             # Custom styling
```

## 🔒 Permissions

| Permission | Mục đích |
|-----------|----------|
| `webRequest` | Bắt request đến MB Bank API |
| `activeTab` | Truy cập tab hiện tại |
| `storage` | Lưu request data local |
| `scripting` | Inject script vào page |
| `<all_urls>` host | Cho phép intercept domain MB Bank |

## 📊 Các API endpoint được intercept

| Endpoint | Chức năng |
|----------|-----------|
| `/api/retail_web/loyalty/getBalanceLoyalty` | Số dư loyalty |
| `/api/retail-web-accountms/getBalance` | Số dư tài khoản |
| `/api/retail-web-onlineloanms/loan/getList` | Danh sách khoản vay |
| `/api/retail_web/internetbanking/getFavorBeneficiaryList` | Danh sách thụ hưởng |
| `/api/retail-transactionms/.../get-account-transaction-history` | Lịch sử giao dịch |

## ⚠️ Disclaimer

Extension này được tạo cho **mục đích học tập và cá nhân**. Tất cả dữ liệu lưu local trong browser. Không gửi dữ liệu ra server bên ngoài. Không liên kết hoặc được xác nhận bởi MB Bank.

## 📄 License

MIT

---

<p align="center">Made with ❤️ by <a href="https://github.com/thangvd2312">Jerry</a></p>

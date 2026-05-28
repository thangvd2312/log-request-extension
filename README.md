# MB Bank Request Logger 🔐

> Chrome extension for intercepting, logging, and querying MB Bank (Vietnam) internet banking API requests. View your transaction history with a beautiful popup UI.

## ✨ Features

- **Auto-intercept MB Bank API** — Captures requests to balance, transaction, and loan endpoints
- **Transaction History Viewer** — Query and display transactions by date range and account number
- **Request Headers & Body Logging** — Stores authentication data for reuse
- **Beautiful Popup UI** — Clean, responsive design with formatted currency display
- **Smart Filtering** — Filter transactions by date range with validation
- **Color-coded Transactions** — Green for income (Nhận tiền), Red for expense (Chuyển tiền)

## 📸 Screenshots

*(Coming soon - Extension in action)*

## 🚀 Installation

### Load Unpacked (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/thangvd2312/log-request-extension.git
   cd log-request-extension
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked** and select the `log-request-extension` folder

5. The extension icon will appear in your Chrome toolbar

### From Chrome Web Store

> 📦 Coming soon!

## 📖 Usage

### Step 1: Capture API Requests

1. Navigate to **MB Bank Internet Banking** (https://online.mbbank.com.vn)
2. Login to your account normally
3. The extension automatically intercepts and logs relevant API requests in the background

### Step 2: View Transactions

1. Click the extension icon to open the popup
2. Enter your **Account Number**
3. Select **From Date** and **To Date** range
4. Click **Filter** button

The extension will fetch and display your transaction history with formatted amounts and color-coded types.

### Transaction Types

| Color | Type | Description |
|-------|------|-------------|
| 🟢 Green | Nhận tiền | Incoming transfer (credit) |
| 🔴 Red | Chuyển tiền | Outgoing transfer (debit) |

## 🛠️ Tech Stack

- **Manifest V3** — Modern Chrome Extension API
- **Chrome Web Request API** — Request interception (`onBeforeRequest`, `onBeforeSendHeaders`, `onCompleted`)
- **Chrome Storage API** — Local data persistence
- **Vanilla JavaScript** — No frameworks, zero dependencies
- **CSS3** — Custom responsive styling

## 📂 Project Structure

```
log-request-extension/
├── manifest.json          # Extension config (Manifest V3)
├── background.js          # Service worker - intercepts MB Bank API requests
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic - displays captured auth data
├── getTransaction.js      # Transaction query & display logic
└── styles.css             # Custom styles
```

## 🔒 Permissions

| Permission | Why It's Needed |
|-----------|----------------|
| `webRequest` | Intercept network requests to MB Bank API |
| `activeTab` | Access current tab for popup display |
| `storage` | Store captured requests locally |
| `scripting` | Access page content for transaction display |
| `host_permissions` | Required for `online.mbbank.com.vn` domain |

## 📊 API Endpoints

The extension intercepts these MB Bank API endpoints:

| Endpoint | Purpose |
|----------|---------|
| `/api/retail_web/loyalty/getBalanceLoyalty` | Loyalty balance |
| `/api/retail-web-accountms/getBalance` | Account balance |
| `/api/retail-web-onlineloanms/loan/getList` | Loan information |
| `/api/retail_web/internetbanking/getFavorBeneficiaryList` | Beneficiary list |
| `/api/retail-transactionms/transactionms/get-account-transaction-history` | Transaction history |

## ⚠️ Disclaimer

This extension is for **educational and personal use only**. All data is stored locally in your browser. No data is sent to any external servers.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

[MIT](LICENSE)

---

<p align="center">Made with ❤️ by <a href="https://github.com/thangvd2312">Jerry</a></p>

# 📦 AL-ENTEJ WMS — Advanced Warehouse Management Hub

> **100% Static Single-Page Application (SPA) with Zero-Config GitHub Pages Deployment.**
> Tri-Lingual Support: **English (LTR)**, **العربية (RTL)**, and **বাংলা (Bengali)**.

---

## 🚀 Quickstart & Offline Execution

Double-click `index.html` in any web browser to run completely offline with zero server or installation steps:

```bash
# Option 1: Double-click index.html directly

# Option 2: Run via Python built-in server (optional)
python -m http.server 8000
```

---

## 🔑 Demo Login Credentials
- **Username**: `admin`
- **Password**: `123456`
- *(Or click the 1-Click **"Quick Demo Sign In"** button)*

---

## 🌟 Upgraded Core Features

### 1. 🏛 Porcelain & 💎 Marble Slabs Management
- **Sold & Tracked in Slabs**: Both Porcelain and Marble are measured, reserved, and audited in **Slabs**.
- **Slab Photo / Image Support**: Upload slab photos with live thumbnail previews and valuation tracking.
- **Separate Inventory & Print Buttons**:
  - **"📦 Inventory"**: Dedicated clean catalog showing materials, slab photos, total and available quantities, unit prices, and total monetary valuations.
  - **"🖨 Print A4"**: Dedicated trigger for the official physical inventory audit manifest with keeper and manager signature stamps.
- **Material Reservations**:
  - Automatically captures **Sales Representative's Name**, **Showroom**, **Client / Buyer's Name**, and **Reserved Slabs**.
  - 1-Click preset shortcut chips to autofill top Sales Reps and Showrooms.
- **✂ Cut Leftovers & Remnants Register**:
  - Log cut pieces and fractional slabs (e.g. `1.0`, `1.5`, `0.5` slabs) with dimensions.
  - Auto-generates a unique barcode tag code (e.g. `CUT-POR-801`, `CUT-MAR-901`).
  - **🏷 Printable Physical Sticker Label**: Formatted tag layout ready to stick on physical offcut pieces.
- **📊 Formatted Excel Export**: Generates styled `.xls` spreadsheets with custom typography and table borders.

---

### 2. 🪵 Wood & 🚚 Marble Permits Dispatch
- Buttons clearly labeled **"+ Add Wood Permit"** and **"+ Add Marble Permit"**.
- Streamlined form asking only for:
  - **Representative's Name** (with quick shortcut chips)
  - **Client's Name (The Showroom)** (with quick shortcut chips)
  - **Buyer's Name (Showroom Customer)**
  - **Buyer's Phone Number**
  - **Expected Installation or Delivery Date**
- **📅 Day-of-the-Week Live Display**: Next to the date picker, a distinct badge displays the exact day (e.g. *Thursday / الخميس / বৃহস্পতিবার*).

---

### 3. 🌐 Tri-Lingual Engine (EN / AR / BN) & Bilingual Forms
- Full translations for **English (LTR)**, **العربية (RTL)**, and **বাংলা (Bengali)**.
- Form inputs feature **bilingual English + Arabic labels** for fast, error-free warehouse data entry.

---

## 🌐 1-Click Deployment to GitHub Pages

1. Push your files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Upgraded WMS with Slab Images, Streamlined Permits & Tri-lingual Engine"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to **Settings** ➔ **Pages** ➔ select branch `main` and directory `/ (root)` ➔ click **Save**.
3. Live instantly at `https://<your-username>.github.io/<your-repo-name>/`.

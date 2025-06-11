# 🎯 WebAR PMB Universitas Kuningan

![AR Demo](https://img.shields.io/badge/AR-WebAR-blue) ![React](https://img.shields.io/badge/React-19.1.0-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1.8-38B2AC)

Aplikasi **WebAR (Augmented Reality)** berbasis marker untuk memperkenalkan Program Studi Teknik Informatika Universitas Kuningan dalam kegiatan **Penerimaan Mahasiswa Baru (PMB)**. Proyek ini menampilkan karya mahasiswa DKV melalui pengalaman AR interaktif yang dapat diakses langsung dari browser mobile.

## ✨ Fitur Utama

- 🎮 **Marker-based WebAR** menggunakan MindAR.js
- 🐠 **Animasi 2D interaktif** (ikan berenang, efek visual)
- 📱 **Mobile-first design** dengan Tailwind CSS
- 📷 **Akses kamera langsung** dari browser
- 🎨 **Multi-model AR** (Ikan, Kampus, Program Studi)
- 🚀 **Deployment-ready** untuk Vercel
- 📊 **Real-time marker detection**
- 🎯 **Touch-friendly controls**

## 🏗️ Teknologi

- **Frontend**: React 19.1.0 + TypeScript + Vite
- **AR Library**: MindAR.js
- **Styling**: Tailwind CSS 4.1.8
- **Build Tool**: Vite 6.3.5
- **Deployment**: Vercel-ready

## 📁 Struktur Proyek

```
ar-pmb/
├── src/
│   ├── components/
│   │   ├── IntroScreen.tsx      # Layar pembuka
│   │   ├── LoadingScreen.tsx    # Layar loading AR
│   │   ├── MarkerAR.tsx         # Komponen AR utama
│   │   ├── AROverlay.tsx        # Overlay animasi 2D
│   │   └── ARControls.tsx       # Kontrol switching model
│   ├── types/
│   │   └── mind-ar.d.ts         # Type definitions
│   └── App.tsx                  # Router utama
├── public/
│   ├── markers/
│   │   ├── ikan.mind           # Marker file untuk animasi ikan
│   │   ├── kampus.mind         # Marker file untuk virtual campus
│   │   ├── prodi.mind          # Marker file untuk info prodi
│   │   └── test-markers.html   # Halaman print marker
│   └── assets/                 # Visual assets
└── vercel.json                 # Konfigurasi deployment
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Development Server
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

### 3. Build untuk Production
```bash
npm run build
```

### 4. Preview Build
```bash
npm run preview
```

## 📱 Cara Menggunakan

### Untuk Developer:
1. **Clone** repository ini
2. **Install** dependencies dengan `npm install --legacy-peer-deps`
3. **Jalankan** development server dengan `npm run dev`
4. **Buka** browser dan izinkan akses kamera
5. **Print** marker dari `/public/markers/test-markers.html`
6. **Arahkan** kamera ke marker untuk melihat AR

### Untuk End User:
1. **Buka** aplikasi di browser mobile
2. **Izinkan** akses kamera saat diminta
3. **Print** atau tampilkan marker di layar lain
4. **Arahkan** kamera ke marker
5. **Pilih** model AR yang ingin ditampilkan
6. **Nikmati** pengalaman AR interaktif!

## 🎯 Marker Testing

Untuk testing tanpa marker fisik, aplikasi akan otomatis masuk ke **simulation mode** setelah 3 detik. Untuk testing dengan marker asli:

1. Buka `/public/markers/test-markers.html` di browser
2. Print halaman tersebut
3. Gunakan marker yang tercetak untuk testing AR

## 🎨 Customization

### Menambah Model AR Baru:
1. **Tambahkan** file marker baru di `/public/markers/`
2. **Update** `MARKER_FILES` di `MarkerAR.tsx`
3. **Tambahkan** case baru di `AROverlay.tsx`
4. **Update** `modelOptions` di `ARControls.tsx`

### Mengubah Animasi:
- Edit komponen `AROverlay.tsx`
- Modifikasi CSS animations di Tailwind classes
- Tambahkan state management untuk animasi kompleks

## 🚀 Deployment

### Vercel (Recommended):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npm run deploy
```

### Manual Deploy:
```bash
npm run build
# Upload folder 'dist' ke hosting pilihan
```

## 🔧 Konfigurasi

### Vite Config:
- **HTTPS support** untuk camera access
- **Asset optimization** untuk file .mind
- **Chunk splitting** untuk MindAR libraries

### Environment Variables:
```env
VITE_AR_MODE=production  # 'simulation' untuk development
```

## 📋 Requirements

- **Node.js** 18+ 
- **Modern browser** dengan WebRTC support
- **HTTPS** untuk camera access (production)
- **Mobile device** dengan kamera untuk pengalaman optimal

## 🐛 Troubleshooting

### Camera tidak berfungsi:
- Pastikan browser mendukung WebRTC
- Izinkan akses kamera di browser settings
- Gunakan HTTPS untuk production deployment

### Marker tidak terdeteksi:
- Pastikan pencahayaan cukup
- Marker harus kontras tinggi
- Jarak optimal 20-50cm dari kamera

### Performance lambat:
- Tutup aplikasi browser lain
- Gunakan browser terbaru (Chrome/Safari)
- Reduce jumlah animasi di AROverlay

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Team

**Universitas Kuningan - Program Studi Teknik Informatika**
- Mahasiswa DKV (Desain Komunikasi Visual)
- Tim Pengembang AR
- PMB Committee 2025

## 🙏 Acknowledgments

- [MindAR.js](https://github.com/hiukim/mind-ar-js) - WebAR library
- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [Vercel](https://vercel.com/) - Deployment platform

---

**🎓 PMB Universitas Kuningan 2025**  
*Wujudkan Masa Depan Digital Bersama Program Studi Teknik Informatika*

---

# 🎯 AR PMB Universitas Kuningan

WebAR application untuk **Penerimaan Mahasiswa Baru (PMB)** Program Studi Teknik Informatika Universitas Kuningan. Aplikasi ini menggunakan marker-based AR untuk memperkenalkan program studi melalui pengalaman interaktif yang menarik.

## ✨ Fitur Utama

- 🎯 **Marker-based AR** menggunakan MindAR.js
- 📱 **Mobile-first design** dengan Tailwind CSS
- 🐠 **Animasi 2D interaktif** (ikan berenang, animasi kampus)
- 🎨 **Showcase karya mahasiswa DKV**
- 🏛️ **Virtual tour kampus**
- 💻 **Info Program Studi Teknik Informatika**
- 📸 **Screenshot dan share** pengalaman AR
- 🚀 **Deployment ready** untuk Vercel

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** untuk build tool
- **MindAR.js** untuk WebAR
- **Tailwind CSS** untuk styling
- **Vercel** untuk deployment

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Umbrella Customizer

A web-based umbrella customization tool that allows corporate customers to preview their brand logo printed on umbrellas in different colors.

This project is built as part of an assignment to recreate the UI and behavior shown in the provided demo images and video.

---

## ✨ Features

- 🎨 Three umbrella colors: **Blue, Pink, Yellow**
- 🖼️ Real-time logo upload and preview
- 🔄 Smooth color switching with loader animation
- 🌀 Loader color dynamically updates with selected umbrella color
- 🧵 Logo positioned at fixed bottom-center location
- 📱 Responsive layout (desktop & mobile)

---

## 🛠 Tech Stack

- **HTML5** – Structure
- **CSS3** – Layout, animations, responsive design
- **Vanilla JavaScript (ES6)** – Logic and interactions

No external libraries or frameworks are used.

---

## 📁 Project Structure

```
umbrella-customizer/
│
├── assets/
│   ├── blue.png
│   ├── pink.png
│   ├── yellow.png
│   └── loader.svg
|   |__ upload.svg
│
├── index.html
├── styles.css
└── script.js
```

---

## 🚀 How to Run the Project

1. Download or clone the repository
2. Ensure all assets are placed correctly in the `assets` folder
3. Open `index.html` in any modern web browser

No build steps or server required.

---

## 🎯 Usage Instructions

1. Select an umbrella color using the color swatches
2. Click **Upload Logo** and choose a `.png` or `.jpg` file (max 5MB)
3. View the logo preview placed at the bottom of the umbrella
4. Switch colors to see the logo persist across variants
5. Remove the logo using the ✕ button if needed

---

## ⏳ Loader Behavior

- Loader appears when:
  - Switching umbrella colors
  - Uploading a logo
- Loader spins continuously during transitions
- Loader color updates based on selected umbrella color

---

## 📱 Responsive Design

- Desktop-first layout
- On mobile:
  - Layout switches to vertical
  - Controls move below the umbrella preview
  - Buttons and touch targets are optimized for touch

---

## 📌 Assumptions & Constraints

- No backend or data persistence
- Logo is preview-only (no actual printing)
- Single logo placement (not draggable or resizable)

---

## ✅ Success Criteria

- UI closely matches demo references
- Smooth transitions and animations
- Accurate logo placement
- Clean, readable, and maintainable code

---

## 👤 Author
Saurabh Biswas

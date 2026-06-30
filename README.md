# 🌌 Our Little Universe

A romantic, animated, single-page birthday website. It is completely dependency-free and works directly in any modern browser. ✨

---

## 🛠️ Personalise It

Open `script.js` and edit the `LOVE_CONFIG` block at the top:

*   **`partnerName` & `senderName`** 🧑‍🤝‍🧑
*   **`relationshipStart`** in `YYYY-MM-DD` format 🗓️
*   **`birthdayMonthDay`** in `MM-DD` format 🎂
*   **`distanceKm`** 📍
*   The **reasons**, **letters**, and **final message** ✍️
*   **`videoUrl`** (for example, `assets/surprise.mp4`), or leave it empty for a text-based surprise! 🎬

> 🎵 **Note on Audio:** The sound button plays a gentle, built-in ambient track, so no extra music file is required. To use a personal song instead, just add an audio file and replace the ambient sound implementation in `script.js` with an `<audio>` element.

---

## 🚀 Run It

Simply open `index.html` directly in your browser, or serve the folder with any simple static server. **No build step is required!** 🎉

---

## 📁 Files

*   📄 `index.html` — Page structure and accessible dialogs
*   🎨 `style.css` — Responsive layout, visual design, and animations
*   ⚙️ `script.js` — Configuration, countdowns, letters, surprise, music, and effects
*   🖼️ `assets/universe-hero.png` — Custom-generated cosmic hero artwork

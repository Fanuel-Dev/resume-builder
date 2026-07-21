# 📄 Drafted — Blueprint Resume & CV Architect

[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript-fbbf24?style=for-the-badge&logoColor=0f172a)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![UX Design](https://img.shields.io/badge/UX-Split--Pane%20Live%20Preview-f43f5e?style=for-the-badge)](https://github.com/)

> **"Blueprint for your career."**

**Drafted** is a modern, client-side resume builder engineered to simplify career document design. Featuring an interactive split-pane interface, job seekers can input contact details, summaries, work experience, and technical skill sets on a dark drafting grid while watching a high-fidelity document canvas update instantly in real time.

[Explore Live Workspace](https://yourusername.github.io/drafted) • [Report a Bug](https://github.com/yourusername/drafted/issues) • [Request Feature](https://github.com/yourusername/drafted/issues)

---

## 📸 Interface Preview & Gallery

### Split-Pane Workspace & Live Document Preview
<!-- Replace this placeholder URL with your real cropped screenshot once uploaded to GitHub -->
![Drafted Workspace Interface](https://raw.githubusercontent.com/yourusername/drafted/main/assets/screenshots/dashboard-preview.png)

### 🎥 Live Studio Walkthrough
> **Watch Drafted in action:** Click the workspace preview below to see real-time DOM hydration, layout style switching (`MODERN` / `CLASSIC`), accent color swatches, and instant PDF compilation.

[![Drafted Interactive Walkthrough](https://raw.githubusercontent.com/yourusername/drafted/main/assets/screenshots/video-thumbnail.png)](https://github.com/yourusername/drafted "Watch Walkthrough")

---

## ✨ Core Engineering & Feature Set

* **⚡ Real-Time Split-Pane Hydration:** Input updates (names, headlines, links, work summaries) synchronously render onto the preview sheet using optimized JavaScript input observers.
* **🎨 Dynamic Theme & Layout Engine:** 
  * **Template Modes:** One-click toggling between sleek `MODERN` sans-serif and timeless `CLASSIC` serif typography layouts.
  * **Color Palette Swatches:** Live accent color switches updating document rules, borders, and header highlights on the fly.
* **📥 One-Click Export to PDF:** Integrated print and PDF export pipeline calibrated using custom CSS `@media print` directives to guarantee clean page breaks and zero unwanted margin shifts.
* **🛠 Section-Based Input Controls:** Categorized modular form blocks covering `SEC.01 CONTACT`, `SEC.02 SUMMARY`, experience timelines, education history, and skill badges.
* **💾 Local Storage State Retention:** Automatically caches form inputs inside the browser's `localStorage` array to preserve work-in-progress drafts across browser sessions.

---

## 🛠 Tech Stack Matrix

| Layer | Technology | Functional Mandate |
| :--- | :--- | :--- |
| **Structure** | HTML5 | Accessible form field arrays, semantic sectioning, and preview container trees |
| **Styling** | CSS3 Grid / Flex | Split-screen positioning, blueprint grid background pattern, `@media print` overrides |
| **Engine** | Vanilla JavaScript | Reactive event listeners, state preservation, dynamic DOM mutations, PDF compilation hooks |

---

## 📦 Rapid Local Setup

### 1. Repository Clone
```bash
git clone [https://github.com/yourusername/drafted.git](https://github.com/yourusername/drafted.git)
cd drafted

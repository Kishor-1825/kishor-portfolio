# Kishor Kumar R - Personal Portfolio Website

Modern, sleek, and responsive portfolio website built with HTML5, CSS3, and JavaScript, featuring a dynamic dark/light mode, interactive experience timeline, projects showcase with details modal, and verified certificate previews.

Live reference design inspired by [jayani-portfolio.vercel.app](https://jayani-portfolio.vercel.app/#experience).

---

## 🌟 Highlights & Features

- **🎨 Modern Glassmorphism Aesthetic**: Dark & Light mode toggle with automatic system theme detection and local storage persistence.
- **💼 Work Experience Timeline**: Showcases full-stack internships at **Duhzine IT Solutions** and **NLC India Limited (Navratna PSU)** with interactive inline certificate previews.
- **📜 Verified Credentials & Certificates**: High-resolution interactive lightbox viewer and direct PDF downloads for:
  - **Oracle Certified Professional: Java SE 11 Developer** (Oracle University • Nov 2024 • ID: `314721541OCPJSE11`)
  - **Oracle Database SQL Certified Specialist** (Oracle University • Oct 2024 • ID: `314721541OCSSQL12C`)
  - **Cybernaut Full Stack Web Development** (Cybernaut Edu-Tech LLP • Aug 2024 • ID: `CNFSD0000006`)
  - **Fullstack Developer Intern Certificate (Grade A)** (Duhzine IT Solutions Pvt Ltd • 2025)
  - **Industrial Internship Training Certificate** (NLC India Limited • 2025)
- **💻 Featured Projects Showcase**:
  - **Online Examination & Assessment System** (Java, Spring Boot, MySQL, JavaScript)
  - **File Integrity Monitoring System (FIM)** (Java, SHA-256 Hashing, File I/O, JDBC, MySQL)
  - **Mini Database Engine from Scratch** (Python, B+ Tree & Hash Indexing, Storage Engine, Web UI)
- **⚡ Core Skills Grid**: Categorized pills for Languages, Web & Frameworks, Databases & Storage, Core CS, and Developer Tools.
- **🎓 Education**: Saveetha University (B.Tech Computer Science & Engineering, CGPA: 8.28 / 10.0).
- **📬 Interactive Contact Section**: Direct email & phone copy buttons, social links (GitHub & LinkedIn), and a functional contact form.
- **📄 Downloadable Resume**: Instant access to `Kishor_Kumar_Resume.pdf`.

---

## 📁 Project Structure

```
kishor-portfolio/
│
├── index.html              # Main HTML5 semantic single-page portfolio
│
├── css/
│   └── style.css           # Modern stylesheet with variables, animations, dark/light themes
│
├── js/
│   └── script.js           # Theme toggle, filter buttons, modals, lightbox, copy buttons
│
├── assets/
│   ├── favicon.svg         # Modern monogram SVG favicon
│   ├── Kishor_Kumar_Resume.pdf  # Downloadable resume
│   ├── profile-candidate.jpg    # Profile picture
│   │
│   └── certificates/       # High-resolution certificates and official PDFs
│       ├── Oracle_Java_SE11_preview.jpg
│       ├── Oracle_Java_SE11_Developer_Kishor.pdf
│       ├── Oracle_SQL_preview.jpg
│       ├── Oracle_Database_SQL_Specialist_Kishor.pdf
│       ├── Cybernaut_preview.jpg
│       ├── Cybernaut_FullStack_Certificate_Kishor.pdf
│       ├── Duhzine_IT_Internship_Certificate.jpg
│       └── NLC_India_Internship_Certificate.jpg
│
└── README.md
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using any local HTTP server:

```bash
# Using Python
py -m http.server 3000

# Using Node.js (npx serve)
npx serve .
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel (Free & Instant)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Kishor Kumar portfolio"
   git branch -M main
   git remote add origin https://github.com/Kishor-1825/kishor-portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **Add New Project** and select your `kishor-portfolio` repository.
   - Click **Deploy** (no build settings required; it deploys automatically as a static website!).
   - Your site will be live instantly with a URL like `kishor-portfolio.vercel.app`!

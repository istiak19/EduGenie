# EduGenie – Smart Learning. Smarter Teaching.

EduGenie is a cutting-edge AI-powered educational platform designed to revolutionize modern learning experiences for both students and educators. Through a dynamic role-based dashboard, students can generate custom course content based on their chosen topic, difficulty level, and duration—empowering them to learn at their own pace with AI-generated chapters, videos, and code examples. Educators, on the other hand, are provided with tools to publish and approve educational blogs, create quizzes, and manage their profiles seamlessly.

The platform focuses on interactivity and accessibility with a clean, responsive UI, built using Next.js, Tailwind CSS, and integrated with MongoDB for persistent data storage. Authenticated via NextAuth.js, EduGenie ensures secure access and smooth transitions across devices. Whether you're a curious student or a passionate teacher, EduGenie makes learning more personalized, efficient, and enjoyable by merging the power of artificial intelligence with modern education.

🌐 **Live Demo**: [https://genies-two.vercel.app](https://genies-two.vercel.app/)
📂 **GitHub Repository**: [https://github.com/istiak19/EduGenie](https://github.com/istiak19/EduGenie)

---

## 📑 Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Dependencies](#dependencies)
* [Configuration](#configuration)
* [Development Scripts](#development-scripts)
* [File Structure](#file-structure)
* [Contributors](#contributors)
* [Showcase & Video Description](#showcase--video-description)
* [License](#license)

---

## ✨ Features

* **AI-Powered Course Generation**: Uses Gemini API to generate personalized educational courses based on student preferences.
* **Student Dashboard**: A personalized dashboard where students can track progress, view courses, and check quiz results.
* **Educator Dashboard**: Allows educators to manage courses, blogs, quizzes, and monitor student activities.
* **Role-Based Access Control (RBAC)**: Restricts access to different sections based on user roles (student, educator, admin).
* **Chapter-Wise Learning Flow**: Students proceed through courses one chapter at a time with embedded content and navigation buttons.
* **Quiz and Evaluation**: Includes quizzes with automatic pass/fail evaluation based on scores.
* **Blog Creation**: Educators can publish blogs with like and comment features for student interaction.
* **Chatbot Integration**: AI chatbot helps students with real-time queries during learning.
* **Course Management Based on User Role**: Role-specific permissions for course creation, viewing, and management.
* **Security & Authentication**: JWT-based login system with route protection.
* **MongoDB Backend**: Stores and manages user data, course content, and platform information.
* **Modern UI/UX**: Built with TailwindCSS, DaisyUI, and SweetAlert2 for a smooth, responsive experience.

---

## 🛠️ Tech Stack Used

* **Frontend**: Next.js, Tailwind CSS, DaisyUI, React Slick, Framer Motion
* **Backend**: Node.js API Routes, MongoDB
* **Authentication**: NextAuth.js
* **Image Upload**: ImgBB API
* **Hosting**: Vercel & MongoDB Atlas

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/istiak19/EduGenie.git
cd EduGenie

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🚀 Usage

Once the development server is running, go to:

```
http://localhost:3000
```

* **Students** can register, update their profiles, and generate custom learning materials.
* **Educators** can log in to create blog posts, quizzes, and review AI-generated content.

---

## 📦 Dependencies

### Runtime

* `next` `^15.3.1`
* `react` `^19.0.0`
* `next-auth` `^4.24.11`
* `@google/generative-ai` `^0.24.0`
* `mongodb` `^6.15.0`
* `axios`, `bcryptjs`, `zod`, `react-hook-form`, `framer-motion`, `sweetalert2`, and more

### Dev

* `eslint` `^9`
* `tailwindcss` `^4`
* `daisyui` `^5.0.2`

---

## 🛠️ Development Scripts

* `npm run dev` – Launch dev server
* `npm run build` – Build for production
* `npm run start` – Start production server
* `npm run lint` – Run linter checks

---

## 📂 File Structure

```plaintext
src/
│── app/                         # Next.js 13 App Router (routes live here)
│   ├── layout.jsx                # Root layout (Navbar, Footer, etc.)
│   ├── page.jsx                  # Homepage
│   ├── dashboard/                # Example route
│   │   └── page.jsx
│   ├── profile/
│   │   └── page.jsx
│   └── api/                      # Route handlers (API endpoints)
│       └── auth/
│           └── route.js
│
│── components/                   # Reusable UI Components
│   ├── common/                   # Generic reusable (Button, Modal, Card, etc.)
│   ├── layout/                   # Navbar, Footer, Sidebar, etc.
│   ├── educator/                 # Educator-specific components
│   ├── student/                  # Student-specific components
│   └── ui/                       # Tailwind-based UI primitives
│
│── lib/                          # Utility functions (API calls, helpers)
│   ├── fetcher.js
│   └── auth.js
│
│── providers/                    # Context API / Providers
│   ├── ThemeProvider.jsx
│   └── AuthProvider.jsx
│
│── styles/                       # Global styles
│   └── globals.css
│
│── hooks/                        # Custom React hooks
│   ├── useAuth.js
│   └── useTheme.js
│
│── public/                       # Static files (images, icons, fonts)
│   └── logo.png
│
.env
.gitignore
components.json
eslint.config.mjs
jsconfig.json / tsconfig.json
middleware.js
next.config.mjs
package.json
postcss.config.mjs
tailwind.config.js
README.md
```

---

## 👨‍💻 Contributors

* **Istiak Ahamed**
* **Showrov Kumar Ghosh**
* **Md Jane Alam**
* **Ambia Khatun Ela**
* **Tahsina Tanvin**
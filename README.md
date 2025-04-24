# EduGenie – Smart Learning. Smarter Teaching.

EduGenie is a cutting-edge AI-powered educational platform designed to revolutionize modern learning experiences for both students and educators. Through a dynamic role-based dashboard, students can generate custom course content based on their chosen topic, difficulty level, and duration—empowering them to learn at their own pace with AI-generated chapters, videos, and code examples. Educators, on the other hand, are provided with tools to publish and approve educational blogs, create quizzes, and manage their profiles seamlessly. The platform focuses on interactivity and accessibility with a clean, responsive UI, built using Next.js, Tailwind CSS, and integrated with MongoDB for persistent data storage. Authenticated via NextAuth.js, EduGenie ensures secure access and smooth transitions across devices. Whether you're a curious student or a passionate teacher, EduGenie makes learning more personalized, efficient, and enjoyable by merging the power of artificial intelligence with modern education.

🌐 **Live Demo**: [https://genies-two.vercel.app/](https://genies-two.vercel.app/)

---

## 📑 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Development Scripts](#development-scripts)
- [Contributors](#contributors)
- [Showcase & Video Description](#showcase--video-description)
- [License](#license)

---

## ✨ Features

- 🔮 AI Integration with Google Generative AI
- 🧠 Student Dashboard for AI-powered course generation
- 🧑‍🏫 Educator Dashboard to manage blogs and quizzes
- 👥 Role-based access control
- 🛠️ Profile editing and user management
- 📚 Form validation with React Hook Form and Zod
- 💫 Clean animations with Framer Motion
- 📦 MongoDB backend for content and user data
- 🎉 Enhanced UI with TailwindCSS, DaisyUI, and SweetAlert2

---

## 🛠️ Tech Stack Used:
- Frontend: Next.js, Tailwind CSS, DaisyUI, React Slick, Framer Motion  
- Backend: Node.js API Routes, MongoDB
- Authentication: NextAuth.js  
- Image Upload: ImgBB API  
- Hosting: Vercel & MongoDB Atlas

---

## ⚙️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd edugenie

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

- **Students** can register, update their profiles, and generate custom learning materials.
- **Educators** can log in to create blog posts, quizzes, and review AI-generated content.

---

## 📦 Dependencies

### Runtime

- `next` `^15.3.1`
- `react` `^19.0.0`
- `next-auth` `^4.24.11`
- `@google/generative-ai` `^0.24.0`
- `mongodb` `^6.15.0`
- `axios`, `bcryptjs`, `zod`, `react-hook-form`, `framer-motion`, `sweetalert2`, and more

### Dev

- `eslint` `^9`
- `tailwindcss` `^4`
- `daisyui` `^5.0.2`

---

## 🛠️ Development Scripts

- `npm run dev` – Launch dev server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run linter checks

---

## 👨‍💻 Contributors

- **Istiak Ahamed**
- **Showrov Kumar Ghosh**
- **Md Jane Alam**
- **Ambia Khatun Ela**
- **Tahsina Tanvin**
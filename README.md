🌐 Full-Stack Next.js Website

This project is a full-stack website built with Next.js 14.
It includes multiple pages (Home, About, Contact, Donate, Eligibility) with backend APIs connected to MongoDB Atlas for data storage.

🚀 Features

Built with Next.js App Router

MongoDB Atlas + Mongoose for database

Fully functional Contact, Donate, and Eligibility forms

Stores all form data in MongoDB Atlas (Compass)

Clean and responsive frontend design

🛠️ Tech Stack

Frontend: Next.js 14, React

Styling: CSS / Tailwind (depending on your project)

Backend: Next.js API Routes

Database: MongoDB Atlas with Mongoose

📂 Project Structure
src/
 ├── app/
 │   ├── about/        # About page
 │   ├── contact/      # Contact form page
 │   ├── donate/       # Donation form page
 │   ├── eligibility/  # Eligibility form page
 │   ├── api/          # Backend API routes
 │   └── layout.jsx    # Layout wrapper
 ├── components/       # Header, Footer, etc.
 ├── lib/              # Database connection (mongodb.js)
 ├── models/           # Mongoose models (Contact, Donate, Eligibility)

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone <your-repo-url>
cd your-project

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env.local file in the root directory:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.7wg131x.mongodb.net/mywebsite?retryWrites=true&w=majority


Replace <username> and <password> with your Atlas credentials.

4️⃣ Run the Development Server
npm run dev


Now open http://localhost:3000
 🎉

📦 API Endpoints

POST /api/contact → Save contact form data

POST /api/donate → Save donation data

POST /api/eligibility → Save eligibility form data

🗄️ Database

Data is stored in MongoDB Atlas

You can also connect Atlas with MongoDB Compass to view records.

👨‍💻 Author

Developed by Sardar Saadi

⚡ Future Upgrades:

Admin Dashboard (view all Contact, Donate, Eligibility data from browser)

Authentication for Admin Panel
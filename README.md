# UrbanScope Realty 🏠

A modern, full-stack real estate platform built with React.js and Node.js that connects property buyers, and agents with an intuitive interface and powerful features.

![UrbanScope Realty](https://img.shields.io/badge/UrbanScope-Realty-blue) ![React](https://img.shields.io/badge/React-18.2.0-61dafb) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)



## Website Features

### 🏘️ Property Management
- **Advanced Property Listings** with high-quality images and video tours
- **Smart Filtering & Search** by price, location, property type, and amenities
- **Dual Transaction Types** - Sale and Rent with appropriate pricing display
- **Favorite Properties** - Save and track properties you love
- **Property Comparison** - Side-by-side property comparisons

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on all devices
- **Image Galleries & Lightbox**
- **Skeleton Loading** for better user experience
<!-- - **Dark/Light Mode** (optional - add if you have it) -->
<!-- - **Interactive Maps** for property locations -->

### 👥 User System
- **Multi-role Authentication** (Users, Admin)
- **JWT-based Security** with protected routes
- **User Profiles & Dashboard**
- **Favorite Properties Management**
- **Secure Password Handling**

### 🔧 Admin System
- **Complete Dashboard** with analytics and statistics
- **User Management** - Activate/deactivate users
- **Property Moderation** - Create, edit, or remove listings
- **Content Management** - Featured properties and promotions
<!-- - **Agent Management** - Create and manage agent accounts -->



## Technology Stack
### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Tailwind CSS** - CSS Styling framework
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Authentication & Authorization
The application uses a role-based access control system:
- **Users** - Browse properties, save favorites, contact agents
- **Agents** - Create and manage property listings
- **Admins** - Full system access and user management


## 🏗️ Key Components
### Property Context
Centralized property management with utility functions for:
- **Price formatting** based on transaction type (Sale/Rent)
- Property filtering and sorting
- Featured properties management

### Auth Context
- JWT token management
- User session handling
- Protected route implementation

### Favorites Context
- User favorite properties management
- Persistent storage across sessions

### 📱 Responsive Design
The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px



## 🔧 Development
### Frontend with hot reload
- npm run dev

### Backend with nodemon
- npm run server

### Build frontend
npm run build


## 🚀 Deployment
### Frontend (Netlify)
- Build the project: npm run build
- Deploy the dist folder to your preferred hosting service

### Backend (Vercel)
- Set environment variables in your hosting platform
- Deploy the server directory
- Ensure MongoDB connection string is configured


## 🤝 Contributing
- Fork the repository
- Create a feature branch: git checkout -b feature/amazing-feature
- Commit your changes: git commit -m 'Add amazing feature'
- Push to the branch: git push origin feature/amazing-feature
- Open a Pull Request


## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team
Chidera Olisah (Nathan) [https://github.com/deraolisah/] - Lead Developer - GitHub

## 🙏 Acknowledgments
- React with Vite community for excellent documentation.
- Deepseek for debugging.
- Vite team for fast build tooling.
- MongoDB for reliable database solutions.
- Tailwind CSS for utility-first CSS framework.
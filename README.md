# NAKAMAS

NAKAMAS is a modern restaurant ordering web app built to make food discovery and online ordering feel simple, smooth, and enjoyable.

Whether someone is browsing the menu, adding favorites to the cart, or checking out for a quick takeaway, the experience is designed to feel clean, welcoming, and easy to use. Behind the scenes, the project combines a React frontend with an Express + MongoDB backend so the app can manage products and support a real restaurant workflow.

---

## About the project

This project is a full-stack food ordering platform inspired by a real restaurant experience. Customers can:

- browse the menu by category,
- view food items with pricing and descriptions,
- add items to the cart,
- review their order,
- complete checkout,
- and enjoy a simple online dining journey.

Admins can also manage the menu by adding, editing, and deleting food products, making the app useful both for customers and for restaurant staff.

---

## Why this project exists

The goal was to build a practical food-ordering app that looks polished while staying easy to understand and expand. It captures the core journey of a restaurant website:

- customer discovery,
- product selection,
- cart management,
- order flow,
- and admin control.

It is a great project for learning how frontend and backend work together in a real-world application.

---

## Features

### Customer experience

- Beautiful landing page with restaurant branding
- Menu with category filtering
- Product cards with image, description, and price
- Add-to-cart functionality
- Cart summary and quantity updates
- Checkout page for order completion
- Responsive layout for desktop and smaller screens

### Admin experience

- Admin login
- Product management dashboard
- Add new products
- Edit existing menu items
- Delete products
- Image upload support for food items

### Backend capabilities

- Express API for products
- MongoDB database connection
- Image storage in the uploads folder
- CORS enabled for frontend communication
- Structured routes for admin and product actions

---

## Tech stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS modules / custom styling

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Multer for image uploads
- dotenv for environment configuration

---

## Project structure

```bash
nakamas/
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   └── productRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

---

## Getting started

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `backend` folder with values like:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/nakamas
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

> Make sure MongoDB is running locally, or replace the `MONGO_URI` with your MongoDB Atlas connection string.

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

In a new terminal:

```bash
npm run dev
```

The app should open in the browser, usually on:

```bash
http://localhost:5173
```

---

## How the app works

The frontend is responsible for the customer-facing experience:

- the landing page introduces the brand,
- the menu page loads products from the API,
- the cart stores selected items,
- the checkout page completes the order flow.

The backend handles the data layer:

- fetching products,
- adding and updating menu items,
- storing product images,
- and validating admin login.

The two parts connect through HTTP requests, which is the usual way a React app talks to a Node/Express backend.

---

## Admin login

The app includes a simple admin login flow using values from the backend environment file.

Use the values you set in `.env`:

- username: `ADMIN_USERNAME`
- password: `ADMIN_PASSWORD`

This login is used to access the admin operations for managing food items.

---

## Notes for developers

This project is a great example of a small full-stack app built with common web technologies. It is beginner-friendly but still realistic enough to teach the flow of:

- frontend routing,
- API calls,
- database operations,
- image uploads,
- and state management.

You can extend it further with:

- order history,
- payment integration,
- user authentication,
- delivery tracking,
- or a complete booking system.

---

## License

This project is for learning and personal development purposes.

---

## Final thought

NAKAMAS is more than a demo app — it represents the kind of digital experience a modern restaurant needs: easy ordering, attractive menu presentation, and simple management behind the scenes. It is a practical project that blends design, functionality, and real-world web development concepts into one clean experience.

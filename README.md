E-COMMERCE WEB APPLICATION
# 🛒 ProStore — Full-Stack E-Commerce Web Application

A full-stack, production-ready e-commerce web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Features a complete product catalog, user authentication with role-based access control, a dynamic shopping cart, a multi-step checkout process, and RESTful backend APIs for product and order management.

---

## 📸 Screenshots

| Home Page | Product Details | Shopping Cart |
|-----------|-----------------|---------------|
| Hero section with featured product grid | Full product info with stock & quantity selector | Interactive cart with live price calculation |

| Login / Register | Checkout | Admin Order View |
|------------------|----------|------------------|
| JWT-backed authentication forms | Shipping + payment + order summary | Role-protected order management |

---

## ✨ Key Features

### 🛍️ Product Catalog
- Browse a responsive grid of products with images, ratings, prices, and reviews
- Click into individual product detail pages with full descriptions
- Real-time stock availability status (In Stock / Out of Stock)
- Quantity selector based on available inventory

### 🛒 Add to Cart & Checkout
- Add products to a persistent shopping cart with quantity control
- Live cart badge counter in the navigation bar
- Remove items or update quantities directly from the cart page
- Full checkout flow with:
  - Shipping address form
  - Payment method selection
  - Automatic tax & shipping calculation
  - Order summary with itemized pricing
- Orders are saved to the MongoDB database upon placement

### 🔐 User Login & Role-Based Access (Admin / User)
- **Registration** with name, email, and password (with confirmation)
- **Login** with JWT token-based authentication
- Passwords are hashed with `bcryptjs` before storage
- Sessions persist across browser refreshes via `localStorage`
- **Admin middleware** restricts sensitive routes (e.g., viewing all orders) to admin users only
- Dynamic navigation bar: shows user name + logout dropdown when authenticated

### ⚙️ Backend APIs for Product & Order Management
- RESTful API architecture built with Express.js
- **Product APIs**:
  - `GET /api/products` — Fetch all products
  - `GET /api/products/:id` — Fetch a single product by ID
- **User APIs**:
  - `POST /api/users/register` — Register a new user
  - `POST /api/users/login` — Authenticate and receive JWT
  - `GET /api/users/profile` — Get logged-in user profile (protected)
- **Order APIs**:
  - `POST /api/orders` — Place a new order (protected)
  - `GET /api/orders/:id` — Get order details by ID (protected)
  - `GET /api/orders` — Get all orders (admin only)

### 🗄️ Database Integration with MongoDB
- MongoDB via Mongoose ODM with structured schemas for:
  - **Users** — name, email, hashed password, admin flag
  - **Products** — name, image, brand, category, description, price, stock count, ratings, reviews
  - **Orders** — user reference, order items, shipping address, payment method, pricing breakdown, delivery status
- Automated database seeder script to populate initial data
- Graceful fallback: frontend loads static data if the database server is unavailable

---

## 🏗️ Project Structure

```
ecommerce-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verify + admin check
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema (with reviews)
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── userRoutes.js         # Auth & profile endpoints
│   │   ├── productRoutes.js      # Product CRUD endpoints
│   │   └── orderRoutes.js        # Order management endpoints
│   ├── utils/
│   │   └── generateToken.js      # JWT token generator
│   ├── data.js                   # Seed data (users + products)
│   ├── seeder.js                 # Database seeder script
│   ├── server.js                 # Express app entry point
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Navigation bar with auth state
│   │   │   └── ProductCard.jsx   # Reusable product card
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Global authentication state
│   │   │   └── CartContext.jsx   # Global shopping cart state
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Landing page + product grid
│   │   │   ├── ProductPage.jsx   # Single product detail view
│   │   │   ├── CartPage.jsx      # Shopping cart management
│   │   │   ├── CheckoutPage.jsx  # Shipping, payment & order placement
│   │   │   ├── LoginPage.jsx     # User login form
│   │   │   └── RegisterPage.jsx  # User registration form
│   │   ├── data.js               # Static fallback product data
│   │   ├── App.jsx               # Root component with routing
│   │   ├── main.jsx              # App entry point with providers
│   │   └── index.css             # Global styles + Tailwind
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer        | Technology                                                   |
|--------------|--------------------------------------------------------------|
| **Frontend** | React 19, React Router v7, Axios, React Icons, Tailwind CSS  |
| **Backend**  | Node.js, Express.js 5                                        |
| **Database** | MongoDB with Mongoose ODM                                    |
| **Auth**     | JSON Web Tokens (JWT), bcryptjs                              |
| **Bundler**  | Vite 8                                                       |
| **Dev Tools**| Nodemon, PostCSS, Autoprefixer                               |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **MongoDB** — Local install ([Download](https://www.mongodb.com/try/download/community)) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- **Git** — [Download](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create or edit the file `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce-store
JWT_SECRET=your_super_secret_key_here
```

> **Tip:** For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 4. Seed the Database (Optional)

Populate the database with sample users and products:

```bash
cd backend
node seeder.js
```

This creates:
| User            | Email              | Password | Role  |
|-----------------|--------------------|----------|-------|
| Admin User      | admin@example.com  | 123456   | Admin |
| John Doe        | john@example.com   | 123456   | User  |

### 5. Run the Application

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run server
```
> Server starts on `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
> App opens on `http://localhost:5173`

---

## 📡 API Reference

### Users

| Method | Endpoint              | Access  | Description              |
|--------|-----------------------|---------|--------------------------|
| POST   | `/api/users/register` | Public  | Register a new user      |
| POST   | `/api/users/login`    | Public  | Login & receive JWT      |
| GET    | `/api/users/profile`  | Private | Get current user profile |

### Products

| Method | Endpoint              | Access | Description              |
|--------|-----------------------|--------|--------------------------|
| GET    | `/api/products`       | Public | Get all products         |
| GET    | `/api/products/:id`   | Public | Get single product by ID |

### Orders

| Method | Endpoint           | Access        | Description            |
|--------|--------------------|---------------|------------------------|
| POST   | `/api/orders`      | Private       | Create a new order     |
| GET    | `/api/orders/:id`  | Private       | Get order by ID        |
| GET    | `/api/orders`      | Private/Admin | Get all orders (admin) |

---

## 🔒 Authentication Flow

```
1. User registers or logs in
2. Server validates credentials & returns a JWT token
3. Token is stored in localStorage on the client
4. Protected API requests include the token in the Authorization header:
   Authorization: Bearer <token>
5. Backend middleware verifies the token before granting access
6. Admin routes additionally check the user's isAdmin flag
```

---

## 🧪 Test Credentials

After running the seeder:

| Role  | Email             | Password |
|-------|-------------------|----------|
| Admin | admin@example.com | 123456   |
| User  | john@example.com  | 123456   |

---

## 📦 Available Scripts

### Backend (`/backend`)

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm start`       | Start production server              |
| `npm run server`  | Start dev server with Nodemon        |
| `node seeder.js`  | Seed database with sample data       |

### Frontend (`/frontend`)

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start Vite development server        |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build locally     |

---

## 🎯 Expected Outcome

This project demonstrates hands-on experience in building a **complex, full-stack application** with real-world features including:

- ✅ End-to-end product browsing and purchasing flow
- ✅ Secure user authentication with hashed passwords and JWT
- ✅ Role-based authorization (Admin vs. User)
- ✅ RESTful API design with proper HTTP methods and status codes
- ✅ NoSQL database modeling with relationships (User → Product → Order)
- ✅ React state management with Context API and useReducer
- ✅ Responsive, modern UI with Tailwind CSS
- ✅ Client-side routing with React Router

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ using the MERN Stack
</p>

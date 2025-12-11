E-Commerce Backend (Node.js + Express + MongoDB)

A modular, scalable e-commerce backend built using Node.js, Express, and MongoDB with complete features for authentication, product management, cart operations, order processing, and admin controls.

This backend is designed for production-level use and supports filtering, pagination, and sorting for both products and orders.

Features
Authentication

User registration & login

JWT-based authentication

Admin role support

Protected routes

Products Module

Create, update, delete products

Soft delete mechanism

Toggle product active/inactive

Fetch single product

Advanced Filters:

Category, subcategory

Price range

Free-text search

Pagination & Sorting

Example:

GET /api/v1/products?search=shirt&minPrice=50&maxPrice=250&page=1&limit=20&sortBy=price&order=asc

Categories Module

Add categories & subcategories

Update category

Soft delete

Fetch all categories

Cart Module

Add product to cart

Update item quantity

Remove item from cart

Clear cart

Auto-recalculate total price

Cart stored in CartTemp model

Orders Module

Create order from user cart

View user orders

Get order details

Admin can update order status

Admin Filtering + Pagination

Search by status

Date range

Sorted results

Example:

GET /api/v1/orders/admin?status=pending&dateFrom=2024-01-01&sortBy=total&order=desc&page=2&limit=20

Project Structure
/server
  /src
    /config
      database.js
      jwt.js
    /controllers
      auth.controller.js
      product.controller.js
      category.controller.js
      cart.controller.js
      order.controller.js
    /middlewares
      auth.middleware.js
    /models
      User.js
      Product.js
      Category.js
      Order.js
      CartTemp.js
    /routes
      /v1
        auth.routes.js
        product.routes.js
        category.routes.js
        cart.routes.js
        order.routes.js
      index.js
    /services
      auth.service.js
      product.service.js
      category.service.js
      cart.service.js
      order.service.js
    /utils
      slugify.js

server.js
.env
README.md

Tech Stack

Node.js

Express.js

MongoDB / Mongoose

JWT Authentication

Bcrypt

Express Validator

Multer (optional for future images)

Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret

Installation & Usage
1. Clone the repository
git clone <repo-url>
cd ecommerce-backend

2. Install dependencies
npm install

3. Start development server
npm run dev

4. Start production server
npm start


Server will run on:

http://localhost:5000

API Endpoints Overview
Auth
Method	Endpoint	Description
POST	/api/v1/auth/register	Register new user
POST	/api/v1/auth/login	Login
Products
Method	Endpoint	Description
POST	/api/v1/products	Create product
GET	/api/v1/products	List products (filter, sort, paginate)
GET	/api/v1/products/:id	Get product by ID
PATCH	/api/v1/products/:id	Update product
DELETE	/api/v1/products/:id	Soft delete
Categories
Method	Endpoint	Description
POST	/api/v1/categories	Add category
GET	/api/v1/categories	Get categories
PATCH	/api/v1/categories/:id	Update category
Cart
Method	Endpoint	Description
GET	/api/v1/cart	Get user cart
POST	/api/v1/cart	Add item
PUT	/api/v1/cart/:itemId	Update quantity
DELETE	/api/v1/cart/:itemId	Remove item
DELETE	/api/v1/cart	Clear cart
Orders
Method	Endpoint	Description
POST	/api/v1/orders	Create order
GET	/api/v1/orders	Get user orders
GET	/api/v1/orders/:id	Get order by ID
PATCH	/api/v1/orders/:id	Update order status (admin)
GET	/api/v1/orders/admin	Admin order list (filters + pagination)
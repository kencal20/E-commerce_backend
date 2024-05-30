# E-commerce Backend Architecture

# Backend:
 Node.js with Express.js

# Database:
 MongoDB

# Authentication:
 JWT (JSON Web Tokens) (Omitted from initial design but can be integrated later)

# Payment Integration:
 Stripe API (Omitted from initial design but can be integrated later)

# Database Schemas

User
userId: String (Primary Key)
name: String
email: String (Unique)
password: String
address: String
phone: String
isAdmin: Boolean

Product
productId: String (Primary Key)
name: String
description: String
price: Number
category: String
stock: Number
imageUrl: String

Order
orderId: String (Primary Key)
userId: String (Foreign Key)
products: Array of Objects (each containing productId, quantity, price)
totalAmount: Number
status: String
orderDate: Date

Category
categoryId: String (Primary Key)
name: String

Review
reviewId: String (Primary Key)
userId: String (Foreign Key)
productId: String (Foreign Key)
rating: Number
comment: String
date: Date

# API Endpoints

User API
POST /api/users: Create a new user

GET /api/users/
: Get user details by user ID

PUT /api/users/
: Update user details

DELETE /api/users/
: Delete user

Product API
POST /api/products: Create a new product

GET /api/products: Get all products

GET /api/products/
: Get product details by product ID

PUT /api/products/
: Update product details

DELETE /api/products/
: Delete product

Order API
POST /api/orders: Create a new order

GET /api/orders: Get all orders

GET /api/orders/
: Get order details by order ID

PUT /api/orders/
: Update order status

DELETE /api/orders/
: Cancel order

Category API

POST /api/categories: Create a new category

GET /api/categories: Get all categories

GET /api/categories/
: Get category details by category ID

PUT /api/categories/
: Update category details

DELETE /api/categories/
: Delete category

Review API
POST /api/reviews: Create a new review

GET /api/reviews: Get all reviews

GET /api/reviews/
: Get review details by review ID

PUT /api/reviews/
: Update review details

DELETE /api/reviews/
: Delete review

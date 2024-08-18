# BuyBusy E-Commerce Web Application

BuyBusy is a fully functional e-commerce web application built using React, Redux Toolkit, and Firebase. The app allows users to register, log in, browse products, add products to their cart, and place orders. Firebase Firestore is used for storing user data, products, and orders.

## Table of Contents

- Features
- Tech Stack
- Project Structure
- Installation
- Usage
- Firebase Setup
- Redux Store
- Components Overview
- Routing
- State Management
- Firestore Structure
- Contributing
- License

## Features

- User Authentication: Register and log in using Firebase Authentication.
- Product Browsing: View a list of products stored in Firestore.
- Cart Management: Add, update, and remove products in your cart, with real-time updates.
- Order Placement: Place orders with the products in your cart.
- Persistent State: The cart and user information are stored in Firestore, providing a consistent experience across sessions.
- State Management: Centralized state management using Redux Toolkit.

## Tech Stack

- Frontend: React, React Router DOM, Redux Toolkit
- Backend: Firebase Authentication, Firebase Firestore
- Styling: CSS Modules
- Utilities: React Toastify (for notifications), React Spinners (for loading indicators)

## Project Structure

├── public
│ ├── index.html
│ └── ...
├── src
│ ├── assets
│ ├── components
│ ├── firebase
│ ├── pages
│ ├── redux
│ ├── styles
│ ├── App.js
│ ├── index.js
│ └── ...
└── README.md

## Key Folders

- src/assets: Static assets like images and icons.
- src/components: Reusable components like Navbar, ProductCard, CartItem, etc.
- src/firebase: Firebase configuration and initialization.
- src/pages: Pages like Home, Register, Login, Cart, and Orders.
- src/redux: Redux store setup, slices, and thunks.
- src/styles: CSS modules for styling components.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
 git clone https://github.com/your-username/buybusy.git
```

2. Navigate to the project directory:

```bash
 cd buybusy
```

3. Install the dependencies:

```bash
 npm install
```

4. Set up Firebase (see Firebase Setup).
5. Start the development server:

```bash
 npm start
```

## Usage

Once the server is running, you can access the app at http://localhost:3000.

Register: Create a new account.
Login: Access your account.
Browse Products: View available products.
Cart: Manage items in your cart.
Order: Place an order with the items in your cart.

## Firebase Setup

1. Go to the Firebase Console and create a new project.
2. Add a web app to your Firebase project and copy the Firebase configuration.

3. Replace the configuration in src/firebase/config.js:
   const firebaseConfig = {
   apiKey: "your-api-key",
   authDomain: "your-auth-domain",
   projectId: "your-project-id",
   storageBucket: "your-storage-bucket",
   messagingSenderId: "your-messaging-sender-id",
   appId: "your-app-id",
   }

4. Enable Email/Password Authentication in the Firebase Console under Authentication > Sign-in method.
5. Create Firestore collections:

- products: Stores product data.
- usersCarts: Stores user carts.
- userOrders: Stores user orders.

## Redux Store

The app uses Redux Toolkit for state management. The main slices include:

authSlice: Manages user authentication state.
cartSlice: Manages the cart state.
productSlice: Fetches and manages product data.

## Store Structure

authSlice: Handles user login, registration, and logout.
cartSlice: Handles fetching the cart, adding/removing items, and updating quantities.
productSlice: Handles fetching product data from Firestore.

## Components Overview

Navbar: Displays the navigation menu.
ProductCard: Displays individual product details.
CartItem: Displays items in the cart.
OrderSummary: Displays order details after checkout.

## Routing

The app uses react-router-dom for client-side routing:

/: Home page with product listings.
/register: Registration page.
/login: Login page.
/cart: Cart page with added products.
/orders: Orders page showing past orders.

## State Management

State is managed globally using Redux Toolkit. The store structure is as follows:

const store = configureStore({
reducer: {
auth: authSlice.reducer,
cart: cartSlice.reducer,
products: productSlice.reducer,
},
});

## Firestore Structure

- products Collection:
  Each document represents a product with fields like name, price, image, description, etc.
- usersCarts Collection:
  Each document is named after the user's uid, containing a myCart array field to store cart items.
- userOrders Collection:
  Each document is named after the user's uid, containing an orders array field to store order details.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

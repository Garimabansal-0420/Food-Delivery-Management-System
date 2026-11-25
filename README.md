# 🍔 FoodieHub – Food Delivery Management System

**FoodieHub** is a web-based Food Delivery Management System designed to provide users with a smooth and convenient food ordering experience. It allows users to explore restaurants, browse food menus, view food details, manage their cart and wishlist, book tables, and track their orders through an interactive interface.

The project is developed using HTML, CSS, and JavaScript, with JSON Server used for local database functionality.

## 🚀 Features

### 1. Home Page
- Attractive landing page with a modern user interface.
- Explore food categories and popular food items.
- Search functionality for food items and restaurants.
- Quick navigation to different sections.

### 2. User Authentication
- User registration and login pages.
- Login session management.
- Personalized user greeting.
- Logout functionality.

### 3. Restaurant Management
- Browse available restaurants.
- Search restaurants by name.
- Filter restaurants based on cuisine and ratings.
- Filter according to delivery time.
- Sort restaurants by rating, delivery time, and name.
- Add restaurants to the wishlist.

### 4. Food Menu
- Browse available food items.
- Explore different food categories.
- View restaurant-specific food menus.
- Navigate to individual food details.

### 5. Shopping Cart
- Add food items to the cart.
- Increase or decrease item quantities.
- Remove individual items.
- Calculate item totals and the overall bill.
- Persistent cart data using LocalStorage.
- Live cart counter.

### 6. Wishlist
- Add and remove restaurants or food items from the wishlist.
- View saved favourites.
- Persistent wishlist data using LocalStorage.

### 7. Table Booking
- Select the number of guests.
- Choose available table options.
- Confirm and manage table bookings.

### 8. Order Confirmation & Tracking
- Order confirmation interface.
- Display order information.
- Track order progress through different stages.
- View order status and booking information.

### 9. Responsive Design
- User-friendly interface.
- Separate CSS files for different pages.
- Responsive styling for different screen sizes.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of web pages |
| CSS3 | Styling and responsive layouts |
| JavaScript | Dynamic functionality and DOM manipulation |
| JSON Server | Local REST API and JSON-based database |
| LocalStorage | Persistent cart and wishlist data |
| SessionStorage | Login session management |
| Git & GitHub | Version control and project hosting |

## 📂 Project Structure

```text
Food-Delivery-Management-System/
│
├── CSS/
│   ├── style.css
│   ├── responsive.css
│   ├── restaurents.css
│   ├── menu.css
│   ├── fooddetails.css
│   ├── cart.css
│   ├── Wishlist.css
│   ├── login.css
│   ├── registration.css
│   ├── confirmation.css
│   ├── table-booking.css
│   └── order-tracking.css
│
├── HTML/
│   ├── homepage.html
│   ├── restaurants.html
│   ├── menu.html
│   ├── fooddetails.html
│   ├── cart.html
│   ├── Wishlist.html
│   ├── login.html
│   ├── registration.html
│   ├── confirmation.html
│   ├── booking.html
│   └── tracking.html
│
├── JAVASCRIPT/
│   ├── app.js
│   ├── auth.js
│   ├── cart-common.js
│   ├── cart.js
│   ├── fooddetails.js
│   ├── login.js
│   ├── registration.js
│   ├── restaurants.js
│   ├── menu.js
│   ├── wishlist.js
│   ├── table-booking.js
│   ├── order-tracking.js
│   └── confirmation.js
│
├── Images/
│   └── Food and restaurant images
│
├── db.json
├── database.json
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run FoodieHub on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- A modern web browser

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the Project Directory

```bash
cd Food-Delivery-Management-System
```

### Step 3: Install JSON Server

```bash
npm install -g json-server
```

### Step 4: Start JSON Server

```bash
json-server --watch db.json --port 3000
```

The local JSON Server API will be available at:

```text
http://localhost:3000
```

### Step 5: Run the Project

1. Open the project folder in Visual Studio Code.
2. Open the `HTML` folder.
3. Run `homepage.html` using the Live Server extension.
4. Explore the FoodieHub application.

## 💡 Key Concepts Implemented

- DOM Manipulation
- JavaScript Event Handling
- Client-Side Form Validation
- LocalStorage and SessionStorage
- JSON Data Handling
- CRUD Operations
- Search, Filtering and Sorting
- Dynamic Content Rendering
- Modular JavaScript
- Responsive Web Design

## 🔮 Future Enhancements

- Integration with a real payment gateway.
- Real-time order tracking.
- Backend development using Node.js and Express.js.
- Database integration using MongoDB or MySQL.
- Admin dashboard for restaurant and order management.
- Improved authentication and authorization.
- Restaurant-side order management system.

## 👩‍💻 Contributors

Developed as a third-year B.Tech Computer Science project.

**Project Name:** FoodieHub – Food Delivery Management System

---

⭐ If you find this project interesting, consider giving the repository a star!

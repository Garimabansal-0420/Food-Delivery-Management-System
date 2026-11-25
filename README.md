# 🍔 FoodieHub – Food Delivery Management System

FoodieHub is a web-based Food Delivery Management System developed as a Third-Year B.Tech Mini Project. It provides users with an interactive platform to explore restaurants, browse food menus, manage their favourite restaurants, add food items to a shopping cart, book tables, and track orders.

The project is built using **HTML5, CSS3, JavaScript, and JSON Server**. It focuses on practical implementation of frontend development concepts, DOM manipulation, event handling, browser storage, API integration, and dynamic data management.

---

## 🚀 Features

### 1. Home Page
- Interactive landing page with a user-friendly interface.
- Explore food categories and popular food items.
- Search for food items.
- Add food items directly to the cart.
- Add favourite food items to the wishlist.
- Navigation to different sections of the application.

### 2. User Authentication
- User registration and login functionality.
- Form validation for user inputs.
- Email and phone number validation.
- Password strength indicator.
- Show/Hide password functionality.
- Session management using SessionStorage.
- Personalized user greeting.
- Logout functionality.
- Account deletion using JSON Server API.

### 3. Restaurant Management
- Browse available restaurants.
- Search restaurants by name.
- Filter restaurants by cuisine.
- Filter restaurants based on ratings.
- Filter restaurants according to delivery time.
- Sort restaurants by rating, delivery time, and name.
- Load More functionality.
- Add and remove restaurants from the wishlist.

### 4. Food Menu
- Browse restaurant-specific food menus.
- Explore different food categories.
- View available food items and their details.
- Navigate between restaurant menus and food details.
- Add selected food items to the cart.

### 5. Food Details
- Dedicated restaurant food details page.
- Display restaurant information and available food items.
- View food descriptions and prices.
- Add food items to the cart.
- Increase or decrease food quantities.
- Dynamic cart summary and total price calculation.
- Customer review submission interface.

### 6. Shopping Cart
- Add food items from different sections of the application.
- Increase and decrease item quantities.
- Remove individual items from the cart.
- Calculate item totals and the overall bill.
- Dynamic cart counter.
- Persistent cart data using LocalStorage.
- Checkout functionality.
- Order creation and storage.

### 7. Wishlist
- Save favourite restaurants.
- Remove restaurants from the wishlist.
- Display saved restaurants dynamically.
- Sort saved restaurants by:
  - Rating (High to Low)
  - Rating (Low to High)
  - Name (A to Z)
  - Name (Z to A)
  - Price (Low to High)
  - Price (High to Low)
- Navigate to the selected restaurant's menu using Order Now.
- Persistent wishlist data using LocalStorage.

### 8. Table Booking
- Select available tables.
- Choose the number of guests.
- Automatically adjust guest count according to table capacity.
- Select booking date and time.
- Validate customer information.
- Save booking details.
- Display booking confirmation.

### 9. Order Confirmation and Tracking
- Order confirmation interface.
- Display order details and food items.
- Track order progress through different stages:
  - Order Confirmed
  - Preparing Food
  - On The Way
  - Delivered
- Display order summary and delivery information.
- View booking history.

### 10. Responsive Design
- User-friendly interface.
- Separate CSS files for different pages.
- Responsive layouts for different screen sizes.
- Consistent navigation and styling.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure and layout of web pages |
| CSS3 | Styling, layouts, and responsive design |
| JavaScript | Dynamic functionality and user interactions |
| DOM Manipulation | Accessing and modifying HTML elements |
| LocalStorage | Persistent cart, wishlist, booking, and order data |
| SessionStorage | User login and session management |
| JSON Server | Mock REST API for user-related operations |
| Fetch API | Communication with the JSON Server backend |
| Git & GitHub | Version control and project collaboration |
| VS Code | Development environment |

---

## 📂 Project Structure

```text
Food-Delivery-Management-System/
│
├── CSS/
│   ├── Wishlist.css
│   ├── cart.css
│   ├── confirmation.css
│   ├── fooddetails.css
│   ├── login.css
│   ├── menu.css
│   ├── order-tracking.css
│   ├── registration.css
│   ├── responsive.css
│   ├── restaurents.css
│   ├── style.css
│   └── table-booking.css
│
├── HTML/
│   ├── Wishlist.html
│   ├── booking.html
│   ├── cart.html
│   ├── confirmation.html
│   ├── fooddetails.html
│   ├── homepage.html
│   ├── login.html
│   ├── menu.html
│   ├── registration.html
│   ├── restaurants.html
│   └── tracking.html
│
├── JAVASCRIPT/
│   ├── app.js
│   ├── auth.js
│   ├── cart-common.js
│   ├── cart.js
│   ├── confirmation.js
│   ├── fooddetails.js
│   ├── login.js
│   ├── menu.js
│   ├── order-tracking.js
│   ├── registration.js
│   ├── restaurents.js
│   ├── table-booking.js
│   └── wishlist.js
│
├── Images/
│   ├── Food images
│   ├── Restaurant images
│   ├── Login images
│   └── Registration images
│
├── db.json
├── index.html
└── README.md
```

---

## 🔗 Application Workflow

The application follows a multi-page architecture where different HTML pages are connected through navigation links, JavaScript functions, and browser storage.

### User Journey

1. Users enter the application through the Home Page.
2. They explore restaurants and browse available menus.
3. They can save favourite restaurants to their Wishlist.
4. They select a restaurant and explore its food menu.
5. They view individual food details and add dishes to the Cart.
6. They review selected items and proceed with checkout.
7. They receive an order confirmation.
8. They can visit the Order Tracking page to view order progress.
9. Users can also book restaurant tables through the Table Booking section.

### Page Navigation

The application uses separate HTML pages for different functionalities:

- `index.html` redirects users to `HTML/homepage.html`.
- `homepage.html` serves as the main landing page.
- `restaurants.html` displays available restaurants.
- `menu.html` displays the selected restaurant's menu.
- `fooddetails.html` displays food details and ordering options.
- `Wishlist.html` displays saved restaurants.
- `cart.html` manages selected food items.
- `booking.html` handles restaurant table reservations.
- `confirmation.html` displays confirmation information.
- `tracking.html` displays order progress.
- `login.html` and `registration.html` handle user authentication.

---

## 💾 Data Management

The project uses browser storage and JSON Server to manage application data.

### 1. LocalStorage

LocalStorage is used to maintain data even after the browser is refreshed or closed.

The application uses LocalStorage for:

| Storage Key | Purpose |
|---|---|
| `foodiehub_cart` | Stores cart items |
| `foodiehub_wishlist` | Stores favourite restaurants |
| `foodiehub_selected_restaurant` | Stores the selected restaurant |
| `foodiehub_orders` | Stores placed orders |
| `foodiehub_current_order_id` | Stores the current order ID |
| `foodiehub_bookings` | Stores table booking information |

### 2. SessionStorage

SessionStorage maintains temporary session-related information.

It is used for:
- Storing logged-in user information.
- Maintaining login sessions.
- Managing logout functionality.
- Handling navigation after login.
- Maintaining temporary registration and checkout states.

### 3. JSON Server

JSON Server is used as a mock backend to provide REST API functionality.

The `db.json` file stores user information and acts as the database for authentication-related operations.

The application uses the Fetch API to communicate with the server.

---

## ⚙️ Installation and Setup

Follow these steps to run FoodieHub on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Web browser (Chrome, Edge, Firefox, etc.)
- Live Server extension for VS Code

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

Run the following command from the project root directory:

```bash
json-server --watch db.json --port 3000
```

The API will be available at:

```text
http://localhost:3000
```

The users endpoint can be accessed at:

```text
http://localhost:3000/users
```

**Note:** Keep the JSON Server terminal running while using registration, login, and account deletion features.

### Step 5: Run the Frontend

1. Open the cloned project in Visual Studio Code.
2. Open the project folder.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The application will redirect to the FoodieHub homepage.

---

## 💡 Key Concepts Implemented

The project demonstrates several important concepts of frontend development and JavaScript.

### HTML5 and CSS3
- Semantic HTML elements.
- Forms and input elements.
- Hyperlinks and relative file paths.
- CSS selectors and positioning.
- Flexbox layouts.
- Responsive web design.
- CSS transitions and hover effects.

### JavaScript
- Variables, functions, and operators.
- Arrays and objects.
- DOM manipulation.
- Event handling and event delegation.
- Arrow functions and callback functions.
- Template literals.
- Array methods:
  - `map()`
  - `filter()`
  - `find()`
  - `findIndex()`
  - `some()`
  - `forEach()`
  - `sort()`
  - `reduce()`
- JSON parsing and serialization.
- LocalStorage and SessionStorage.
- Custom events.
- Form validation.
- Regular expressions.
- Fetch API.
- Asynchronous JavaScript.
- Dynamic HTML rendering.

### API and Data Management
- REST API fundamentals.
- HTTP methods such as GET, POST, and DELETE.
- JSON data handling.
- Client-side data persistence.
- CRUD-related operations.

---

## 🔮 Future Enhancements

- Integration of a real payment gateway.
- Real-time restaurant order management.
- Live delivery partner tracking.
- Secure backend authentication and authorization.
- Integration with MongoDB or MySQL.
- Admin dashboard for managing restaurants, users, and orders.
- Persistent customer reviews.
- Improved order management and notification system.

---

## 👩‍💻 Project Information

**Project Name:** FoodieHub – Food Delivery Management System

**Project Type:** Third-Year B.Tech Mini Project

**Domain:** Web Development

**Technologies:** HTML5, CSS3, JavaScript, JSON Server

---

⭐ If you find this project interesting, consider giving this repository a star!

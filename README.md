# 🍔 FoodieHub – Food Delivery Management System

FoodieHub is a web-based Food Delivery Management System developed to provide users with a convenient and interactive food ordering experience. The application allows users to explore restaurants, browse food menus, view food details, add items to their cart, manage their wishlist, book tables, and track their orders.

The project focuses on implementing core frontend development concepts, JavaScript functionality, browser storage, API integration, and dynamic user interactions.

---

## 🚀 Features

### 1. Home Page
- Interactive landing page with a user-friendly interface.
- Explore popular food items and categories.
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
- Account deletion functionality using JSON Server API.

### 3. Restaurant Management
- Browse available restaurants.
- Search restaurants by name.
- Filter restaurants by cuisine.
- Filter restaurants based on ratings.
- Filter restaurants according to delivery time.
- Sort restaurants by rating, delivery time, and name.
- Load More functionality to display additional restaurants.
- Add and remove restaurants from the wishlist.

### 4. Food Menu
- Browse restaurant-specific food menus.
- Explore different food categories.
- View available food items and their details.
- Navigate between restaurant menus and food details.
- Add selected food items to the cart.

### 5. Food Details
- Dedicated restaurant food details page.
- Display restaurant information and food items.
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

### 9. Order Confirmation & Tracking
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
| JSON Server | Mock REST API for user registration, login data retrieval, and account deletion |
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
└── README.md
```

---

## 🔗 Application Workflow

The application follows a multi-page architecture where different HTML pages are connected through navigation links and JavaScript.

**User Journey:**

1. Users enter the application through the Home Page.
2. They explore restaurants and browse available menus.
3. They can save favourite restaurants to their Wishlist.
4. They can select a restaurant and explore its food menu.
5. They view individual food details and add dishes to the Cart.
6. They review their selected items and proceed with checkout.
7. They can view order confirmation and order tracking information.
8. Users can also book restaurant tables through the Table Booking section.

### Data Management

- `cart-common.js` provides reusable cart operations across multiple pages.
- LocalStorage maintains cart, wishlist, selected restaurant, booking, and order information.
- SessionStorage maintains login-related information.
- JSON Server provides a REST API for user-related operations.
- JavaScript dynamically updates page content based on stored information and user interactions.

---

## ⚙️ Installation & Setup

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
2. Open the `HTML` folder.
3. Right-click `homepage.html`.
4. Select **Open with Live Server**.
5. The FoodieHub application will open in your browser.

---

## 💡 Key Concepts Implemented

The project demonstrates the following web development and JavaScript concepts:

### HTML & CSS
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
- Event handling and event bubbling.
- Event delegation.
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
- Fetch API and asynchronous JavaScript.
- Dynamic HTML rendering.

### API & Data Management
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

**Technologies:** HTML, CSS, JavaScript, JSON Server

---

⭐ If you find this project interesting, consider giving this repository a star!


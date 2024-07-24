# Assignment API

This project is a Django-based application for managing books and reviews. Users can register, login, and leave reviews for books. The project includes a RESTful API and a front-end built with Bootstrap.

## Features

- User Registration and Authentication
- CRUD Operations for Books
- Adding and Managing Reviews for Books
- Search Functionality for Books
- Responsive Bootstrap Front-End

## Requirements

- Python 3.8+
- Django 5.0.7
- Django REST Framework
- PostgreSQL
- Pillow

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/KC-Kollu/assignment_api.git
    cd assignment_api
    ```

2. **Create and activate a virtual environment**:
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. **Install the required packages**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Configure PostgreSQL database**:
    - Make sure PostgreSQL is installed and running.
    - Create a database named `assignment_db`.
    - Update the `DATABASES` setting in `assignment_api/settings.py` with your database credentials.

5. **Run migrations**:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

6. **Create a superuser**:
    ```bash
    python manage.py createsuperuser
    ```

7. **Run the development server**:
    ```bash
    python manage.py runserver
    ```

8. **Access the application**:
    - Admin panel: `http://127.0.0.1:8000/admin`
    - API: `http://127.0.0.1:8000/api`

## Project Structure

### Backend

#### `assignment_api/`
This is the main Django project directory that contains settings and configuration files for the project.

#### `books/`
This Django app is responsible for managing books and reviews.

- **`models.py`**:
  - Defines the database schema for the `Book` and `Review` models.
  - `Book` model includes fields like `title`, `author`, `description`, `published_date`, and `image`.
  - `Review` model includes fields like `book`, `review_text`, `rating`, and `reviewer`.

- **`views.py`**:
  - Contains the view classes for handling HTTP requests related to books and reviews.
  - `BookListCreateView`: Handles listing and creating books.
  - `BookDetailView`: Handles retrieving, updating, and deleting a specific book.
  - `ReviewCreateView`: Handles creating reviews for a specific book.
  - `ReviewDetailView`: Handles updating and deleting specific reviews.

- **`urls.py`**:
  - Defines the URL patterns for the `books` app.
  - Maps URLs to the appropriate view classes.
  - Example: `path('books/', BookListCreateView.as_view(), name='book-list-create')`

- **`serializers.py`**:
  - Contains the serializer classes for converting model instances to and from JSON.
  - `BookSerializer`: Serializes book instances. Includes a nested `ReviewSerializer` to include reviews related to a book.
  - `ReviewSerializer`: Serializes review instances.

#### `users/`
This Django app handles user registration, login, and authentication.

- **`models.py`**:
  - Uses Django's built-in `User` model for authentication.

- **`views.py`**:
  - Contains the view classes for handling user authentication.
  - `RegisterView`: Handles user registration.
  - `LoginView`: Handles user login.

- **`urls.py`**:
  - Defines the URL patterns for the `users` app.
  - Maps URLs to the appropriate view classes.
  - Example: `path('register/', RegisterView.as_view(), name='register')`

- **`serializers.py`**:
  - Contains the serializer classes for converting user instances to and from JSON.
  - `UserSerializer`: Serializes user instances.

### Frontend

#### `templates/index.html`
This is the main HTML file for the front-end application. It includes the layout and structure of the web page, and it uses Bootstrap for styling.

- **Structure**:
  - Navigation bar with login and register modals.
  - Search bar to filter books.
  - Grid layout to display books.
  - Modal to display book details and reviews.
  - Forms for submitting reviews.

#### `static/script.js`
This JavaScript file contains the logic for interacting with the REST API and dynamically updating the HTML content.

- **Functions**:
  - **`fetchBooks(query = '')`**: Fetches and displays a list of books based on the search query.
  - **`showBookDetails(book)`**: Displays detailed information about a selected book, including reviews.
  - **`addReview(bookId, reviewText, reviewRating)`**: Adds a new review for a book.
  - **`editReview(reviewId, reviewText, reviewRating, bookId)`**: Edits an existing review.
  - **`deleteReview(reviewId, bookId)`**: Deletes a review.
  - **`handleLogin(event)`**: Handles user login by sending a POST request to the API.
  - **`handleRegister(event)`**: Handles user registration by sending a POST request to the API.
  - **`handleLogout()`**: Handles user logout by clearing local storage.
  - **`updateNavbar()`**: Updates the navigation bar based on the user's authentication status.

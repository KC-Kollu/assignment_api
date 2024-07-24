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
    git clone https://github.com/yourusername/assignment_api.git
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

- `assignment_api/`: The Django project directory.
- `books/`: The Django app for managing books and reviews.
- `templates/`: HTML templates for the front-end.
- `static/`: Static files (CSS, JS).
- `media/`: Directory for uploaded book images.
- `requirements.txt`: List of Python dependencies.
- `README.md`: Project documentation.
const apiUrl = 'http://127.0.0.1:8000/api';
let reviewForm;
let csrftoken;

document.addEventListener('DOMContentLoaded', function() {
    const bookGrid = document.getElementById('book-grid');
    const bookDetails = document.getElementById('book-details');
    const bookImage = document.getElementById('book-image');
    const bookTitle = document.getElementById('book-title');
    const bookAuthor = document.getElementById('book-author');
    const bookDescription = document.getElementById('book-description');
    const bookPublishedDate = document.getElementById('book-published-date');
    const reviewList = document.getElementById('review-list');
    reviewForm = document.getElementById('review-form');
    const backButton = document.getElementById('back-button');
    const searchButton = document.getElementById('searchButton');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const navUsername = document.getElementById('nav-username');
    const navLogout = document.getElementById('nav-logout');
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    csrftoken = getCookie('csrftoken');

    function fetchBooks(query = '') {
        fetch(`${apiUrl}/books/?search=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log('Books data:', data);
                bookGrid.innerHTML = '';
                if (data.length === 0) {
                    const noBooksMessage = document.createElement('p');
                    noBooksMessage.textContent = 'No books available.';
                    bookGrid.appendChild(noBooksMessage);
                } else {
                    data.forEach(book => {
                        const col = document.createElement('div');
                        col.className = 'col-md-3';
                        const card = document.createElement('div');
                        card.className = 'card mb-4';
                        const img = document.createElement('img');
                        img.src = book.image || 'https://via.placeholder.com/150';
                        img.className = 'card-img-top';
                        img.alt = book.title;
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body';
                        const cardTitle = document.createElement('h5');
                        cardTitle.className = 'card-title';
                        cardTitle.textContent = book.title;
                        cardBody.appendChild(cardTitle);
                        card.appendChild(img);
                        card.appendChild(cardBody);
                        col.appendChild(card);
                        card.addEventListener('click', () => showBookDetails(book));
                        bookGrid.appendChild(col);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }

    window.showBookDetails = function(book) {
        bookGrid.style.display = 'none';
        bookDetails.style.display = 'block';
        bookImage.src = book.image || 'https://via.placeholder.com/150';
        bookTitle.textContent = book.title;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookDescription.textContent = book.description;
        bookPublishedDate.textContent = `Published Date: ${book.published_date}`;
        reviewList.innerHTML = '';
        book.reviews.forEach(review => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                ${review.reviewer_username}: ${review.review_text} (Rating: ${review.rating})
                ${review.reviewer_username === localStorage.getItem('username') ? `
                    <button class="btn btn-danger btn-sm float-end" onclick="deleteReview(${review.id}, ${book.id})">Delete</button>
                    <button class="btn btn-warning btn-sm float-end me-2" onclick="editReview(${review.id}, '${review.review_text}', ${review.rating}, ${book.id})">Edit</button>
                ` : ''}
            `;
            reviewList.appendChild(li);
        });
        reviewForm.onsubmit = function(event) {
            event.preventDefault();
            const reviewText = document.getElementById('review-text').value;
            const reviewRating = document.getElementById('review-rating').value;
            addReview(book.id, reviewText, reviewRating);
        };
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        console.log('Login Attempt:', username, password);  // Debugging log
        fetch(`${apiUrl}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                alert('Login successful');
                updateNavbar();
                fetchBooks();
                const loginModal = document.getElementById('loginModal');
                const modal = bootstrap.Modal.getInstance(loginModal);
                modal.hide();
            } else {
                alert('Invalid credentials');
            }
        });
    }

    function handleRegister(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        console.log('Register Attempt:', username, password);  // Debugging log
        fetch(`${apiUrl}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                alert('Registration successful');
                updateNavbar();
                const registerModal = document.getElementById('registerModal');
                const modal = bootstrap.Modal.getInstance(registerModal);
                modal.hide();
            } else {
                alert('Error registering user');
            }
        });
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        alert('Logout successful');
        updateNavbar();
        fetchBooks();
    }

    function updateNavbar() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
            navUsername.textContent = username;
            navUsername.style.display = 'block';
            navLogout.style.display = 'block';
            navLogin.style.display = 'none';
            navRegister.style.display = 'none';
        } else {
            navUsername.style.display = 'none';
            navLogout.style.display = 'none';
            navLogin.style.display = 'block';
            navRegister.style.display = 'block';
        }
    }

    backButton.addEventListener('click', function() {
        bookDetails.style.display = 'none';
        bookGrid.style.display = 'block';
    });

    searchButton.addEventListener('click', function() {
        const query = document.querySelector('.form-control').value;
        fetchBooks(query);
    });

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    navLogout.addEventListener('click', handleLogout);

    updateNavbar();
    fetchBooks();
});

function fetchBookDetails(bookId) {
    fetch(`${apiUrl}/books/${bookId}/`)
        .then(response => response.json())
        .then(data => {
            window.showBookDetails(data);
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
        });
}

function deleteReview(reviewId, bookId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to delete a review.');
        return;
    }
    fetch(`${apiUrl}/reviews/${reviewId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': csrftoken
        }
    })
    .then(response => {
        if (response.status === 204) {
            fetchBookDetails(bookId);
        } else {
            alert('Error deleting review');
        }
    });
}

function editReview(reviewId, reviewText, reviewRating, bookId) {
    document.getElementById('review-text').value = reviewText;
    document.getElementById('review-rating').value = reviewRating;
    reviewForm.onsubmit = function(event) {
        event.preventDefault();
        const updatedText = document.getElementById('review-text').value;
        const updatedRating = document.getElementById('review-rating').value;
        updateReview(reviewId, updatedText, updatedRating, bookId);
    };
}

function updateReview(reviewId, reviewText, reviewRating, bookId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to update a review.');
        return;
    }
    fetch(`${apiUrl}/reviews/${reviewId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            review_text: reviewText,
            rating: reviewRating
        })
    })
    .then(response => {
        if (response.status === 200) {
            document.getElementById('review-text').value = '';
            document.getElementById('review-rating').value = '';
            fetchBookDetails(bookId);
        } else {
            alert('Error updating review');
        }
    });
}

function addReview(bookId, reviewText, reviewRating) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to add a review.');
        return;
    }
    fetch(`${apiUrl}/books/${bookId}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            review_text: reviewText,
            rating: reviewRating
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            document.getElementById('review-text').value = '';
            document.getElementById('review-rating').value = '';
            fetchBookDetails(bookId);
        } else {
            alert('Error adding review');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const bookGrid = document.getElementById('book-grid');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.querySelector('.form-control');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            fetchBooks(query);
        } else {
            fetchBooks(); // Fetch all books if the search input is empty
        }
    });
});

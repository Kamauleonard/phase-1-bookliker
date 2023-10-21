
document.addEventListener('DOMContentLoaded', function() {
    const bookList = document.querySelector('#list');
    const bookDetail = document.querySelector('#show-panel');
    let currentUser = {"id": 1, "username": "pouros"};
  
  
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {
          const bookTitle = document.createElement('li');
          bookTitle.textContent = book.title;
          bookList.appendChild(bookTitle);
  
         
          bookTitle.addEventListener('click', () => showBookDetails(book));
        });
      });
  
   
    function showBookDetails(book) {
      bookDetail.innerHTML = '';
      
      const bookTitle = document.createElement('h2');
      bookTitle.textContent = book.title;
      
      const bookImage = document.createElement('img');
      bookImage.src = book.img_url;
  
      const bookDescription = document.createElement('p');
      bookDescription.textContent = book.description;
  
      const likeButton = document.createElement('button');
      likeButton.textContent = 'LIKE';
      likeButton.addEventListener('click', () => likeBook(book));
  
      const likersList = document.createElement('ul');
      book.users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user.username;
        likersList.appendChild(userItem);
      });
  
      bookDetail.appendChild(bookTitle);
      bookDetail.appendChild(bookImage);
      bookDetail.appendChild(bookDescription);
      bookDetail.appendChild(likersList);
      bookDetail.appendChild(likeButton);
    }
  
    // Function to like a book
    function likeBook(book) {
      if (!book.users.find(user => user.id === currentUser.id)) {
        book.users.push(currentUser);
        updateBookLikes(book);
      } else {
        book.users = book.users.filter(user => user.id !== currentUser.id);
        updateBookLikes(book);
      }
    }
  
    // Function to update book likes
    function updateBookLikes(book) {
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ users: book.users })
      })
        .then(response => response.json())
        .then(updatedBook => showBookDetails(updatedBook));
    }
  });
  
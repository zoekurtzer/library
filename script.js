const myLibrary = [];

function Book(title, author, pages, read) {
 this.id = crypto.randomUUID();
 this.title = title;
 this.author = author;
 this.pages = pages;
 this.read = read;
}

Book.prototype.toggleRead = function () {
 this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
 const newBook = new Book(title, author, pages, read);
 myLibrary.push(newBook);
 displayBooks();
}

function displayBooks() {
 const container = document.getElementById('bookContainer');
 container.innerHTML = '';

 myLibrary.forEach((book) => {
   const card = document.createElement('div');
   card.classList.add('book-card');
   card.setAttribute('data-id', book.id);

   card.innerHTML = `
     <h3>${book.title}</h3>
     <p><strong>Author:</strong> ${book.author}</p>
     <p><strong>Pages:</strong> ${book.pages}</p>
     <p><strong>Status:</strong> ${book.read ? 'Read' : 'Not Read'}</p>
     <button class="toggle-read">Toggle Read</button>
     <button class="remove-book">Remove</button>
   `;

   container.appendChild(card);
 });

 addCardEventListeners();
}

function addCardEventListeners() {
 document.querySelectorAll('.remove-book').forEach((btn) => {
   btn.addEventListener('click', (e) => {
     const id = e.target.parentElement.getAttribute('data-id');
     const index = myLibrary.findIndex(book => book.id === id);
     if (index !== -1) {
       myLibrary.splice(index, 1);
       displayBooks();
     }
   });
 });

 document.querySelectorAll('.toggle-read').forEach((btn) => {
   btn.addEventListener('click', (e) => {
     const id = e.target.parentElement.getAttribute('data-id');
     const book = myLibrary.find(book => book.id === id);
     if (book) {
       book.toggleRead();
       displayBooks();
     }
   });
 });
}

// form
const dialog = document.getElementById('bookFormDialog');
const form = document.getElementById('bookForm');
const newBookBtn = document.getElementById('newBookBtn');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
 dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
 dialog.close();
 form.reset();
});

form.addEventListener('submit', (e) => {
 e.preventDefault();
 const title = document.getElementById('title').value;
 const author = document.getElementById('author').value;
 const pages = parseInt(document.getElementById('pages').value);
 const read = document.getElementById('read').checked;

 addBookToLibrary(title, author, pages, read);

 dialog.close();
 form.reset();
});

// test sample books
addBookToLibrary("Carrying the Fire: Astronaut's Journeys", "Michael Collins", 512, true);
addBookToLibrary("The Right Stuff", "Tom Wolfe", 352, false);

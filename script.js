const myLibrary = [];

function Book(title, author, pages, read) {
  // constructors
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  function addBookToLibrary() {
    // will store into an array
  }
}

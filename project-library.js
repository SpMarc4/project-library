const myLibrary = [];

function Book(id, title, author, pages, read) 
{
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary (title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = Book(id, title, author, pages);
    myLibrary.push(book)
} 


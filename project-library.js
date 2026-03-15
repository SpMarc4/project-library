const myLibrary = [];

function Book(id, title, author, pages, read) 
{
    if (!new.target) {
        throw Error('You need to declare the constructor new.')
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary (title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = new Book(id, title, author, pages);
    myLibrary.push(book)
} 

const exampleBook = new Book(
    'The Hobbit',
    'J.R Tolkien',
    '295',
    'not read yet'
);
const bookshelves = document.querySelector('#bookshelves');

function bookshelvesDisplay(bookArray) {
    for (const book in bookArray) {
        let bookshelvesRow = document.createElement('tr');
        for (const [key, value] of Object.entries(book)) {
            let rowData = document.createElement('td');
            rowData.textContent = value;
            bookshelvesRow.appendChild(rowData)
        }
        bookshelves.appendChild(bookshelvesRow);
    }
};

addBookToLibrary(
    'The Hobbit',
    'J.R Tolkien',
    '29',
    'not read yet'
)

bookshelvesDisplay(myLibrary);
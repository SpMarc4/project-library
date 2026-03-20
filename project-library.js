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
    let book = new Book(id, title, author, pages, read);
    myLibrary.push(book)
} 
const bookshelves = document.querySelector('#bookshelves');

function bookshelvesDisplay(bookArray) {
    for (const book of bookArray) {
        let bookshelvesRow = document.createElement('tr');
        console.log(`Book ${bookArray[book]}`)
        for (const [key, value] of Object.entries(book)) {
            console.log(`key ${key}`)
            console.log(`values ${value}`)
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

console.log(myLibrary)

bookshelvesDisplay(myLibrary);
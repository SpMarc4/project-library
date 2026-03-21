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

// Se obtiene el contenido de la form

function getFormContent() {
    let title = document.querySelector('input#title').value;
    console.log(`title ${title} type ${typeof(title)}`)
    let author = document.querySelector('input#author').value;
    console.log(`author ${author} type ${typeof(author)}`)
    let pages = document.querySelector('input#pages').value;
    console.log(`pages ${pages} type ${typeof(pages)}`)
    let read = document.querySelector('input#read').value;
    console.log(`read ${read} type ${typeof(read)}`)
    let bookOutput = [title, author, pages, read];
    return bookOutput
};

// Se añade un libro a la librería

function addBookToLibrary (title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = new Book(id, title, author, pages, read);
    myLibrary.push(book)
} 

// Se muestra el último libro en la librería

const bookshelves = document.querySelector('#bookshelves');

function bookshelvesDisplay(lastBook) {
    let bookshelvesRow = document.createElement('tr');
    console.log(`Book ${lastBook}`)
    for (const [key, value] of Object.entries(lastBook)) {
        console.log(`key ${key}`);
        console.log(`values ${value}`);
        let rowData = document.createElement('td');
        rowData.textContent = value;
        if (key=='id') {bookshelvesRow.setAttribute('id', value)};
        bookshelvesRow.appendChild(rowData);
    }
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.style.setProperty('display', 'table-cell');
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.setAttribute('data-id', lastBook.id);
    // Se añade evento al nuevo motor añadido
    deleteButton.addEventListener('click', deleteBook);
    bookshelvesRow.appendChild(deleteButton);
    bookshelves.appendChild(bookshelvesRow);
};

// Ciclo completo de añadir hasta mostrar libro

function addNewBook(event) {
    [title, author, pages, read] = getFormContent();
    addBookToLibrary(title, author, pages, read)
    console.log(myLibrary.at(-1))
    bookshelvesDisplay(myLibrary.at(-1))
    event.preventDefault();
};

// Eliminación libro

function deleteBook(event) {
    let buttonId = event.target.getAttribute("data-id");
    let bookToBeDeleted = document.getElementById(buttonId);
    bookToBeDeleted.remove();
};

// Evento que dispara el ciclo

const submitButton = document.querySelector(".form-container button")
submitButton.addEventListener("click", addNewBook)

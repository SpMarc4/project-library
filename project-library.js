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

// Creación cambio estatus

Book.prototype.changeReadStatus = function () {
    const statusOutput = 'not read yet';
    this.read =  (this.read === statusOutput) ? 'read' : statusOutput;
    this.updateReadStatus();
};

Book.prototype.updateReadStatus = function () {
    let trReadStatus = document.getElementById(this.id);
    let tdReadStatus = trReadStatus.querySelector('[data-key=read]');
    tdReadStatus.textContent = this.read;
};

// Se obtiene el contenido de la form

function getFormContent() {
    let title = document.querySelector('input#title').value;
    console.log(`title ${title} type ${typeof(title)}`)
    let author = document.querySelector('input#author').value;
    console.log(`author ${author} type ${typeof(author)}`)
    let pages = document.querySelector('input#pages').value;
    console.log(`pages ${pages} type ${typeof(pages)}`)
    let read = document.querySelector('select#read').value ;
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
        let rowData = document.createElement('td');
        rowData.setAttribute('data-key', key);
        rowData.textContent = value;
        if (key=='id') {bookshelvesRow.setAttribute('id', value)};
        bookshelvesRow.appendChild(rowData);
    }
    let deleteButton = createDeleteButton(bookshelvesRow);
    // Se añade evento al nuevo botón añadido
    deleteButton.addEventListener('click', deleteBook);
    let statusButton = createStatusButton(bookshelvesRow);
    // Se añade evento al nuevo botón añadido
    statusButton.addEventListener('click' ,function () {lastBook.changeReadStatus()});
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


// Creación botón eliminación libro

function createDeleteButton (row) {
    let rowData = document.createElement('td');
    rowData.style.setProperty('position', 'relative');
    rowData.style.setProperty('padding', '0');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.style.setProperty('position', 'absolute');
    deleteButton.style.setProperty('inset', '0');
    deleteButton.style.setProperty('width', '100%');
    deleteButton.style.setProperty('height', '100%');
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.setAttribute('data-id', row.id);
    rowData.appendChild(deleteButton)
    row.appendChild(rowData);
    return deleteButton
}

// Creación botón actualizar status

function createStatusButton (row, changeReadStatus) {
    let rowData = document.createElement('td');
    rowData.style.setProperty('position', 'relative');
    rowData.style.setProperty('padding', '0');
    let statusButton = document.createElement('button');
    statusButton.textContent = 'Switch';
    statusButton.style.setProperty('position', 'absolute');
    statusButton.style.setProperty('inset', '0');
    statusButton.style.setProperty('width', '100%');
    statusButton.style.setProperty('height', '100%');
    rowData.appendChild(statusButton)
    row.appendChild(rowData);
    return statusButton
}

// Eliminación libro

function deleteBook(event) {
    let buttonId = event.target.getAttribute("data-id");
    let bookToBeDeleted = document.getElementById(buttonId);
    bookToBeDeleted.remove();
};



// Evento que dispara el ciclo

const submitButton = document.querySelector(".form-container button")
submitButton.addEventListener("click", addNewBook)



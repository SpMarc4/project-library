let myLibrary = [];

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
    updateReadStatus(this.id, this.read);
};

function updateReadStatus (id, readStatus) {
    let trReadStatus = document.getElementById(id);
    let tdReadStatus = trReadStatus.querySelector('[data-key=read]');
    tdReadStatus.textContent = readStatus;
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
        rowData.style.setProperty('text-align', 'center');
        rowData.textContent = value;
        if (key=='id') {bookshelvesRow.setAttribute('id', value)};
        bookshelvesRow.appendChild(rowData);
    }
    let deleteButton = createDeleteButton(bookshelvesRow);
    // Se añade evento al nuevo botón añadido
    deleteButton.addEventListener('click', deleteBook);
    let statusButton = createStatusButton(bookshelvesRow);
    // Se añade evento al nuevo botón añadido
    statusButton.addEventListener('click' ,function () {
        lastBook.changeReadStatus();
        render();
    });
    bookshelves.appendChild(bookshelvesRow);
};

// Ciclo completo de añadir hasta mostrar libro

function addNewBook(event) {
    [title, author, pages, read] = getFormContent();
    addBookToLibrary(title, author, pages, read)
    render();
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
    myLibrary = myLibrary.filter( book => book.id != buttonId);
    render();
};



// Evento que dispara el ciclo

const submitButton = document.querySelector(".form-container button")
submitButton.addEventListener("click", addNewBook)


// Introducimos libros iniciales

addBookToLibrary ('The Hobbit', 'J.R Tolkien', '295', 'not read yet');
addBookToLibrary ('The Martian', 'Andy Weir', '295', 'read');
addBookToLibrary ('Project Hail Mar', 'Andy Weir', '295', 'not read yet');

// function initBookshelvesDisplay () {
//     for (let book of myLibrary) {
//         bookshelvesDisplay(book);
//     }
// };

// initBookshelvesDisplay();

// Se propone solución con renderizado, mas limpia.

function render() {
    bookshelves.innerHTML = '';
    let arrTitles = ['Id',
        'Title',
        'Author',
        'Pages',
        'Read',
        'Delete Book',
        'Change Status'
    ];
    trTable = document.createElement('tr');

    for (let elem of arrTitles) {
        thRow = document.createElement('th');
        thRow.textContent = elem
        trTable.appendChild(thRow);
    };
    bookshelves.appendChild(trTable);
    for (let book of myLibrary) {
        bookshelvesDisplay(book);
    };
};

render();
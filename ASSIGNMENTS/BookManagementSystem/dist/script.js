class BookManager {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`Added Book: ${book.title}`);
        this.displayBooks();
    }
    removeBook(title) {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.title !== title);
        if (this.books.length < initialLength) {
            console.log(`Removed book: ${title}`);
        }
        else {
            console.log(`Book not found: ${title}`);
        }
        this.displayBooks();
    }
    getBooks() {
        return this.books;
    }
    async fetchBooks(title, author) {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=AIzaSyD4R3wRUSQXQCnjrMS8TpgQBsjA4kMI5NM`);
            const data = await response.json();
            if (data.items) {
                data.items.forEach((item) => {
                    const authors = item.volumeInfo.authors ? item.volumeInfo.author.join(', ') : 'N/A';
                    const book = {
                        title: item.volumeInfo.title,
                        author: authors,
                        year: item.volumeInfo.publishedDate ? parseInt(item.volumeInfo.publishedDate) : new Date().getFullYear(),
                        publisher: item.volumeInfo.publisher,
                        publishedDate: item.volumeInfo.publishedDate,
                        description: item.volumeInfo.description,
                        categories: item.volumeInfo.categories,
                        imageLinks: item.volumeInfo.imageLinks,
                        previewLink: item.volumeInfo.previewLink,
                        infoLink: item.volumeInfo.infoLink,
                        industryIdentifiers: item.volumeInfo.industryIdentifiers
                    };
                    this.addBook(book);
                });
            }
            else {
                console.error('No books found');
                const errorMessage = document.getElementById('errorInfo');
                if (errorMessage)
                    errorMessage.textContent = 'No books found';
            }
        }
        catch (error) {
            console.error('Error fetching books', error);
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage)
                errorMessage.textContent = 'Error fetching books. Please try again.';
        }
    }
    displayBooks() {
        const bookListDiv = document.getElementById('bookInfo');
        if (bookListDiv) {
            bookListDiv.innerHTML = ''; // Clear previous content
            this.books.forEach(book => {
                bookListDiv.innerHTML += `
                    <h2>${book.title}</h2>
                    <h3>by ${book.author}</h3>
                    <p><strong>Publisher:</strong> ${book.publisher || 'N/A'}</p>
                    <p><strong>Published Date:</strong> ${book.publishedDate || 'N/A'}</p>
                    <p><strong>Description:</strong> ${book.description || 'N/A'}</p>
                    <p><strong>Categories:</strong> ${book.categories ? book.categories.join(', ') : 'N/A'}</p>
                    ${book.imageLinks?.thumbnail ? `<img src="${book.imageLinks.thumbnail}" alt="Book Cover" />` : ''}
                    <p><a href="${book.previewLink}" target="_blank">Preview Book</a></p>
                    <p><a href="${book.infoLink}" target="_blank">More Info</a></p>
                    <p><strong>ISBN-10:</strong> ${book.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || 'N/A'}</p>
                    <p><strong>ISBN-13:</strong> ${book.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || 'N/A'}</p>
                `;
            });
        }
    }
}
const bookManager = new BookManager();
document.getElementById('addBook')?.addEventListener('click', () => {
    const titleInput = document.getElementById('book_title');
    const authorInput = document.getElementById('book_author');
    const yearInput = document.getElementById('book_year');
    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);
    if (!title || !author || isNaN(year)) {
        alert('Please enter valid book details');
        return;
    }
    const newBook = { title, author, year };
    bookManager.addBook(newBook);
    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
});
document.getElementById('fetchBook')?.addEventListener('click', () => {
    const title = document.getElementById('book_title').value;
    const author = document.getElementById('book_author').value;
    if (!title || !author) {
        alert('Please enter valid title and author to fetch books');
        return;
    }
    bookManager.fetchBooks(title, author);
    document.getElementById('book_title').value = '';
    document.getElementById('book_author').value = '';
});
//# sourceMappingURL=script.js.map
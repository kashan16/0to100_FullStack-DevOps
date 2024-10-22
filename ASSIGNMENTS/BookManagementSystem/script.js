var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b;
var BookManager = /** @class */ (function () {
    function BookManager() {
        this.books = [];
    }
    BookManager.prototype.addBook = function (book) {
        this.books.push(book);
        console.log("Added Book: ".concat(book.title));
        this.displayBooks();
    };
    BookManager.prototype.removeBook = function (title) {
        var initialLength = this.books.length;
        this.books = this.books.filter(function (book) { return book.title !== title; });
        if (this.books.length < initialLength) {
            console.log("Removed book: ".concat(title));
        }
        else {
            console.log("Book not found: ".concat(title));
        }
        this.displayBooks();
    };
    BookManager.prototype.getBooks = function () {
        return this.books;
    };
    BookManager.prototype.fetchBooks = function (title, author) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, errorMessage, error_1, errorMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("https://www.googleapis.com/books/v1/volumes?q=".concat(title, "+inauthor:").concat(author, "&key=AIzaSyD4R3wRUSQXQCnjrMS8TpgQBsjA4kMI5NM"))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (data.items) {
                            data.items.forEach(function (item) {
                                var authors = item.volumeInfo.authors ? item.volumeInfo.author.join(', ') : 'N/A';
                                var book = {
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
                                _this.addBook(book);
                            });
                        }
                        else {
                            console.error('No books found');
                            errorMessage = document.getElementById('errorInfo');
                            if (errorMessage)
                                errorMessage.textContent = 'No books found';
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching books', error_1);
                        errorMessage = document.getElementById('errorMessage');
                        if (errorMessage)
                            errorMessage.textContent = 'Error fetching books. Please try again.';
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookManager.prototype.displayBooks = function () {
        var bookListDiv = document.getElementById('bookInfo');
        if (bookListDiv) {
            bookListDiv.innerHTML = ''; // Clear previous content
            this.books.forEach(function (book) {
                var _a, _b, _c, _d, _e;
                bookListDiv.innerHTML += "\n                    <h2>".concat(book.title, "</h2>\n                    <h3>by ").concat(book.author, "</h3>\n                    <p><strong>Publisher:</strong> ").concat(book.publisher || 'N/A', "</p>\n                    <p><strong>Published Date:</strong> ").concat(book.publishedDate || 'N/A', "</p>\n                    <p><strong>Description:</strong> ").concat(book.description || 'N/A', "</p>\n                    <p><strong>Categories:</strong> ").concat(book.categories ? book.categories.join(', ') : 'N/A', "</p>\n                    ").concat(((_a = book.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) ? "<img src=\"".concat(book.imageLinks.thumbnail, "\" alt=\"Book Cover\" />") : '', "\n                    <p><a href=\"").concat(book.previewLink, "\" target=\"_blank\">Preview Book</a></p>\n                    <p><a href=\"").concat(book.infoLink, "\" target=\"_blank\">More Info</a></p>\n                    <p><strong>ISBN-10:</strong> ").concat(((_c = (_b = book.industryIdentifiers) === null || _b === void 0 ? void 0 : _b.find(function (id) { return id.type === 'ISBN_10'; })) === null || _c === void 0 ? void 0 : _c.identifier) || 'N/A', "</p>\n                    <p><strong>ISBN-13:</strong> ").concat(((_e = (_d = book.industryIdentifiers) === null || _d === void 0 ? void 0 : _d.find(function (id) { return id.type === 'ISBN_13'; })) === null || _e === void 0 ? void 0 : _e.identifier) || 'N/A', "</p>\n                ");
            });
        }
    };
    return BookManager;
}());
var bookManager = new BookManager();
(_a = document.getElementById('addBook')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var titleInput = document.getElementById('book_title');
    var authorInput = document.getElementById('book_author');
    var yearInput = document.getElementById('book_year');
    var title = titleInput.value;
    var author = authorInput.value;
    var year = parseInt(yearInput.value);
    if (!title || !author || isNaN(year)) {
        alert('Please enter valid book details');
        return;
    }
    var newBook = { title: title, author: author, year: year };
    bookManager.addBook(newBook);
    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
});
(_b = document.getElementById('fetchBook')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var title = document.getElementById('book_title').value;
    var author = document.getElementById('book_author').value;
    if (!title || !author) {
        alert('Please enter valid title and author to fetch books');
        return;
    }
    bookManager.fetchBooks(title, author);
    document.getElementById('book_title').value = '';
    document.getElementById('book_author').value = '';
});

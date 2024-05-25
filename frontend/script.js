function libraryApp() {
    return {
        books: [],
        newBook: {
            title: '',
            author: '',
            genre: ''
        },
        fetchBooks() {
            fetch('http://localhost:3000/books')
                .then(response => response.json())
                .then(data => {
                    this.books = data;
                });
        },
        addBook() {
            fetch('http://localhost:3000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newBook)
            })
            .then(response => response.json())
            .then(data => {
                this.books.push(data);
                this.newBook.title = '';
                this.newBook.author = '';
                this.newBook.genre = '';
            });
        },
        deleteBook(id) {
            fetch(`http://localhost:3000/books/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                this.books = this.books.filter(book => book.id !== id);
            });
        },
        init() {
            this.fetchBooks();
        }
    }
}
document.addEventListener('alpine:init', () => {
    Alpine.data('libraryApp', libraryApp);
});

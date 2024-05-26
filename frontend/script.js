function libraryApp() {
    return {
        books: [],
        newBook: {
            title: '',
            author: '',
            genre: ''
        },
        searchField: 'title',
        searchQuery: '',
        sortField: 'id',
        sortDirection: 'asc',
        fetchBooks() {
            fetch('http://localhost:3000/books')
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched books:', data); // Debug output
                    this.books = data;
                })
                .catch(error => console.error('Error fetching books:', error)); // Handle errors
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
            })
            .catch(error => console.error('Error adding book:', error)); // Handle errors
        },
        deleteBook(id) {
            fetch(`http://localhost:3000/books/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                this.books = this.books.filter(book => book.id !== id);
            })
            .catch(error => console.error('Error deleting book:', error)); // Handle errors
        },
        searchBooks() {
            const query = `${this.searchField}=${encodeURIComponent(this.searchQuery)}`;
            fetch(`http://localhost:3000/books?${query}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Search results:', data); // Debug output
                    this.books = data;
                })
                .catch(error => console.error('Error searching books:', error)); // Handle errors
        },
        sortBooks(field) {
            this.sortField = field;
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            this.books.sort((a, b) => {
                if (a[field] < b[field]) return this.sortDirection === 'asc' ? -1 : 1;
                if (a[field] > b[field]) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
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
import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
    
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('https://localhost:5004/api/Book');
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <>
            <h1>Book List</h1>
            <br />
            {books.map((b) => 
            <div id="bookCard">
                <h2>{b.title}</h2>
                <ul>
                    <li>Author: {b.author}</li>
                    <li>Publisher: {b.publisher}</li>
                    <li>ISBN: {b.isbn}</li>
                    <li>Classification?Category: {b.classification}/{b.category}</li>
                    <li>Page Count: {b.pageCount}</li>
                    <li>Price: ${b.price}</li>
                </ul>
            </div>
        )}
        </>
    );
}

export default BookList;
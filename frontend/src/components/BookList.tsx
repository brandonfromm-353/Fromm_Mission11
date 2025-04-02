import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { fetchBooks } from '../api/booksAPI';
import Pagination from './Pagination';

function BookList({selectedCategories}: {selectedCategories: string[]}) {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting state
    const { addToCart } = useCart();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // fetching books from the API
    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNumber, selectedCategories, sortOrder);

            setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Updated for total pages
            }
            catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNumber, selectedCategories, sortOrder]); // Re-run when sortOrder changes

    if (loading) {
        return <div className="text-center">Loading books...</div>; // Loading state
    }
    if (error) {
        return <div className="text-danger text-center">Error: {error}</div>; // Error state
    }

    // sorting books by title
    const handleSort = (order: 'asc' | 'desc') => {
        setSortOrder(order); // Set the sort order to either ascending or descending
        setPageNumber(1); // Reset to page 1 when sorting changes
    };

    const handleAddToCart = (book: Book) => {
        const newItem: CartItem = {
            bookID: book.bookID,
            title: book.title,
            price: book.price,
            quantity: 1,
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <div className="container">
            {/* ascending and descending sorting buttons */}
            <div className="container">
                <div className="dropdown mb-4">
                    <button 
                        className="btn btn-primary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown" // This makes it work with Bootstrap JS
                        aria-expanded="false"
                    >
                        Sort by
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={() => handleSort('asc')}
                            >
                                Sort Ascending
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={() => handleSort('desc')}
                            >
                                Sort Descending
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="list-group">
                {books.map((b) => (
                    <div className="list-group-item mb-3 shadow-sm" key={b.bookID}>
                        <h5 className="mb-2">{b.title}</h5>
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification/Category:</strong> {b.classification}/{b.category}</li>
                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price}</li>
                        </ul>

                        <button onClick={() => {handleAddToCart(b)}} className="btn btn-primary">Add to Cart</button>
                    </div>
                ))}
            </div>

            {/* Pagination component */}
            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNumber}
                onPageSizeChange={newPageSize => {
                    setPageSize(newPageSize);
                    setPageNumber(1); // Reset to page 1 when page size changes
                }}
            />
        </div>
    );
}

export default BookList;

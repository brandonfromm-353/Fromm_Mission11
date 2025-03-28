import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function BookList({selectedCategories}: {selectedCategories: string[]}) {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting state
    const { addToCart } = useCart();
    const [cartAmount, setCartAmount] = useState<number>(0);

    // fetching books from the API
    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories.map((c) => `categories=${encodeURIComponent(c)}`).join('&');
            const response = await fetch(`https://localhost:5004/api/Book?pageSize=${pageSize}&pageNumber=${pageNumber}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalBooks(data.totalNumBooks);
            setTotalPages(data.totalPages); // Updated for total pages
        };

        fetchBooks();
    }, [pageSize, pageNumber, sortOrder, selectedCategories]); // Re-run when sortOrder changes

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
            <div className="btn-group mb-4">
                <button 
                    className={`btn ${sortOrder === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => handleSort('asc')}>
                    Sort Ascending
                </button>
                <button 
                    className={`btn ${sortOrder === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => handleSort('desc')}>
                    Sort Descending
                </button>
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

            {/* previous, pages, and next page buttons */}
            <div className="d-flex justify-content-center my-4">
                <button 
                    className="btn btn-primary me-2" 
                    onClick={() => setPageNumber(pageNumber - 1)} 
                    disabled={pageNumber === 1}>
                    Previous
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <button 
                        className={`btn btn-outline-primary me-2 ${page + 1 === pageNumber ? 'active' : ''}`} 
                        key={page} 
                        onClick={() => setPageNumber(page + 1)} 
                        disabled={page + 1 === pageNumber}>
                        {page + 1}
                    </button>
                ))}
                <button 
                    className="btn btn-primary ms-2" 
                    onClick={() => setPageNumber(pageNumber + 1)} 
                    disabled={pageNumber === totalPages}>
                    Next
                </button>
            </div>

            {/* Pagination dropdown */}
            <div className="d-flex justify-content-center">
                <label className="form-label me-2">
                    Results per page:
                    <select 
                        className="form-select" 
                        value={pageSize} 
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPageNumber(1);
                        }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default BookList;

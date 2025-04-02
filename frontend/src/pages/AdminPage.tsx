import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/booksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null)

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNumber, [], 'asc'); // Fetching books with default parameters
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate total pages based on the total number of books
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageNumber, pageSize]); // Re-run when pageNumber or pageSize changes

    const handleDelete = async (bookID: number) => {
        const confirmDelete = window.confirm('Are you sure you wnt to delete this project?');
        if (!confirmDelete) return;

        try{
            await deleteBook(bookID)
            setBooks(books.filter((book) => book.bookID !== bookID))
        } catch (error) {
            alert('failed to delete book. Please try again.')
        }
    }

    if (loading) {
        return <div className="text-center">Loading books...</div>; // Loading state
    }
    if (error) {
        return <div className="text-danger text-center">Error: {error}</div>; // Error state
    }

    return (
        <div>
            <h1 className="text-center mt-5">Admin Page</h1>

            {!showForm && (
                <button className='btn btn-success mb-3' onClick={() => setShowForm(true)}>Add Book</button>
            )}

            {showForm && (
                <NewBookForm onSuccess={() => {
                    setShowForm(false);
                    fetchBooks(pageSize, pageNumber, [], 'asc')
                    .then((data) => {
                        setBooks(data.books);
                    })
                }} 
                onCancel={() => setShowForm(false)} 
                />
            )}

            {editingBook && (
                <EditBookForm book={editingBook} onSuccess={() => {
                    setEditingBook(null);
                    fetchBooks(pageSize, pageNumber, [], 'asc')
                    .then((data) => {
                        setBooks(data.books);
                    })
                }}
                onCancel={() => setEditingBook(null)}
                />
            )}

            <table className='table table-striped table-bordered mt-4'>
                {/* Table header */}
                <thead className="table-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Page Count</th>
                        <th>Actions</th> {/* Action buttons for Edit and Delete */}
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookID}>
                            <td>{book.bookID}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>${book.price.toFixed(2)}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.classification}</td>
                            <td>{book.pageCount}</td>
                            {/* Action buttons for Edit and Delete */}
                            <td>
                                <button className="btn btn-danger btn-sm w-100 mb-1" onClick={() => handleDelete(book.bookID)}>Delete</button>
                                <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => setEditingBook(book)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNumber}
                onPageSizeChange={newPageSize => {
                    setPageSize(newPageSize);
                    setPageNumber(1);
                }}
            />
        </div>
    );
}

export default AdminPage;
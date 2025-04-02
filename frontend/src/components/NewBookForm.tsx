import { useState } from "react";
import { addBook } from "../api/booksAPI";
import { Book } from "../types/Book";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookID: 0,
        title: '',
        category: '',
        author: '',
        price: 0,
        publisher: '',
        isbn: '',
        classification: '',
        pageCount: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value}); // Dynamically set the state based on input name
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior
        await addBook(formData);
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="new-book-form">
            <h2>Add New Book</h2>
            <label>Book Title:<input type="text" name="title" value={formData.title} onChange={handleChange}></input></label>
            <label>Book Category:<input type="text" name="category" value={formData.category} onChange={handleChange}></input></label>
            <label>Book Author:<input type="text" name="author" value={formData.author} onChange={handleChange}></input></label>
            <label>Book Price:<input type="number" name="price" value={formData.price} onChange={handleChange}></input></label>
            <label>Book Publisher:<input type="text" name="publisher" value={formData.publisher} onChange={handleChange}></input></label>
            <label>Book ISBN:<input type="text" name="isbn" value={formData.isbn} onChange={handleChange}></input></label>
            <label>Book Classification:<input type="text" name="classification" value={formData.classification} onChange={handleChange}></input></label>
            <label>Book Page Count:<input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange}></input></label>
            <button type="submit" className="btn btn-primary mt-3">Add Book</button>
            <button type="button" className="btn btn-secondary mt-3" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default NewBookForm;
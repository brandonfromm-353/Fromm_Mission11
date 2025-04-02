import { Book } from "../types/Book";

interface fetchBooksResponse {
    json(): unknown;
    books: Book[];
    totalNumBooks: number;
}

const API_URL = 'https://localhost:5004/api/Book';

export const fetchBooks = async (pageSize: number, pageNumber: number, selectedCategories: string[], sortOrder: string): Promise<fetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
            .map((c) => `categories=${encodeURIComponent(c)}`)
            .join('&');

        const response = await fetch(
            `${API_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`Error fetching books: ${response.statusText}`);
        }

        // Check if the response is valid JSON
        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(newBook), // Convert the new book object to a JSON string
            });

            if (!response.ok) {
                throw new Error(`Error adding book: ${response.statusText}`);
            }

            return await response.json();
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};

export const updateBook = async (bookID: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(updatedBook), // Convert the new book object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`Error updating book: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error updating Book:`, error);
        throw error;
    }
};

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookID}`,
            {
                method: 'DELETE'
            }
        );

        if(!response.ok) {
            throw new Error('Failed to delete book')
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

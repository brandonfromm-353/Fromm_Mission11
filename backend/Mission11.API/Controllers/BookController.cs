using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;
using System.Linq;

namespace Mission11.API.Controllers
{
    // Route for the controller
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        // GET api/book
        [HttpGet]
        public IActionResult Get(int pageSize = 5, int pageNumber = 1, string sortOrder = "asc", [FromQuery] List<string> categories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (categories != null && categories.Any())
            {
                query = query.Where(c => categories.Contains(c.Category));
            }

            // Apply sorting for title only (ascending or descending)
            query = sortOrder == "asc" 
                ? query.OrderBy(b => b.Title) 
                : query.OrderByDescending(b => b.Title);

            // Apply pagination
            var totalBooks = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalBooks / pageSize);

            // Get the books for the requested page
            var bookList = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Create an anonymous object to return both books and pagination information
            var bookObject = new
            {
                Books = bookList,
                TotalNumBooks = totalBooks,
                TotalPages = totalPages
            };

            return Ok(bookObject);
        }

        // GET api/book/GetCategoryTypes
        // This method returns a list of distinct category types from the books
        // This endpoint can be used to get the available categories for filtering
        [HttpGet("GetCategoryTypes")]
        public IActionResult GetCategoryTypes()
        {
            var CategoryTypes = _bookContext.Books
                .Select(c => c.Category)
                .Distinct()
                .ToList();
            
            return Ok(CategoryTypes);
        }

        [HttpPost("AddBook")]
        // This method allows adding a new book to the database
        public IActionResult AddBook([FromBody] Book newBook)
        {
            if (newBook == null)
            {
                return BadRequest("Book data is null");
            }

            // Add the new book to the database
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();

            return Ok(newBook); // Return the added book as confirmation
        }

        [HttpPut("UpdateBook/{bookID}")]
        // This method allows updating an existing book in the database
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            // Find the existing book in the database
            var existingBook = _bookContext.Books.Find(bookID); // Use Find to get the book by ID

            // Update the existing book's properties
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Category = updatedBook.Category;
            existingBook.Price =  updatedBook.Price;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.PageCount = updatedBook.PageCount;

            _bookContext.Books.Update(existingBook); // Update the book in the DbContext
            // Save the changes to the database
            _bookContext.SaveChanges();

            return Ok(existingBook); // Return the updated book
        }

        // This method allows deleting a book from the database
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            // Find the book in the database
            var bookToDelete = _bookContext.Books.Find(bookID);
            if (bookToDelete == null)
            {
                return NotFound("Book not found");
            }

            // Remove the book from the database
            _bookContext.Books.Remove(bookToDelete);
            _bookContext.SaveChanges();

            return Ok($"Book with ID {bookID} deleted successfully"); // Return success message
        }
    }
}
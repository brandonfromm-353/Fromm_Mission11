using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    // route for the controller
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }
        
        // GET api/book
        public IActionResult Get(int pageSize = 5, int pageNumber = 1)
        {
            // get the books from the database
            var booklist = _bookContext.Books
                // skip the number of books based on the page number and page size
                .Skip((pageNumber - 1) * pageSize)
                // take the number of books based on the page size
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _bookContext.Books.Count();
            
            // create an anonymous object to return both books and total number of books
            var bookObject = new
            {
                Books = booklist,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(bookObject);
        }
    }
}


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
    }
}
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
        public IActionResult Get(int pageSize = 5, int pageNumber = 1, string sortOrder = "asc")
        {
            string? favoriteBookCategory = Request.Cookies["favoriteBookCategory"];
            Console.WriteLine("---------COOKIE---------\n" + favoriteBookCategory );
            
            HttpContext.Response.Cookies.Append("FavoriteBookCategory", "Non-Fiction/Self-Help", new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.Now.AddMinutes(1),
                });
            
            // Define the initial query for books
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply sorting for title only (ascending or descending)
            booksQuery = sortOrder == "asc" 
                ? booksQuery.OrderBy(b => b.Title) 
                : booksQuery.OrderByDescending(b => b.Title);

            // Apply pagination
            var totalBooks = booksQuery.Count();
            var totalPages = (int)Math.Ceiling((double)totalBooks / pageSize);

            // Get the books for the requested page
            var bookList = booksQuery
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
    }
}
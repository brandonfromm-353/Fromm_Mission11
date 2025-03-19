using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data
{
    // database context for the book
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options): base(options)
        {
        }
        
        // table for the books
        public DbSet<Book> Books { get; set; }
    } 
}
using Microsoft.EntityFrameworkCore;
using Mission11.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// add the database context
builder.Services.AddDbContext<BookDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("BookStoreConnection")));

// add CORS
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactApp",
    policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyMethod() // Allow any HTTP method
            .AllowAnyHeader(); // Allow any header
    })
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// use CORS and set the allowed api url
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

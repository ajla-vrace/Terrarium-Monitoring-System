using Microsoft.EntityFrameworkCore;
using proba_iot.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", false)
    .Build();
builder.Services.AddDbContext<ContextProba>(options =>
    options.UseSqlServer(config.GetConnectionString("DefaultConnection")));















var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Dodajte ove dve linije kako biste dodali Swagger UI
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "IOT API V1"); // Promenite "Your API V1" prema vašem API-ju
    });
}


app.UseCors(
    options => options
        .SetIsOriginAllowed(x => _ = true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
); //This needs to set everything allowed




app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

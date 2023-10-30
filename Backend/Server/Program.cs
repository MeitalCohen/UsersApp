using Server.DAL;
using Server.Data;
using Server.Model;
using Server.Model.ActionFilters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<UsersContext>();
builder.Services.AddControllers();
builder.Services.AddLogging(builder =>
{
    builder.AddConsole();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed((hot) => true)
        .AllowCredentials());
});

builder.Services.AddMvc(options =>
{
    options.Filters.Add(new TrimInputActionFilter());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();

namespace HQ.Backend.Models;

public class User
{
    public int Id { get; set; }
    public string password { get; set; } = null!;
    public string email { get; set; } = null!;
    public string role { get; set; } = "Customer";
    public string full_name { get; set; } = null!;
    public DateTime created_at { get; set; } = DateTime.Now;
}

public class LoginRequest
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
namespace HQ.Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = "Customer"; 
        public string FullName { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}

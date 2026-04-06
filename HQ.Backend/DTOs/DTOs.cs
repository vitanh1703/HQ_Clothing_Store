namespace HQ.Backend.DTOs;

public class GoogleLoginRequest
{
    public string Token { get; set; } = null!;
}

public class AddToCartRequest
{
    public int UserId { get; set; }
    public int VariantId { get; set; }
    public int Quantity { get; set; }
}
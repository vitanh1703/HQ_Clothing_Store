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

public class CassoWebhookRequest
{
    public int error { get; set; }
    public List<CassoTransaction> data { get; set; }
}

public class CassoTransaction
{
    public string id { get; set; }
    public string tid { get; set; }
    public string description { get; set; }
    public decimal amount { get; set; }
    public string when { get; set; }
}
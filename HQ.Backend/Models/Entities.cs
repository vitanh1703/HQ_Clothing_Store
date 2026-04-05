using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HQ.Backend.Models;

[Table("users")]
public class User
{
    [Key]
    public int Id { get; set; }
    [Column("password")]
    public string Password { get; set; } = null!;
    [Column("email")]
    public string Email { get; set; } = null!;
    [Column("role")]
    public string Role { get; set; } = "Customer";
    [Column("auth_provider")]
    public string AuthProvider { get; set; } = "local";
    [Column("google_id")]
    public string? GoogleId { get; set; }
    [Column("full_name")]
    public string FullName { get; set; } = null!;
    [Column("phone")]
    public string? Phone { get; set; }
    [Column("address")]
    public string? Address { get; set; }
    [Column("avatar_url")]
    public string? AvatarUrl { get; set; }
    [Column("status")]
    public bool Status { get; set; } = true;
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}

public class LoginRequest
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

[Table("products")]
public class Product
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    [Column("brand_text")]
    public string BrandText { get; set; } = "H&Q";
    [Column("accent_color")]
    public string AccentColor { get; set; } = "bg-[#9bdc28]";
    [Column("hover_accent")]
    public string HoverAccent { get; set; } = "hover:bg-[#9bdc28]";
    [Column("image_url")]
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    [Column("category_id")]
    public int? CategoryId { get; set; }
    [Column("supplier_id")]
    public int? SupplierId { get; set; }
}

[Table("product_variants")]
public class ProductVariant
{
    [Key]
    public int Id { get; set; }
    [Column("product_id")]
    public int ProductId { get; set; }
    public string Size { get; set; } = null!;
    public string Color { get; set; } = null!;
    public decimal Price { get; set; }
    [Column("stock_quantity")]
    public int StockQuantity { get; set; }
}

[Table("carts")]
public class Cart
{
    [Key]
    public int Id { get; set; }
    [Column("user_id")]
    public int UserId { get; set; }
}

[Table("cart_items")]
public class CartItem
{
    [Key]
    public int Id { get; set; }
    [Column("cart_id")]
    public int CartId { get; set; }
    [Column("variant_id")]
    public int VariantId { get; set; }
    public int Quantity { get; set; }
}

public class AddToCartRequest
{
    public int UserId { get; set; }
    public int VariantId { get; set; }
    public int Quantity { get; set; }
}
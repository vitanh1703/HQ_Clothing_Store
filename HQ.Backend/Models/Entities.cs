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

[Table("news")]
public class News
{
    [Key]
    public int Id { get; set; }
    public string Category { get; set; } = null!;
    public string Title { get; set; } = null!;
    [Column("publish_date")]
    public DateTime PublishDate { get; set; }
    [Column("img_url")]
    public string? ImgUrl { get; set; }
    public string? Description { get; set; }
    public string? Content { get; set; }
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}

[Table("services")]
public class Service
{
    public int Id { get; set; } // Id thường là int

    [Column("icon_name")]
    public string IconName { get; set; } // Đảm bảo cột này trong DB là VARCHAR

    public string Title { get; set; } // Đảm bảo là VARCHAR/TEXT

    public string Description { get; set; } // Đảm bảo là VARCHAR/TEXT

    [Column("order_index")]
    public int OrderIndex { get; set; } // Cột này trong DB là int nên ở đây phải là int
}
using HQ.Backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HQ.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.BrandText,
                    p.ImageUrl,
                    p.Description,
                    Variants = _context.ProductVariants
                        .Where(v => v.ProductId == p.Id)
                        .ToList()
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToListAsync();

            return Ok(categories);
        }

          // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Variants) // ✅ bắt buộc Include
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.BrandText,
                    p.Description,
                    p.ImageUrl,
                    Variants = p.Variants.Select(v => new
                    {
                        v.Id,
                        v.Size,
                        v.Color,
                        v.Price,
                        v.StockQuantity,
                        v.Sku
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound(new { message = "Sản phẩm không tồn tại" });

            return Ok(product);
        }
    }
}

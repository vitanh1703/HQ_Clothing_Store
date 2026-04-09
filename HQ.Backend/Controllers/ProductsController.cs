using HQ.Backend.Data;
using Microsoft.AspNetCore.Http;
using HQ.Backend.Models;
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
        public async Task<IActionResult> GetProducts([FromQuery] int? category)
        {
            var productsQuery = _context.Products.AsQueryable();

            if (category.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.CategoryId == category.Value);
            }

            var products = await productsQuery
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.BrandText,
                    p.ImageUrl,
                    p.Description,
                    p.CategoryId,
                    Variants = _context.ProductVariants
                        .Where(v => v.ProductId == p.Id)
                        .ToList()
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryId)
        {
            var products = await _context.Products
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.BrandText,
                    p.ImageUrl,
                    p.Description,
                    p.CategoryId,
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

        [HttpGet("{id}/reviews")]
        public async Task<IActionResult> GetProductReviews(int id)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == id);
            if (!productExists)
                return NotFound(new { message = "Sản phẩm không tồn tại" });

            var reviews = await (
                from review in _context.Reviews
                join user in _context.Users on review.UserId equals user.Id
                where review.ProductId == id
                orderby review.CreatedAt descending
                select new
                {
                    review.Id,
                    review.UserId,
                    review.ProductId,
                    rating = review.Rating ?? 0,
                    comment = review.Comment,
                    createdAt = review.CreatedAt,
                    userName = user.FullName
                }
            ).ToListAsync();

            var averageRating = reviews.Count == 0
                ? 0
                : Math.Round(reviews.Average(r => r.rating), 1);

            return Ok(new
            {
                averageRating,
                totalReviews = reviews.Count,
                reviews
            });
        }
    }
}

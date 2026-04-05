using HQ.Backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}

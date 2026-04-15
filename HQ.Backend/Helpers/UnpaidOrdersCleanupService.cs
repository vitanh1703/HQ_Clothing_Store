using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HQ.Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace HQ.Backend.Services
{
    public class UnpaidOrdersCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<UnpaidOrdersCleanupService> _logger;

        public UnpaidOrdersCleanupService(IServiceProvider serviceProvider, ILogger<UnpaidOrdersCleanupService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var now = DateTime.Now;
                // Cài đặt giờ chạy là 5h00 sáng
                var nextRun = new DateTime(now.Year, now.Month, now.Day, 5, 0, 0); 
                
                // Nếu hiện tại đã qua 5h sáng, thì lịch chạy tiếp theo sẽ là 5h sáng ngày hôm sau
                if (now > nextRun)
                {
                    nextRun = nextRun.AddDays(1);
                }

                var delay = nextRun - now;
                _logger.LogInformation($"Task dọn dẹp đơn hàng sẽ chạy sau: {delay.TotalHours} giờ nữa (Vào lúc {nextRun:dd/MM/yyyy HH:mm:ss}).");

                // Cho Task chờ đến giờ đã định
                await Task.Delay(delay, stoppingToken);

                if (!stoppingToken.IsCancellationRequested)
                {
                    await CleanupUnpaidOrdersAsync();
                }
            }
        }

        private async Task CleanupUnpaidOrdersAsync()
        {
            try
            {
                _logger.LogInformation("Bắt đầu dọn dẹp các đơn hàng chưa thanh toán quá 24h...");

                // Tạo Scope mới để lấy DbContext (vì BackgroundService là Singleton, DbContext là Scoped)
                using var scope = _serviceProvider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                // Dùng SQL thuần để Database tự đối chiếu order_date với thời gian hiện tại của Database (NOW)
                var rowsAffected = await context.Database.ExecuteSqlRawAsync(
                    "DELETE FROM orders WHERE status = 'Pending' AND order_date <= NOW() - INTERVAL 24 HOUR"
                );

                if (rowsAffected > 0)
                {
                    _logger.LogInformation($"Đã xóa thành công {rowsAffected} đơn hàng chưa thanh toán.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Đã xảy ra lỗi khi dọn dẹp đơn hàng quá hạn.");
            }
        }
    }
}
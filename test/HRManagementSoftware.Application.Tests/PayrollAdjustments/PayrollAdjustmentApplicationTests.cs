using System;
using System.Linq;
using Shouldly;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Modularity;
using Xunit;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentsAppServiceTests<TStartupModule> : HRManagementSoftwareApplicationTestBase<TStartupModule>
        where TStartupModule : IAbpModule
    {
        private readonly IPayrollAdjustmentsAppService _payrollAdjustmentsAppService;
        private readonly IRepository<PayrollAdjustment, Guid> _payrollAdjustmentRepository;

        public PayrollAdjustmentsAppServiceTests()
        {
            _payrollAdjustmentsAppService = GetRequiredService<IPayrollAdjustmentsAppService>();
            _payrollAdjustmentRepository = GetRequiredService<IRepository<PayrollAdjustment, Guid>>();
        }

        [Fact]
        public async Task GetListAsync()
        {
            // Act
            var result = await _payrollAdjustmentsAppService.GetListAsync(new GetPayrollAdjustmentsInput());

            // Assert
            result.TotalCount.ShouldBe(2);
            result.Items.Count.ShouldBe(2);
            result.Items.Any(x => x.PayrollAdjustment.Id == Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423")).ShouldBe(true);
            result.Items.Any(x => x.PayrollAdjustment.Id == Guid.Parse("40087ba6-8a6f-4e3a-8811-3ba02bdb4c6a")).ShouldBe(true);
        }

        [Fact]
        public async Task GetAsync()
        {
            // Act
            var result = await _payrollAdjustmentsAppService.GetAsync(Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423"));

            // Assert
            result.ShouldNotBeNull();
            result.Id.ShouldBe(Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423"));
        }

        [Fact]
        public async Task CreateAsync()
        {
            // Arrange
            var input = new PayrollAdjustmentCreateDto
            {
                Month = 52,
                Year = 97289,
                Status = default,
                Netpay = 939630
            };

            // Act
            var serviceResult = await _payrollAdjustmentsAppService.CreateAsync(input);

            // Assert
            var result = await _payrollAdjustmentRepository.FindAsync(c => c.Id == serviceResult.Id);

            result.ShouldNotBe(null);
            result.Month.ShouldBe(52);
            result.Year.ShouldBe(97289);
            result.Status.ShouldBe(default);
            result.Netpay.ShouldBe(939630);
        }

        [Fact]
        public async Task UpdateAsync()
        {
            // Arrange
            var input = new PayrollAdjustmentUpdateDto()
            {
                Month = 43,
                Year = 76942,
                Status = default,
                Netpay = 913262
            };

            // Act
            var serviceResult = await _payrollAdjustmentsAppService.UpdateAsync(Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423"), input);

            // Assert
            var result = await _payrollAdjustmentRepository.FindAsync(c => c.Id == serviceResult.Id);

            result.ShouldNotBe(null);
            result.Month.ShouldBe(43);
            result.Year.ShouldBe(76942);
            result.Status.ShouldBe(default);
            result.Netpay.ShouldBe(913262);
        }

        [Fact]
        public async Task DeleteAsync()
        {
            // Act
            await _payrollAdjustmentsAppService.DeleteAsync(Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423"));

            // Assert
            var result = await _payrollAdjustmentRepository.FindAsync(c => c.Id == Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423"));

            result.ShouldBeNull();
        }
    }
}
using Shouldly;
using System;
using System.Linq;
using System.Threading.Tasks;
using HRManagementSoftware.PayrollAdjustments;
using HRManagementSoftware.EntityFrameworkCore;
using Xunit;

namespace HRManagementSoftware.EntityFrameworkCore.Domains.PayrollAdjustments
{
    public class PayrollAdjustmentRepositoryTests : HRManagementSoftwareEntityFrameworkCoreTestBase
    {
        private readonly IPayrollAdjustmentRepository _payrollAdjustmentRepository;

        public PayrollAdjustmentRepositoryTests()
        {
            _payrollAdjustmentRepository = GetRequiredService<IPayrollAdjustmentRepository>();
        }

        [Fact]
        public async Task GetListAsync()
        {
            // Arrange
            await WithUnitOfWorkAsync(async () =>
            {
                // Act
                var result = await _payrollAdjustmentRepository.GetListAsync(
                    status: default
                );

                // Assert
                result.Count.ShouldBe(1);
                result.FirstOrDefault().ShouldNotBe(null);
                result.First().Id.ShouldBe(Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423"));
            });
        }

        [Fact]
        public async Task GetCountAsync()
        {
            // Arrange
            await WithUnitOfWorkAsync(async () =>
            {
                // Act
                var result = await _payrollAdjustmentRepository.GetCountAsync(
                    status: default
                );

                // Assert
                result.ShouldBe(1);
            });
        }
    }
}
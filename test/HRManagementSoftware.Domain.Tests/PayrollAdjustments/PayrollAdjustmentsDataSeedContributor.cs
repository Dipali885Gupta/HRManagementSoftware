using HRManagementSoftware.Employees;
using HRManagementSoftware.LeaveRequests;
using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Uow;
using HRManagementSoftware.PayrollAdjustments;

namespace HRManagementSoftware.PayrollAdjustments
{
    public class PayrollAdjustmentsDataSeedContributor : IDataSeedContributor, ISingletonDependency
    {
        private bool IsSeeded = false;
        private readonly IPayrollAdjustmentRepository _payrollAdjustmentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly LeaveRequestsDataSeedContributor _leaveRequestsDataSeedContributor;

        private readonly EmployeesDataSeedContributor _employeesDataSeedContributor;

        public PayrollAdjustmentsDataSeedContributor(IPayrollAdjustmentRepository payrollAdjustmentRepository, IUnitOfWorkManager unitOfWorkManager, LeaveRequestsDataSeedContributor leaveRequestsDataSeedContributor, EmployeesDataSeedContributor employeesDataSeedContributor)
        {
            _payrollAdjustmentRepository = payrollAdjustmentRepository;
            _unitOfWorkManager = unitOfWorkManager;
            _leaveRequestsDataSeedContributor = leaveRequestsDataSeedContributor; _employeesDataSeedContributor = employeesDataSeedContributor;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            if (IsSeeded)
            {
                return;
            }

            await _leaveRequestsDataSeedContributor.SeedAsync(context);
            await _employeesDataSeedContributor.SeedAsync(context);

            await _payrollAdjustmentRepository.InsertAsync(new PayrollAdjustment
            (
                id: Guid.Parse("e4eabec7-f2be-49e5-ace9-f067f17e1423"),
                month: 51,
                year: 46626,
                status: default,
                netpay: 816954,
                leaveRequestId: null,
                employeeId: null
            ));

            await _payrollAdjustmentRepository.InsertAsync(new PayrollAdjustment
            (
                id: Guid.Parse("40087ba6-8a6f-4e3a-8811-3ba02bdb4c6a"),
                month: 82,
                year: 1631,
                status: default,
                netpay: 803428,
                leaveRequestId: null,
                employeeId: null
            ));

            await _unitOfWorkManager!.Current!.SaveChangesAsync();

            IsSeeded = true;
        }
    }
}
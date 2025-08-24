using HRManagementSoftware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentManagerBase : DomainService
    {
        protected IPayrollAdjustmentRepository _payrollAdjustmentRepository;

        public PayrollAdjustmentManagerBase(IPayrollAdjustmentRepository payrollAdjustmentRepository)
        {
            _payrollAdjustmentRepository = payrollAdjustmentRepository;
        }

        public virtual async Task<PayrollAdjustment> CreateAsync(
        Guid? leaveRequestId, Guid? employeeId, int month, int year, PayrollRecordStatus status, decimal netpay)
        {
            Check.Range(month, nameof(month), PayrollAdjustmentConsts.MonthMinLength, PayrollAdjustmentConsts.MonthMaxLength);
            Check.Range(year, nameof(year), PayrollAdjustmentConsts.YearMinLength, PayrollAdjustmentConsts.YearMaxLength);
            Check.NotNull(status, nameof(status));
            Check.Range(netpay, nameof(netpay), PayrollAdjustmentConsts.NetpayMinLength, PayrollAdjustmentConsts.NetpayMaxLength);

            var payrollAdjustment = new PayrollAdjustment(
             GuidGenerator.Create(),
             leaveRequestId, employeeId, month, year, status, netpay
             );

            return await _payrollAdjustmentRepository.InsertAsync(payrollAdjustment);
        }

        public virtual async Task<PayrollAdjustment> UpdateAsync(
            Guid id,
            Guid? leaveRequestId, Guid? employeeId, int month, int year, PayrollRecordStatus status, decimal netpay, [CanBeNull] string? concurrencyStamp = null
        )
        {
            Check.Range(month, nameof(month), PayrollAdjustmentConsts.MonthMinLength, PayrollAdjustmentConsts.MonthMaxLength);
            Check.Range(year, nameof(year), PayrollAdjustmentConsts.YearMinLength, PayrollAdjustmentConsts.YearMaxLength);
            Check.NotNull(status, nameof(status));
            Check.Range(netpay, nameof(netpay), PayrollAdjustmentConsts.NetpayMinLength, PayrollAdjustmentConsts.NetpayMaxLength);

            var payrollAdjustment = await _payrollAdjustmentRepository.GetAsync(id);

            payrollAdjustment.LeaveRequestId = leaveRequestId;
            payrollAdjustment.EmployeeId = employeeId;
            payrollAdjustment.Month = month;
            payrollAdjustment.Year = year;
            payrollAdjustment.Status = status;
            payrollAdjustment.Netpay = netpay;

            payrollAdjustment.SetConcurrencyStampIfNotNull(concurrencyStamp);
            return await _payrollAdjustmentRepository.UpdateAsync(payrollAdjustment);
        }

    }
}
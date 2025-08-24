using HRManagementSoftware;
using HRManagementSoftware.LeaveRequests;
using HRManagementSoftware.Employees;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using JetBrains.Annotations;

using Volo.Abp;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentBase : FullAuditedAggregateRoot<Guid>
    {
        public virtual int Month { get; set; }

        public virtual int Year { get; set; }

        public virtual PayrollRecordStatus Status { get; set; }

        public virtual decimal Netpay { get; set; }
        public Guid? LeaveRequestId { get; set; }
        public Guid? EmployeeId { get; set; }

        protected PayrollAdjustmentBase()
        {

        }

        public PayrollAdjustmentBase(Guid id, Guid? leaveRequestId, Guid? employeeId, int month, int year, PayrollRecordStatus status, decimal netpay)
        {

            Id = id;
            if (month < PayrollAdjustmentConsts.MonthMinLength)
            {
                throw new ArgumentOutOfRangeException(nameof(month), month, "The value of 'month' cannot be lower than " + PayrollAdjustmentConsts.MonthMinLength);
            }

            if (month > PayrollAdjustmentConsts.MonthMaxLength)
            {
                throw new ArgumentOutOfRangeException(nameof(month), month, "The value of 'month' cannot be greater than " + PayrollAdjustmentConsts.MonthMaxLength);
            }

            if (year < PayrollAdjustmentConsts.YearMinLength)
            {
                throw new ArgumentOutOfRangeException(nameof(year), year, "The value of 'year' cannot be lower than " + PayrollAdjustmentConsts.YearMinLength);
            }

            if (year > PayrollAdjustmentConsts.YearMaxLength)
            {
                throw new ArgumentOutOfRangeException(nameof(year), year, "The value of 'year' cannot be greater than " + PayrollAdjustmentConsts.YearMaxLength);
            }

            if (netpay < PayrollAdjustmentConsts.NetpayMinLength)
            {
                throw new ArgumentOutOfRangeException(nameof(netpay), netpay, "The value of 'netpay' cannot be lower than " + PayrollAdjustmentConsts.NetpayMinLength);
            }

            if (netpay > PayrollAdjustmentConsts.NetpayMaxLength)
            {
                throw new ArgumentOutOfRangeException(nameof(netpay), netpay, "The value of 'netpay' cannot be greater than " + PayrollAdjustmentConsts.NetpayMaxLength);
            }

            Month = month;
            Year = year;
            Status = status;
            Netpay = netpay;
            LeaveRequestId = leaveRequestId;
            EmployeeId = employeeId;
        }

    }
}
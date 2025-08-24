using HRManagementSoftware;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentUpdateDtoBase : IHasConcurrencyStamp
    {
        [Range(PayrollAdjustmentConsts.MonthMinLength, PayrollAdjustmentConsts.MonthMaxLength)]
        public int Month { get; set; }
        [Required]
        [Range(PayrollAdjustmentConsts.YearMinLength, PayrollAdjustmentConsts.YearMaxLength)]
        public int Year { get; set; }
        public PayrollRecordStatus Status { get; set; }
        [Required]
        public decimal Netpay { get; set; }
        public Guid? LeaveRequestId { get; set; }
        public Guid? EmployeeId { get; set; }

        public string ConcurrencyStamp { get; set; } = null!;
    }
}
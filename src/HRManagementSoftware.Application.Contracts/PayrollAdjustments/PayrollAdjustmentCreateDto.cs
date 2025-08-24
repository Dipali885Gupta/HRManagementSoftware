using HRManagementSoftware;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentCreateDtoBase
    {
        [Range(PayrollAdjustmentConsts.MonthMinLength, PayrollAdjustmentConsts.MonthMaxLength)]
        public int Month { get; set; } = 0;
        [Required]
        [Range(PayrollAdjustmentConsts.YearMinLength, PayrollAdjustmentConsts.YearMaxLength)]
        public int Year { get; set; } = 1;
        public PayrollRecordStatus Status { get; set; } = ((PayrollRecordStatus[])Enum.GetValues(typeof(PayrollRecordStatus)))[0];
        [Required]
        public decimal Netpay { get; set; } = 0m;
        public Guid? LeaveRequestId { get; set; }
        public Guid? EmployeeId { get; set; }
    }
}
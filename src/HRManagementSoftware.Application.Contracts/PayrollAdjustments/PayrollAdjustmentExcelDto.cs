using HRManagementSoftware;
using System;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentExcelDtoBase
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public PayrollRecordStatus Status { get; set; }
        public decimal Netpay { get; set; }
    }
}
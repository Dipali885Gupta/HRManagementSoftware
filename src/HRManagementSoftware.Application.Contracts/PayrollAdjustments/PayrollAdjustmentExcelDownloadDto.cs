using HRManagementSoftware;
using Volo.Abp.Application.Dtos;
using System;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentExcelDownloadDtoBase
    {
        public string DownloadToken { get; set; } = null!;

        public string? FilterText { get; set; }

        public int? MonthMin { get; set; }
        public int? MonthMax { get; set; }
        public int? YearMin { get; set; }
        public int? YearMax { get; set; }
        public PayrollRecordStatus? Status { get; set; }
        public decimal? NetpayMin { get; set; }
        public decimal? NetpayMax { get; set; }
        public Guid? LeaveRequestId { get; set; }
        public Guid? EmployeeId { get; set; }

        public PayrollAdjustmentExcelDownloadDtoBase()
        {

        }
    }
}
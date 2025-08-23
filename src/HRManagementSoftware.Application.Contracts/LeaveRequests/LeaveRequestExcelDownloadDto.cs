using HRManagementSoftware;
using Volo.Abp.Application.Dtos;
using System;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestExcelDownloadDtoBase
    {
        public string DownloadToken { get; set; } = null!;

        public string? FilterText { get; set; }

        public LeaveType? LeaveType { get; set; }
        public LeaveStatus? LeaveStatus { get; set; }
        public DateTime? StartDateMin { get; set; }
        public DateTime? StartDateMax { get; set; }
        public DateTime? EndDateMin { get; set; }
        public DateTime? EndDateMax { get; set; }
        public string? Reason { get; set; }
        public DateTime? RequestDateMin { get; set; }
        public DateTime? RequestDateMax { get; set; }
        public Guid? EmployeeId { get; set; }

        public LeaveRequestExcelDownloadDtoBase()
        {

        }
    }
}
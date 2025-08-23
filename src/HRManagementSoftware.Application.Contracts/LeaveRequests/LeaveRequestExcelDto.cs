using HRManagementSoftware;
using System;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestExcelDtoBase
    {
        public LeaveType LeaveType { get; set; }
        public LeaveStatus LeaveStatus { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; } = null!;
        public DateTime RequestDate { get; set; }
    }
}
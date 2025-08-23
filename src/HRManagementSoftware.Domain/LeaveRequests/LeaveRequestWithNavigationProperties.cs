using HRManagementSoftware.Employees;

using System;
using System.Collections.Generic;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestWithNavigationPropertiesBase
    {
        public LeaveRequest LeaveRequest { get; set; } = null!;

        public Employee Employee { get; set; } = null!;
        

        
    }
}
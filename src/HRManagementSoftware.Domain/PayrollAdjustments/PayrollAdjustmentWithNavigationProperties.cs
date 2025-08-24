using HRManagementSoftware.LeaveRequests;
using HRManagementSoftware.Employees;

using System;
using System.Collections.Generic;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentWithNavigationPropertiesBase
    {
        public PayrollAdjustment PayrollAdjustment { get; set; } = null!;

        public LeaveRequest LeaveRequest { get; set; } = null!;
        public Employee Employee { get; set; } = null!;
        

        
    }
}
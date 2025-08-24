using HRManagementSoftware.LeaveRequests;
using HRManagementSoftware.Employees;

using System;
using Volo.Abp.Application.Dtos;
using System.Collections.Generic;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentWithNavigationPropertiesDtoBase
    {
        public PayrollAdjustmentDto PayrollAdjustment { get; set; } = null!;

        public LeaveRequestDto LeaveRequest { get; set; } = null!;
        public EmployeeDto Employee { get; set; } = null!;

    }
}
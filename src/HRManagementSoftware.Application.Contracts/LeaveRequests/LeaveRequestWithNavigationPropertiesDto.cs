using HRManagementSoftware.Employees;

using System;
using Volo.Abp.Application.Dtos;
using System.Collections.Generic;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestWithNavigationPropertiesDtoBase
    {
        public LeaveRequestDto LeaveRequest { get; set; } = null!;

        public EmployeeDto Employee { get; set; } = null!;

    }
}
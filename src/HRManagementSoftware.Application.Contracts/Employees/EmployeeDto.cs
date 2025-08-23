using System;
using System.Collections.Generic;

using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace HRManagementSoftware.Employees
{
    public abstract class EmployeeDtoBase : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp
    {
        public string EmployeeNumber { get; set; } = null!;
        public string JobTitle { get; set; } = null!;
        public DateTime DateOfJoining { get; set; }
        public decimal PaidLeaveBalance { get; set; }
        public decimal SickLeaveBalance { get; set; }
        public decimal UnpaidLeaveBalance { get; set; }
        public decimal BaseSalary { get; set; }
        public Guid? IdentityUserId { get; set; }

        public string ConcurrencyStamp { get; set; } = null!;

    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace HRManagementSoftware.Employees
{
    public abstract class EmployeeCreateDtoBase
    {
        [Required]
        [StringLength(EmployeeConsts.EmployeeNumberMaxLength, MinimumLength = EmployeeConsts.EmployeeNumberMinLength)]
        public string EmployeeNumber { get; set; } = null!;
        [Required]
        [StringLength(EmployeeConsts.JobTitleMaxLength, MinimumLength = EmployeeConsts.JobTitleMinLength)]
        public string JobTitle { get; set; } = null!;
        public DateTime DateOfJoining { get; set; }
        public decimal PaidLeaveBalance { get; set; }
        public decimal SickLeaveBalance { get; set; }
        public decimal UnpaidLeaveBalance { get; set; }
        public decimal BaseSalary { get; set; }
        public Guid? IdentityUserId { get; set; }
    }
}
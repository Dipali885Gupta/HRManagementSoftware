using System;

namespace HRManagementSoftware.Employees
{
    public abstract class EmployeeExcelDtoBase
    {
        public string EmployeeNumber { get; set; } = null!;
        public string JobTitle { get; set; } = null!;
        public DateTime DateOfJoining { get; set; }
        public decimal PaidLeaveBalance { get; set; }
        public decimal SickLeaveBalance { get; set; }
        public decimal UnpaidLeaveBalance { get; set; }
        public decimal BaseSalary { get; set; }
    }
}
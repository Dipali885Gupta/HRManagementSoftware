namespace HRManagementSoftware.Employees
{
    public static class EmployeeConsts
    {
        private const string DefaultSorting = "{0}CreationTime desc";

        public static string GetDefaultSorting(bool withEntityName)
        {
            return string.Format(DefaultSorting, withEntityName ? "Employee." : string.Empty);
        }

        public const int EmployeeNumberMinLength = 1;
        public const int EmployeeNumberMaxLength = 1000000;
        public const int JobTitleMinLength = 1;
        public const int JobTitleMaxLength = 1000000;
        public const decimal PaidLeaveBalanceMinLength = 0;
        public const decimal PaidLeaveBalanceMaxLength = 100000;
        public const decimal SickLeaveBalanceMinLength = 0;
        public const decimal SickLeaveBalanceMaxLength = 100000;
        public const decimal UnpaidLeaveBalanceMinLength = 0;
        public const decimal UnpaidLeaveBalanceMaxLength = 100000;
        public const decimal BaseSalaryMinLength = 0;
        public const decimal BaseSalaryMaxLength = 100000;
    }
}
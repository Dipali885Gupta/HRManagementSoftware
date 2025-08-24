namespace HRManagementSoftware.PayrollAdjustments
{
    public static class PayrollAdjustmentConsts
    {
        private const string DefaultSorting = "{0}CreationTime desc";

        public static string GetDefaultSorting(bool withEntityName)
        {
            return string.Format(DefaultSorting, withEntityName ? "PayrollAdjustment." : string.Empty);
        }

        public const int MonthMinLength = 0;
        public const int MonthMaxLength = 100;
        public const int YearMinLength = 1;
        public const int YearMaxLength = 100000;
        public const decimal NetpayMinLength = 0;
        public const decimal NetpayMaxLength = 1000000;
    }
}
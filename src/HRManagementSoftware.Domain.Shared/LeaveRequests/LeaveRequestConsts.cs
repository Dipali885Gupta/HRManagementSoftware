namespace HRManagementSoftware.LeaveRequests
{
    public static class LeaveRequestConsts
    {
        private const string DefaultSorting = "{0}CreationTime desc";

        public static string GetDefaultSorting(bool withEntityName)
        {
            return string.Format(DefaultSorting, withEntityName ? "LeaveRequest." : string.Empty);
        }

        public const int ReasonMinLength = 1;
        public const int ReasonMaxLength = 1000000;
    }
}
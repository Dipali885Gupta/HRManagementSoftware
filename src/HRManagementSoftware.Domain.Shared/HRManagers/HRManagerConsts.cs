namespace HRManagementSoftware.HRManagers
{
    public static class HRManagerConsts
    {
        private const string DefaultSorting = "{0}CreationTime desc";

        public static string GetDefaultSorting(bool withEntityName)
        {
            return string.Format(DefaultSorting, withEntityName ? "HRManager." : string.Empty);
        }

        public const int HRNumberMinLength = 1;
        public const int HRNumberMaxLength = 1000000;
        public const int DepartmentMinLength = 1;
        public const int DepartmentMaxLength = 1000000;
    }
}
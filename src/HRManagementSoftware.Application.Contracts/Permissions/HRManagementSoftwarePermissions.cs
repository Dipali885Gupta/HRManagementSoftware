namespace HRManagementSoftware.Permissions;

public static class HRManagementSoftwarePermissions
{
    public const string GroupName = "HRManagementSoftware";

    public static class Dashboard
    {
        public const string DashboardGroup = GroupName + ".Dashboard";
        public const string Host = DashboardGroup + ".Host";
        public const string Tenant = DashboardGroup + ".Tenant";
    }

    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";

    public static class Employees
    {
        public const string Default = GroupName + ".Employees";
        public const string Edit = Default + ".Edit";
        public const string Create = Default + ".Create";
        public const string Delete = Default + ".Delete";
    }

    public static class LeaveRequests
    {
        public const string Default = GroupName + ".LeaveRequests";
        public const string Edit = Default + ".Edit";
        public const string Create = Default + ".Create";
        public const string Delete = Default + ".Delete";
    }
}
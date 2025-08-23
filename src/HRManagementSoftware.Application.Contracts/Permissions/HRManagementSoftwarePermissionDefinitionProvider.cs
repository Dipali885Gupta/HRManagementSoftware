using HRManagementSoftware.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace HRManagementSoftware.Permissions;

public class HRManagementSoftwarePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(HRManagementSoftwarePermissions.GroupName);

        myGroup.AddPermission(HRManagementSoftwarePermissions.Dashboard.Host, L("Permission:Dashboard"), MultiTenancySides.Host);
        myGroup.AddPermission(HRManagementSoftwarePermissions.Dashboard.Tenant, L("Permission:Dashboard"), MultiTenancySides.Tenant);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(HRManagementSoftwarePermissions.MyPermission1, L("Permission:MyPermission1"));

        var employeePermission = myGroup.AddPermission(HRManagementSoftwarePermissions.Employees.Default, L("Permission:Employees"));
        employeePermission.AddChild(HRManagementSoftwarePermissions.Employees.Create, L("Permission:Create"));
        employeePermission.AddChild(HRManagementSoftwarePermissions.Employees.Edit, L("Permission:Edit"));
        employeePermission.AddChild(HRManagementSoftwarePermissions.Employees.Delete, L("Permission:Delete"));

        var leaveRequestPermission = myGroup.AddPermission(HRManagementSoftwarePermissions.LeaveRequests.Default, L("Permission:LeaveRequests"));
        leaveRequestPermission.AddChild(HRManagementSoftwarePermissions.LeaveRequests.Create, L("Permission:Create"));
        leaveRequestPermission.AddChild(HRManagementSoftwarePermissions.LeaveRequests.Edit, L("Permission:Edit"));
        leaveRequestPermission.AddChild(HRManagementSoftwarePermissions.LeaveRequests.Delete, L("Permission:Delete"));

        var hRManagerPermission = myGroup.AddPermission(HRManagementSoftwarePermissions.HRManagers.Default, L("Permission:HRManagers"));
        hRManagerPermission.AddChild(HRManagementSoftwarePermissions.HRManagers.Create, L("Permission:Create"));
        hRManagerPermission.AddChild(HRManagementSoftwarePermissions.HRManagers.Edit, L("Permission:Edit"));
        hRManagerPermission.AddChild(HRManagementSoftwarePermissions.HRManagers.Delete, L("Permission:Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<HRManagementSoftwareResource>(name);
    }
}
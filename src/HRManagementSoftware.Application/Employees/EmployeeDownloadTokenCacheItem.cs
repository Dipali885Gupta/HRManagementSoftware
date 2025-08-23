using System;

namespace HRManagementSoftware.Employees;

public abstract class EmployeeDownloadTokenCacheItemBase
{
    public string Token { get; set; } = null!;
}
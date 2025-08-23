using System;

namespace HRManagementSoftware.LeaveRequests;

public abstract class LeaveRequestDownloadTokenCacheItemBase
{
    public string Token { get; set; } = null!;
}
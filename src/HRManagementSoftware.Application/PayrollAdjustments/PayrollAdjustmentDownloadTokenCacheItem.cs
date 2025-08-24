using System;

namespace HRManagementSoftware.PayrollAdjustments;

public abstract class PayrollAdjustmentDownloadTokenCacheItemBase
{
    public string Token { get; set; } = null!;
}
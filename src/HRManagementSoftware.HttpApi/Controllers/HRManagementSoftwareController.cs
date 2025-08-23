using HRManagementSoftware.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace HRManagementSoftware.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class HRManagementSoftwareController : AbpControllerBase
{
    protected HRManagementSoftwareController()
    {
        LocalizationResource = typeof(HRManagementSoftwareResource);
    }
}

using HRManagementSoftware.Localization;
using Volo.Abp.Application.Services;

namespace HRManagementSoftware;

/* Inherit your application services from this class.
 */
public abstract class HRManagementSoftwareAppService : ApplicationService
{
    protected HRManagementSoftwareAppService()
    {
        LocalizationResource = typeof(HRManagementSoftwareResource);
    }
}

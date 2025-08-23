using Microsoft.Extensions.Localization;
using HRManagementSoftware.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace HRManagementSoftware;

[Dependency(ReplaceServices = true)]
public class HRManagementSoftwareBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<HRManagementSoftwareResource> _localizer;

    public HRManagementSoftwareBrandingProvider(IStringLocalizer<HRManagementSoftwareResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}

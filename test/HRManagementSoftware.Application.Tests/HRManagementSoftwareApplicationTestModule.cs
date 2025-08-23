using Volo.Abp.Modularity;

namespace HRManagementSoftware;

[DependsOn(
    typeof(HRManagementSoftwareApplicationModule),
    typeof(HRManagementSoftwareDomainTestModule)
)]
public class HRManagementSoftwareApplicationTestModule : AbpModule
{

}

using Volo.Abp.Modularity;

namespace HRManagementSoftware;

[DependsOn(
    typeof(HRManagementSoftwareDomainModule),
    typeof(HRManagementSoftwareTestBaseModule)
)]
public class HRManagementSoftwareDomainTestModule : AbpModule
{

}

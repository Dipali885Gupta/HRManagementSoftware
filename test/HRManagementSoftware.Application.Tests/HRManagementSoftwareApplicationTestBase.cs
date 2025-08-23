using Volo.Abp.Modularity;

namespace HRManagementSoftware;

public abstract class HRManagementSoftwareApplicationTestBase<TStartupModule> : HRManagementSoftwareTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}

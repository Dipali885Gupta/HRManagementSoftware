using Volo.Abp.Modularity;

namespace HRManagementSoftware;

/* Inherit from this class for your domain layer tests. */
public abstract class HRManagementSoftwareDomainTestBase<TStartupModule> : HRManagementSoftwareTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}

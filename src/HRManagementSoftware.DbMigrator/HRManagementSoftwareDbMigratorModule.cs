using HRManagementSoftware.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace HRManagementSoftware.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(HRManagementSoftwareEntityFrameworkCoreModule),
    typeof(HRManagementSoftwareApplicationContractsModule)
)]
public class HRManagementSoftwareDbMigratorModule : AbpModule
{
}

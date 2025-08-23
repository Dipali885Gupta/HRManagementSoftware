using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace HRManagementSoftware.Data;

/* This is used if database provider does't define
 * IHRManagementSoftwareDbSchemaMigrator implementation.
 */
public class NullHRManagementSoftwareDbSchemaMigrator : IHRManagementSoftwareDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}

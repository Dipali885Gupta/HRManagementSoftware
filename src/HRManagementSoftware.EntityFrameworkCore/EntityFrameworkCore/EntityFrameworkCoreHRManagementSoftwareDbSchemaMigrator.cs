using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using HRManagementSoftware.Data;
using Volo.Abp.DependencyInjection;

namespace HRManagementSoftware.EntityFrameworkCore;

public class EntityFrameworkCoreHRManagementSoftwareDbSchemaMigrator
    : IHRManagementSoftwareDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreHRManagementSoftwareDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the HRManagementSoftwareDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<HRManagementSoftwareDbContext>()
            .Database
            .MigrateAsync();
    }
}

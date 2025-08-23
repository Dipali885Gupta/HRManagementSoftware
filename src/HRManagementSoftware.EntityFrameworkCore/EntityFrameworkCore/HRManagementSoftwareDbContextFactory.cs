using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace HRManagementSoftware.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class HRManagementSoftwareDbContextFactory : IDesignTimeDbContextFactory<HRManagementSoftwareDbContext>
{
    public HRManagementSoftwareDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        HRManagementSoftwareEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<HRManagementSoftwareDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));
        
        return new HRManagementSoftwareDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../HRManagementSoftware.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}

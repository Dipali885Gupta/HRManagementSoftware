using System.Threading.Tasks;

namespace HRManagementSoftware.Data;

public interface IHRManagementSoftwareDbSchemaMigrator
{
    Task MigrateAsync();
}

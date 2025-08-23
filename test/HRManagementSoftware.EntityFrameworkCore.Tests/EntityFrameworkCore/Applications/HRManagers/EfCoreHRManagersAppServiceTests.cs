using HRManagementSoftware.HRManagers;
using Xunit;
using HRManagementSoftware.EntityFrameworkCore;

namespace HRManagementSoftware.HRManagers;

public class EfCoreHRManagersAppServiceTests : HRManagersAppServiceTests<HRManagementSoftwareEntityFrameworkCoreTestModule>
{
}
using HRManagementSoftware.Employees;
using Xunit;
using HRManagementSoftware.EntityFrameworkCore;

namespace HRManagementSoftware.Employees;

public class EfCoreEmployeesAppServiceTests : EmployeesAppServiceTests<HRManagementSoftwareEntityFrameworkCoreTestModule>
{
}
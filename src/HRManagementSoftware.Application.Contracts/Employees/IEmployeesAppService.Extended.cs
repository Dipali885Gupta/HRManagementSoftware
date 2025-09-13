using System.Threading.Tasks;

namespace HRManagementSoftware.Employees
{
    public partial interface IEmployeesAppService
    {
        //Write your custom code here...
        Task<EmployeeDto> GetNewEmployeeNumberAsync();
    }
}
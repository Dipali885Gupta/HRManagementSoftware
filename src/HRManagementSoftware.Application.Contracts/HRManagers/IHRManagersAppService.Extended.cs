using System.Threading.Tasks;

namespace HRManagementSoftware.HRManagers
{
    public partial interface IHRManagersAppService
    {
        //Write your custom code here...
        Task<HRManagerDto> GetNewHRNumberAsync();
    }
}
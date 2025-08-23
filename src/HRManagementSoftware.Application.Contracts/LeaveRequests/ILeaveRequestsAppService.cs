using HRManagementSoftware.Shared;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using HRManagementSoftware.Shared;

namespace HRManagementSoftware.LeaveRequests
{
    public partial interface ILeaveRequestsAppService : IApplicationService
    {

        Task<PagedResultDto<LeaveRequestWithNavigationPropertiesDto>> GetListAsync(GetLeaveRequestsInput input);

        Task<LeaveRequestWithNavigationPropertiesDto> GetWithNavigationPropertiesAsync(Guid id);

        Task<LeaveRequestDto> GetAsync(Guid id);

        Task<PagedResultDto<LookupDto<Guid>>> GetEmployeeLookupAsync(LookupRequestDto input);

        Task DeleteAsync(Guid id);

        Task<LeaveRequestDto> CreateAsync(LeaveRequestCreateDto input);

        Task<LeaveRequestDto> UpdateAsync(Guid id, LeaveRequestUpdateDto input);

        Task<IRemoteStreamContent> GetListAsExcelFileAsync(LeaveRequestExcelDownloadDto input);
        Task DeleteByIdsAsync(List<Guid> leaverequestIds);

        Task DeleteAllAsync(GetLeaveRequestsInput input);
        Task<HRManagementSoftware.Shared.DownloadTokenResultDto> GetDownloadTokenAsync();

    }
}
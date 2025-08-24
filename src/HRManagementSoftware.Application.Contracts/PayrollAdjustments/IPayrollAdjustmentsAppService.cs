using HRManagementSoftware.Shared;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using HRManagementSoftware.Shared;

namespace HRManagementSoftware.PayrollAdjustments
{
    public partial interface IPayrollAdjustmentsAppService : IApplicationService
    {

        Task<PagedResultDto<PayrollAdjustmentWithNavigationPropertiesDto>> GetListAsync(GetPayrollAdjustmentsInput input);

        Task<PayrollAdjustmentWithNavigationPropertiesDto> GetWithNavigationPropertiesAsync(Guid id);

        Task<PayrollAdjustmentDto> GetAsync(Guid id);

        Task<PagedResultDto<LookupDto<Guid>>> GetLeaveRequestLookupAsync(LookupRequestDto input);

        Task<PagedResultDto<LookupDto<Guid>>> GetEmployeeLookupAsync(LookupRequestDto input);

        Task DeleteAsync(Guid id);

        Task<PayrollAdjustmentDto> CreateAsync(PayrollAdjustmentCreateDto input);

        Task<PayrollAdjustmentDto> UpdateAsync(Guid id, PayrollAdjustmentUpdateDto input);

        Task<IRemoteStreamContent> GetListAsExcelFileAsync(PayrollAdjustmentExcelDownloadDto input);
        Task DeleteByIdsAsync(List<Guid> payrolladjustmentIds);

        Task DeleteAllAsync(GetPayrollAdjustmentsInput input);
        Task<HRManagementSoftware.Shared.DownloadTokenResultDto> GetDownloadTokenAsync();

    }
}
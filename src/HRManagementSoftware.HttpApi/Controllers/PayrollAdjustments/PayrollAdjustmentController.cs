using HRManagementSoftware.Shared;
using Asp.Versioning;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using HRManagementSoftware.PayrollAdjustments;
using Volo.Abp.Content;
using HRManagementSoftware.Shared;

namespace HRManagementSoftware.Controllers.PayrollAdjustments
{
    [RemoteService]
    [Area("app")]
    [ControllerName("PayrollAdjustment")]
    [Route("api/app/payroll-adjustments")]

    public abstract class PayrollAdjustmentControllerBase : AbpController
    {
        protected IPayrollAdjustmentsAppService _payrollAdjustmentsAppService;

        public PayrollAdjustmentControllerBase(IPayrollAdjustmentsAppService payrollAdjustmentsAppService)
        {
            _payrollAdjustmentsAppService = payrollAdjustmentsAppService;
        }

        [HttpGet]
        public virtual Task<PagedResultDto<PayrollAdjustmentWithNavigationPropertiesDto>> GetListAsync(GetPayrollAdjustmentsInput input)
        {
            return _payrollAdjustmentsAppService.GetListAsync(input);
        }

        [HttpGet]
        [Route("with-navigation-properties/{id}")]
        public virtual Task<PayrollAdjustmentWithNavigationPropertiesDto> GetWithNavigationPropertiesAsync(Guid id)
        {
            return _payrollAdjustmentsAppService.GetWithNavigationPropertiesAsync(id);
        }

        [HttpGet]
        [Route("{id}")]
        public virtual Task<PayrollAdjustmentDto> GetAsync(Guid id)
        {
            return _payrollAdjustmentsAppService.GetAsync(id);
        }

        [HttpGet]
        [Route("leave-request-lookup")]
        public virtual Task<PagedResultDto<LookupDto<Guid>>> GetLeaveRequestLookupAsync(LookupRequestDto input)
        {
            return _payrollAdjustmentsAppService.GetLeaveRequestLookupAsync(input);
        }

        [HttpGet]
        [Route("employee-lookup")]
        public virtual Task<PagedResultDto<LookupDto<Guid>>> GetEmployeeLookupAsync(LookupRequestDto input)
        {
            return _payrollAdjustmentsAppService.GetEmployeeLookupAsync(input);
        }

        [HttpPost]
        public virtual Task<PayrollAdjustmentDto> CreateAsync(PayrollAdjustmentCreateDto input)
        {
            return _payrollAdjustmentsAppService.CreateAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        public virtual Task<PayrollAdjustmentDto> UpdateAsync(Guid id, PayrollAdjustmentUpdateDto input)
        {
            return _payrollAdjustmentsAppService.UpdateAsync(id, input);
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual Task DeleteAsync(Guid id)
        {
            return _payrollAdjustmentsAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("as-excel-file")]
        public virtual Task<IRemoteStreamContent> GetListAsExcelFileAsync(PayrollAdjustmentExcelDownloadDto input)
        {
            return _payrollAdjustmentsAppService.GetListAsExcelFileAsync(input);
        }

        [HttpGet]
        [Route("download-token")]
        public virtual Task<HRManagementSoftware.Shared.DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            return _payrollAdjustmentsAppService.GetDownloadTokenAsync();
        }

        [HttpDelete]
        [Route("")]
        public virtual Task DeleteByIdsAsync(List<Guid> payrolladjustmentIds)
        {
            return _payrollAdjustmentsAppService.DeleteByIdsAsync(payrolladjustmentIds);
        }

        [HttpDelete]
        [Route("all")]
        public virtual Task DeleteAllAsync(GetPayrollAdjustmentsInput input)
        {
            return _payrollAdjustmentsAppService.DeleteAllAsync(input);
        }
    }
}
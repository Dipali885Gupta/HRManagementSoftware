using Asp.Versioning;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using HRManagementSoftware.PayrollAdjustments;

namespace HRManagementSoftware.Controllers.PayrollAdjustments
{
    [RemoteService]
    [Area("app")]
    [ControllerName("PayrollAdjustment")]
    [Route("api/app/payroll-adjustments")]

    public class PayrollAdjustmentController : PayrollAdjustmentControllerBase, IPayrollAdjustmentsAppService
    {
        public PayrollAdjustmentController(IPayrollAdjustmentsAppService payrollAdjustmentsAppService) : base(payrollAdjustmentsAppService)
        {
        }
    }
}
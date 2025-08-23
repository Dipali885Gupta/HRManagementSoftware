using Asp.Versioning;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using HRManagementSoftware.LeaveRequests;

namespace HRManagementSoftware.Controllers.LeaveRequests
{
    [RemoteService]
    [Area("app")]
    [ControllerName("LeaveRequest")]
    [Route("api/app/leave-requests")]

    public class LeaveRequestController : LeaveRequestControllerBase, ILeaveRequestsAppService
    {
        public LeaveRequestController(ILeaveRequestsAppService leaveRequestsAppService) : base(leaveRequestsAppService)
        {
        }
    }
}
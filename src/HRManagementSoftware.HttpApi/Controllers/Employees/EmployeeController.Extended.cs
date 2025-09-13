using Asp.Versioning;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using HRManagementSoftware.Employees;

namespace HRManagementSoftware.Controllers.Employees
{
    [RemoteService]
    [Area("app")]
    [ControllerName("Employee")]
    [Route("api/app/employees")]
    [IgnoreAntiforgeryToken]

    public class EmployeeController : EmployeeControllerBase, IEmployeesAppService
    {
        public EmployeeController(IEmployeesAppService employeesAppService) : base(employeesAppService)
        {

            
        }

        [HttpGet]
        [Route("by-userid")]
        public async Task<EmployeeDto> GetNewEmployeeNumberAsync()
        {
            return await _employeesAppService.GetNewEmployeeNumberAsync();
        }
    }
}
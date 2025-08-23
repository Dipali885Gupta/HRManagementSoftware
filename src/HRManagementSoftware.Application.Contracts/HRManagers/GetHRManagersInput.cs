using Volo.Abp.Application.Dtos;
using System;

namespace HRManagementSoftware.HRManagers
{
    public abstract class GetHRManagersInputBase : PagedAndSortedResultRequestDto
    {
        public string? FilterText { get; set; }

        public string? HRNumber { get; set; }
        public string? Department { get; set; }
        public Guid? IdentityUserId { get; set; }

        public GetHRManagersInputBase()
        {

        }
    }
}
using Volo.Abp.Application.Dtos;
using System;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerExcelDownloadDtoBase
    {
        public string DownloadToken { get; set; } = null!;

        public string? FilterText { get; set; }

        public string? HRNumber { get; set; }
        public string? Department { get; set; }
        public Guid? IdentityUserId { get; set; }

        public HRManagerExcelDownloadDtoBase()
        {

        }
    }
}
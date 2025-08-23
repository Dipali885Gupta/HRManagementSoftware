using System;
using System.Collections.Generic;

using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerDtoBase : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp
    {
        public string HRNumber { get; set; } = null!;
        public string Department { get; set; } = null!;
        public Guid? IdentityUserId { get; set; }

        public string ConcurrencyStamp { get; set; } = null!;

    }
}
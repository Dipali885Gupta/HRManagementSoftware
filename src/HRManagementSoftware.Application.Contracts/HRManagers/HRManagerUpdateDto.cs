using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerUpdateDtoBase : IHasConcurrencyStamp
    {
        [Required]
        [StringLength(HRManagerConsts.HRNumberMaxLength, MinimumLength = HRManagerConsts.HRNumberMinLength)]
        public string HRNumber { get; set; } = null!;
        [Required]
        [StringLength(HRManagerConsts.DepartmentMaxLength, MinimumLength = HRManagerConsts.DepartmentMinLength)]
        public string Department { get; set; } = null!;
        public Guid? IdentityUserId { get; set; }

        public string ConcurrencyStamp { get; set; } = null!;
    }
}
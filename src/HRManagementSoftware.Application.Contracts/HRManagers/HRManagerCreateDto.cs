using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerCreateDtoBase
    {
        [Required]
        [StringLength(HRManagerConsts.HRNumberMaxLength, MinimumLength = HRManagerConsts.HRNumberMinLength)]
        public string HRNumber { get; set; } = null!;
        [Required]
        [StringLength(HRManagerConsts.DepartmentMaxLength, MinimumLength = HRManagerConsts.DepartmentMinLength)]
        public string Department { get; set; } = null!;
        public Guid? IdentityUserId { get; set; }
    }
}
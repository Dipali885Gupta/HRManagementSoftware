using Volo.Abp.Identity;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using JetBrains.Annotations;

using Volo.Abp;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerBase : FullAuditedAggregateRoot<Guid>
    {
        [NotNull]
        public virtual string HRNumber { get; set; }

        [NotNull]
        public virtual string Department { get; set; }
        public Guid? IdentityUserId { get; set; }

        protected HRManagerBase()
        {

        }

        public HRManagerBase(Guid id, Guid? identityUserId, string hRNumber, string department)
        {

            Id = id;
            Check.NotNull(hRNumber, nameof(hRNumber));
            Check.Length(hRNumber, nameof(hRNumber), HRManagerConsts.HRNumberMaxLength, HRManagerConsts.HRNumberMinLength);
            Check.NotNull(department, nameof(department));
            Check.Length(department, nameof(department), HRManagerConsts.DepartmentMaxLength, HRManagerConsts.DepartmentMinLength);
            HRNumber = hRNumber;
            Department = department;
            IdentityUserId = identityUserId;
        }

    }
}
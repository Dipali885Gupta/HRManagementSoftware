using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerManagerBase : DomainService
    {
        protected IHRManagerRepository _hRManagerRepository;

        public HRManagerManagerBase(IHRManagerRepository hRManagerRepository)
        {
            _hRManagerRepository = hRManagerRepository;
        }

        public virtual async Task<HRManager> CreateAsync(
        Guid? identityUserId, string hRNumber, string department)
        {
            Check.NotNullOrWhiteSpace(hRNumber, nameof(hRNumber));
            Check.Length(hRNumber, nameof(hRNumber), HRManagerConsts.HRNumberMaxLength, HRManagerConsts.HRNumberMinLength);
            Check.NotNullOrWhiteSpace(department, nameof(department));
            Check.Length(department, nameof(department), HRManagerConsts.DepartmentMaxLength, HRManagerConsts.DepartmentMinLength);

            var hRManager = new HRManager(
             GuidGenerator.Create(),
             identityUserId, hRNumber, department
             );

            return await _hRManagerRepository.InsertAsync(hRManager);
        }

        public virtual async Task<HRManager> UpdateAsync(
            Guid id,
            Guid? identityUserId, string hRNumber, string department, [CanBeNull] string? concurrencyStamp = null
        )
        {
            Check.NotNullOrWhiteSpace(hRNumber, nameof(hRNumber));
            Check.Length(hRNumber, nameof(hRNumber), HRManagerConsts.HRNumberMaxLength, HRManagerConsts.HRNumberMinLength);
            Check.NotNullOrWhiteSpace(department, nameof(department));
            Check.Length(department, nameof(department), HRManagerConsts.DepartmentMaxLength, HRManagerConsts.DepartmentMinLength);

            var hRManager = await _hRManagerRepository.GetAsync(id);

            hRManager.IdentityUserId = identityUserId;
            hRManager.HRNumber = hRNumber;
            hRManager.Department = department;

            hRManager.SetConcurrencyStampIfNotNull(concurrencyStamp);
            return await _hRManagerRepository.UpdateAsync(hRManager);
        }

    }
}
using HRManagementSoftware.Shared;
using Volo.Abp.Identity;
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using HRManagementSoftware.Permissions;
using HRManagementSoftware.HRManagers;
using MiniExcelLibs;
using Volo.Abp.Content;
using Volo.Abp.Authorization;
using Volo.Abp.Caching;
using Microsoft.Extensions.Caching.Distributed;
using HRManagementSoftware.Shared;

namespace HRManagementSoftware.HRManagers
{
    [RemoteService(IsEnabled = false)]
    [Authorize(HRManagementSoftwarePermissions.HRManagers.Default)]
    public abstract class HRManagersAppServiceBase : HRManagementSoftwareAppService
    {
        protected IDistributedCache<HRManagerDownloadTokenCacheItem, string> _downloadTokenCache;
        protected IHRManagerRepository _hRManagerRepository;
        protected HRManagerManager _hRManagerManager;

        protected IRepository<Volo.Abp.Identity.IdentityUser, Guid> _identityUserRepository;

        public HRManagersAppServiceBase(IHRManagerRepository hRManagerRepository, HRManagerManager hRManagerManager, IDistributedCache<HRManagerDownloadTokenCacheItem, string> downloadTokenCache, IRepository<Volo.Abp.Identity.IdentityUser, Guid> identityUserRepository)
        {
            _downloadTokenCache = downloadTokenCache;
            _hRManagerRepository = hRManagerRepository;
            _hRManagerManager = hRManagerManager; _identityUserRepository = identityUserRepository;

        }

        public virtual async Task<PagedResultDto<HRManagerWithNavigationPropertiesDto>> GetListAsync(GetHRManagersInput input)
        {
            var totalCount = await _hRManagerRepository.GetCountAsync(input.FilterText, input.HRNumber, input.Department, input.IdentityUserId);
            var items = await _hRManagerRepository.GetListWithNavigationPropertiesAsync(input.FilterText, input.HRNumber, input.Department, input.IdentityUserId, input.Sorting, input.MaxResultCount, input.SkipCount);

            return new PagedResultDto<HRManagerWithNavigationPropertiesDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<HRManagerWithNavigationProperties>, List<HRManagerWithNavigationPropertiesDto>>(items)
            };
        }

        public virtual async Task<HRManagerWithNavigationPropertiesDto> GetWithNavigationPropertiesAsync(Guid id)
        {
            return ObjectMapper.Map<HRManagerWithNavigationProperties, HRManagerWithNavigationPropertiesDto>
                (await _hRManagerRepository.GetWithNavigationPropertiesAsync(id));
        }

        public virtual async Task<HRManagerDto> GetAsync(Guid id)
        {
            return ObjectMapper.Map<HRManager, HRManagerDto>(await _hRManagerRepository.GetAsync(id));
        }

        public virtual async Task<PagedResultDto<LookupDto<Guid>>> GetIdentityUserLookupAsync(LookupRequestDto input)
        {
            var query = (await _identityUserRepository.GetQueryableAsync())
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter),
                    x => x.Name != null &&
                         x.Name.Contains(input.Filter));

            var lookupData = await query.PageBy(input.SkipCount, input.MaxResultCount).ToDynamicListAsync<Volo.Abp.Identity.IdentityUser>();
            var totalCount = query.Count();
            return new PagedResultDto<LookupDto<Guid>>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<Volo.Abp.Identity.IdentityUser>, List<LookupDto<Guid>>>(lookupData)
            };
        }

        [Authorize(HRManagementSoftwarePermissions.HRManagers.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            await _hRManagerRepository.DeleteAsync(id);
        }

        [Authorize(HRManagementSoftwarePermissions.HRManagers.Create)]
        public virtual async Task<HRManagerDto> CreateAsync(HRManagerCreateDto input)
        {

            var hRManager = await _hRManagerManager.CreateAsync(
            input.IdentityUserId, input.HRNumber, input.Department
            );

            return ObjectMapper.Map<HRManager, HRManagerDto>(hRManager);
        }

        [Authorize(HRManagementSoftwarePermissions.HRManagers.Edit)]
        public virtual async Task<HRManagerDto> UpdateAsync(Guid id, HRManagerUpdateDto input)
        {

            var hRManager = await _hRManagerManager.UpdateAsync(
            id,
            input.IdentityUserId, input.HRNumber, input.Department, input.ConcurrencyStamp
            );

            return ObjectMapper.Map<HRManager, HRManagerDto>(hRManager);
        }

        [AllowAnonymous]
        public virtual async Task<IRemoteStreamContent> GetListAsExcelFileAsync(HRManagerExcelDownloadDto input)
        {
            var downloadToken = await _downloadTokenCache.GetAsync(input.DownloadToken);
            if (downloadToken == null || input.DownloadToken != downloadToken.Token)
            {
                throw new AbpAuthorizationException("Invalid download token: " + input.DownloadToken);
            }

            var hRManagers = await _hRManagerRepository.GetListWithNavigationPropertiesAsync(input.FilterText, input.HRNumber, input.Department, input.IdentityUserId);
            var items = hRManagers.Select(item => new
            {
                HRNumber = item.HRManager.HRNumber,
                Department = item.HRManager.Department,

                IdentityUser = item.IdentityUser?.Name,

            });

            var memoryStream = new MemoryStream();
            await memoryStream.SaveAsAsync(items);
            memoryStream.Seek(0, SeekOrigin.Begin);

            return new RemoteStreamContent(memoryStream, "HRManagers.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        [Authorize(HRManagementSoftwarePermissions.HRManagers.Delete)]
        public virtual async Task DeleteByIdsAsync(List<Guid> hrmanagerIds)
        {
            await _hRManagerRepository.DeleteManyAsync(hrmanagerIds);
        }

        [Authorize(HRManagementSoftwarePermissions.HRManagers.Delete)]
        public virtual async Task DeleteAllAsync(GetHRManagersInput input)
        {
            await _hRManagerRepository.DeleteAllAsync(input.FilterText, input.HRNumber, input.Department, input.IdentityUserId);
        }
        public virtual async Task<HRManagementSoftware.Shared.DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            var token = Guid.NewGuid().ToString("N");

            await _downloadTokenCache.SetAsync(
                token,
                new HRManagerDownloadTokenCacheItem { Token = token },
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(30)
                });

            return new HRManagementSoftware.Shared.DownloadTokenResultDto
            {
                Token = token
            };
        }
    }
}
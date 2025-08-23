using Volo.Abp.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using HRManagementSoftware.EntityFrameworkCore;

namespace HRManagementSoftware.HRManagers
{
    public abstract class EfCoreHRManagerRepositoryBase : EfCoreRepository<HRManagementSoftwareDbContext, HRManager, Guid>
    {
        public EfCoreHRManagerRepositoryBase(IDbContextProvider<HRManagementSoftwareDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        public virtual async Task DeleteAllAsync(
            string? filterText = null,
                        string? hRNumber = null,
            string? department = null,
            Guid? identityUserId = null,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();

            query = ApplyFilter(query, filterText, hRNumber, department, identityUserId);

            var ids = query.Select(x => x.HRManager.Id);
            await DeleteManyAsync(ids, cancellationToken: GetCancellationToken(cancellationToken));
        }

        public virtual async Task<HRManagerWithNavigationProperties> GetWithNavigationPropertiesAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var dbContext = await GetDbContextAsync();

            return (await GetDbSetAsync()).Where(b => b.Id == id)
                .Select(hRManager => new HRManagerWithNavigationProperties
                {
                    HRManager = hRManager,
                    IdentityUser = dbContext.Set<IdentityUser>().FirstOrDefault(c => c.Id == hRManager.IdentityUserId)
                }).FirstOrDefault();
        }

        public virtual async Task<List<HRManagerWithNavigationProperties>> GetListWithNavigationPropertiesAsync(
            string? filterText = null,
            string? hRNumber = null,
            string? department = null,
            Guid? identityUserId = null,
            string? sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();
            query = ApplyFilter(query, filterText, hRNumber, department, identityUserId);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? HRManagerConsts.GetDefaultSorting(true) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        protected virtual async Task<IQueryable<HRManagerWithNavigationProperties>> GetQueryForNavigationPropertiesAsync()
        {
            return from hRManager in (await GetDbSetAsync())
                   join identityUser in (await GetDbContextAsync()).Set<IdentityUser>() on hRManager.IdentityUserId equals identityUser.Id into users
                   from identityUser in users.DefaultIfEmpty()
                   select new HRManagerWithNavigationProperties
                   {
                       HRManager = hRManager,
                       IdentityUser = identityUser
                   };
        }

        protected virtual IQueryable<HRManagerWithNavigationProperties> ApplyFilter(
            IQueryable<HRManagerWithNavigationProperties> query,
            string? filterText,
            string? hRNumber = null,
            string? department = null,
            Guid? identityUserId = null)
        {
            return query
                .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => e.HRManager.HRNumber!.Contains(filterText!) || e.HRManager.Department!.Contains(filterText!))
                    .WhereIf(!string.IsNullOrWhiteSpace(hRNumber), e => e.HRManager.HRNumber.Contains(hRNumber))
                    .WhereIf(!string.IsNullOrWhiteSpace(department), e => e.HRManager.Department.Contains(department))
                    .WhereIf(identityUserId != null && identityUserId != Guid.Empty, e => e.IdentityUser != null && e.IdentityUser.Id == identityUserId);
        }

        public virtual async Task<List<HRManager>> GetListAsync(
            string? filterText = null,
            string? hRNumber = null,
            string? department = null,
            string? sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default)
        {
            var query = ApplyFilter((await GetQueryableAsync()), filterText, hRNumber, department);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? HRManagerConsts.GetDefaultSorting(false) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        public virtual async Task<long> GetCountAsync(
            string? filterText = null,
            string? hRNumber = null,
            string? department = null,
            Guid? identityUserId = null,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();
            query = ApplyFilter(query, filterText, hRNumber, department, identityUserId);
            return await query.LongCountAsync(GetCancellationToken(cancellationToken));
        }

        protected virtual IQueryable<HRManager> ApplyFilter(
            IQueryable<HRManager> query,
            string? filterText = null,
            string? hRNumber = null,
            string? department = null)
        {
            return query
                    .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => e.HRNumber!.Contains(filterText!) || e.Department!.Contains(filterText!))
                    .WhereIf(!string.IsNullOrWhiteSpace(hRNumber), e => e.HRNumber.Contains(hRNumber))
                    .WhereIf(!string.IsNullOrWhiteSpace(department), e => e.Department.Contains(department));
        }
    }
}
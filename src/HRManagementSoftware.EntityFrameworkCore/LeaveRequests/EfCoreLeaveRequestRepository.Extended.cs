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

namespace HRManagementSoftware.LeaveRequests
{
    public class EfCoreLeaveRequestRepository : EfCoreLeaveRequestRepositoryBase, ILeaveRequestRepository
    {
        public EfCoreLeaveRequestRepository(IDbContextProvider<HRManagementSoftwareDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }
}
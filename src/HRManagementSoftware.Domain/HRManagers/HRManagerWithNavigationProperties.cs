using Volo.Abp.Identity;

using System;
using System.Collections.Generic;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerWithNavigationPropertiesBase
    {
        public HRManager HRManager { get; set; } = null!;

        public IdentityUser IdentityUser { get; set; } = null!;
        

        
    }
}
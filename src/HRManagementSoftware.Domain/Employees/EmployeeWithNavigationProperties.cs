using Volo.Abp.Identity;

using System;
using System.Collections.Generic;

namespace HRManagementSoftware.Employees
{
    public abstract class EmployeeWithNavigationPropertiesBase
    {
        public Employee Employee { get; set; } = null!;

        public IdentityUser IdentityUser { get; set; } = null!;
        

        
    }
}
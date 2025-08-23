using System;

namespace HRManagementSoftware.HRManagers
{
    public abstract class HRManagerExcelDtoBase
    {
        public string HRNumber { get; set; } = null!;
        public string Department { get; set; } = null!;
    }
}
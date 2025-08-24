using HRManagementSoftware;
using System;
using System.Collections.Generic;

using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class PayrollAdjustmentDtoBase : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public PayrollRecordStatus Status { get; set; }
        public decimal Netpay { get; set; }
        public Guid? LeaveRequestId { get; set; }
        public Guid? EmployeeId { get; set; }

        public string ConcurrencyStamp { get; set; } = null!;

    }
}
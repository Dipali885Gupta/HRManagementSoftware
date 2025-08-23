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

namespace HRManagementSoftware.Employees
{
    public abstract class EmployeeBase : FullAuditedAggregateRoot<Guid>
    {
        [NotNull]
        public virtual string EmployeeNumber { get; set; }

        [NotNull]
        public virtual string JobTitle { get; set; }

        public virtual DateTime DateOfJoining { get; set; }

        public virtual decimal PaidLeaveBalance { get; set; }

        public virtual decimal SickLeaveBalance { get; set; }

        public virtual decimal UnpaidLeaveBalance { get; set; }

        public virtual decimal BaseSalary { get; set; }
        public Guid? IdentityUserId { get; set; }

        protected EmployeeBase()
        {

        }

        public EmployeeBase(Guid id, Guid? identityUserId, string employeeNumber, string jobTitle, DateTime dateOfJoining, decimal paidLeaveBalance, decimal sickLeaveBalance, decimal unpaidLeaveBalance, decimal baseSalary)
        {

            Id = id;
            Check.NotNull(employeeNumber, nameof(employeeNumber));
            Check.Length(employeeNumber, nameof(employeeNumber), EmployeeConsts.EmployeeNumberMaxLength, EmployeeConsts.EmployeeNumberMinLength);
            Check.NotNull(jobTitle, nameof(jobTitle));
            Check.Length(jobTitle, nameof(jobTitle), EmployeeConsts.JobTitleMaxLength, EmployeeConsts.JobTitleMinLength);
            if (paidLeaveBalance < EmployeeConsts.PaidLeaveBalanceMinLength)
            {
                throw new ArgumentOutOfRangeException(nameof(paidLeaveBalance), paidLeaveBalance, "The value of 'paidLeaveBalance' cannot be lower than " + EmployeeConsts.PaidLeaveBalanceMinLength);
            }

            if (paidLeaveBalance > EmployeeConsts.PaidLeaveBalanceMaxLength)
            {
                throw new ArgumentOutOfRangeException(nameof(paidLeaveBalance), paidLeaveBalance, "The value of 'paidLeaveBalance' cannot be greater than " + EmployeeConsts.PaidLeaveBalanceMaxLength);
            }

            if (sickLeaveBalance < EmployeeConsts.SickLeaveBalanceMinLength)
            {
                throw new ArgumentOutOfRangeException(nameof(sickLeaveBalance), sickLeaveBalance, "The value of 'sickLeaveBalance' cannot be lower than " + EmployeeConsts.SickLeaveBalanceMinLength);
            }

            if (sickLeaveBalance > EmployeeConsts.SickLeaveBalanceMaxLength)
            {
                throw new ArgumentOutOfRangeException(nameof(sickLeaveBalance), sickLeaveBalance, "The value of 'sickLeaveBalance' cannot be greater than " + EmployeeConsts.SickLeaveBalanceMaxLength);
            }

            if (unpaidLeaveBalance < EmployeeConsts.UnpaidLeaveBalanceMinLength)
            {
                throw new ArgumentOutOfRangeException(nameof(unpaidLeaveBalance), unpaidLeaveBalance, "The value of 'unpaidLeaveBalance' cannot be lower than " + EmployeeConsts.UnpaidLeaveBalanceMinLength);
            }

            if (unpaidLeaveBalance > EmployeeConsts.UnpaidLeaveBalanceMaxLength)
            {
                throw new ArgumentOutOfRangeException(nameof(unpaidLeaveBalance), unpaidLeaveBalance, "The value of 'unpaidLeaveBalance' cannot be greater than " + EmployeeConsts.UnpaidLeaveBalanceMaxLength);
            }

            if (baseSalary < EmployeeConsts.BaseSalaryMinLength)
            {
                throw new ArgumentOutOfRangeException(nameof(baseSalary), baseSalary, "The value of 'baseSalary' cannot be lower than " + EmployeeConsts.BaseSalaryMinLength);
            }

            if (baseSalary > EmployeeConsts.BaseSalaryMaxLength)
            {
                throw new ArgumentOutOfRangeException(nameof(baseSalary), baseSalary, "The value of 'baseSalary' cannot be greater than " + EmployeeConsts.BaseSalaryMaxLength);
            }

            EmployeeNumber = employeeNumber;
            JobTitle = jobTitle;
            DateOfJoining = dateOfJoining;
            PaidLeaveBalance = paidLeaveBalance;
            SickLeaveBalance = sickLeaveBalance;
            UnpaidLeaveBalance = unpaidLeaveBalance;
            BaseSalary = baseSalary;
            IdentityUserId = identityUserId;
        }

    }
}
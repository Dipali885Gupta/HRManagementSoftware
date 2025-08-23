using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace HRManagementSoftware.Employees
{
    public abstract class EmployeeManagerBase : DomainService
    {
        protected IEmployeeRepository _employeeRepository;

        public EmployeeManagerBase(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public virtual async Task<Employee> CreateAsync(
        Guid? identityUserId, string employeeNumber, string jobTitle, DateTime dateOfJoining, decimal paidLeaveBalance, decimal sickLeaveBalance, decimal unpaidLeaveBalance, decimal baseSalary)
        {
            Check.NotNullOrWhiteSpace(employeeNumber, nameof(employeeNumber));
            Check.Length(employeeNumber, nameof(employeeNumber), EmployeeConsts.EmployeeNumberMaxLength, EmployeeConsts.EmployeeNumberMinLength);
            Check.NotNullOrWhiteSpace(jobTitle, nameof(jobTitle));
            Check.Length(jobTitle, nameof(jobTitle), EmployeeConsts.JobTitleMaxLength, EmployeeConsts.JobTitleMinLength);
            Check.NotNull(dateOfJoining, nameof(dateOfJoining));
            Check.Range(paidLeaveBalance, nameof(paidLeaveBalance), EmployeeConsts.PaidLeaveBalanceMinLength, EmployeeConsts.PaidLeaveBalanceMaxLength);
            Check.Range(sickLeaveBalance, nameof(sickLeaveBalance), EmployeeConsts.SickLeaveBalanceMinLength, EmployeeConsts.SickLeaveBalanceMaxLength);
            Check.Range(unpaidLeaveBalance, nameof(unpaidLeaveBalance), EmployeeConsts.UnpaidLeaveBalanceMinLength, EmployeeConsts.UnpaidLeaveBalanceMaxLength);
            Check.Range(baseSalary, nameof(baseSalary), EmployeeConsts.BaseSalaryMinLength, EmployeeConsts.BaseSalaryMaxLength);

            var employee = new Employee(
             GuidGenerator.Create(),
             identityUserId, employeeNumber, jobTitle, dateOfJoining, paidLeaveBalance, sickLeaveBalance, unpaidLeaveBalance, baseSalary
             );

            return await _employeeRepository.InsertAsync(employee);
        }

        public virtual async Task<Employee> UpdateAsync(
            Guid id,
            Guid? identityUserId, string employeeNumber, string jobTitle, DateTime dateOfJoining, decimal paidLeaveBalance, decimal sickLeaveBalance, decimal unpaidLeaveBalance, decimal baseSalary, [CanBeNull] string? concurrencyStamp = null
        )
        {
            Check.NotNullOrWhiteSpace(employeeNumber, nameof(employeeNumber));
            Check.Length(employeeNumber, nameof(employeeNumber), EmployeeConsts.EmployeeNumberMaxLength, EmployeeConsts.EmployeeNumberMinLength);
            Check.NotNullOrWhiteSpace(jobTitle, nameof(jobTitle));
            Check.Length(jobTitle, nameof(jobTitle), EmployeeConsts.JobTitleMaxLength, EmployeeConsts.JobTitleMinLength);
            Check.NotNull(dateOfJoining, nameof(dateOfJoining));
            Check.Range(paidLeaveBalance, nameof(paidLeaveBalance), EmployeeConsts.PaidLeaveBalanceMinLength, EmployeeConsts.PaidLeaveBalanceMaxLength);
            Check.Range(sickLeaveBalance, nameof(sickLeaveBalance), EmployeeConsts.SickLeaveBalanceMinLength, EmployeeConsts.SickLeaveBalanceMaxLength);
            Check.Range(unpaidLeaveBalance, nameof(unpaidLeaveBalance), EmployeeConsts.UnpaidLeaveBalanceMinLength, EmployeeConsts.UnpaidLeaveBalanceMaxLength);
            Check.Range(baseSalary, nameof(baseSalary), EmployeeConsts.BaseSalaryMinLength, EmployeeConsts.BaseSalaryMaxLength);

            var employee = await _employeeRepository.GetAsync(id);

            employee.IdentityUserId = identityUserId;
            employee.EmployeeNumber = employeeNumber;
            employee.JobTitle = jobTitle;
            employee.DateOfJoining = dateOfJoining;
            employee.PaidLeaveBalance = paidLeaveBalance;
            employee.SickLeaveBalance = sickLeaveBalance;
            employee.UnpaidLeaveBalance = unpaidLeaveBalance;
            employee.BaseSalary = baseSalary;

            employee.SetConcurrencyStampIfNotNull(concurrencyStamp);
            return await _employeeRepository.UpdateAsync(employee);
        }

    }
}
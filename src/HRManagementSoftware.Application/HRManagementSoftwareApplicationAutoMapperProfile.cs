using System;
using HRManagementSoftware.Shared;
using Volo.Abp.Identity;
using HRManagementSoftware.Employees;
using Volo.Abp.AutoMapper;
using AutoMapper;

namespace HRManagementSoftware;

public class HRManagementSoftwareApplicationAutoMapperProfile : Profile
{
    public HRManagementSoftwareApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Employee, EmployeeDto>();
        CreateMap<Employee, EmployeeExcelDto>();
        CreateMap<EmployeeWithNavigationProperties, EmployeeWithNavigationPropertiesDto>();
        CreateMap<IdentityUser, LookupDto<Guid>>().ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.Name));
    }
}
using HRManagementSoftware.PayrollAdjustments;
using HRManagementSoftware.HRManagers;
using HRManagementSoftware.LeaveRequests;
using HRManagementSoftware.Employees;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.LanguageManagement.EntityFrameworkCore;
using Volo.Abp.TextTemplateManagement.EntityFrameworkCore;
using Volo.Saas.EntityFrameworkCore;
using Volo.Saas.Editions;
using Volo.Saas.Tenants;
using Volo.Abp.Gdpr;

namespace HRManagementSoftware.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityProDbContext))]
[ReplaceDbContext(typeof(ISaasDbContext))]
[ConnectionStringName("Default")]
public class HRManagementSoftwareDbContext :
    AbpDbContext<HRManagementSoftwareDbContext>,
    ISaasDbContext,
    IIdentityProDbContext
{
    public DbSet<PayrollAdjustment> PayrollAdjustments { get; set; } = null!;
    public DbSet<HRManager> HRManagers { get; set; } = null!;
    public DbSet<LeaveRequest> LeaveRequests { get; set; } = null!;
    public DbSet<Employee> Employees { get; set; } = null!;
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    #region Entities from the modules

    /* Notice: We only implemented IIdentityProDbContext and ISaasDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityProDbContext and ISaasDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    // Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }

    // SaaS
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<Edition> Editions { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    public HRManagementSoftwareDbContext(DbContextOptions<HRManagementSoftwareDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureFeatureManagement();
        builder.ConfigureIdentityPro();
        builder.ConfigureOpenIddictPro();
        builder.ConfigureLanguageManagement();
        builder.ConfigureSaas();
        builder.ConfigureTextTemplateManagement();
        builder.ConfigureGdpr();
        builder.ConfigureBlobStoring();

        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(HRManagementSoftwareConsts.DbTablePrefix + "YourEntities", HRManagementSoftwareConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});
        if (builder.IsHostDatabase())
        {

        }
        if (builder.IsHostDatabase())
        {
            builder.Entity<Employee>(b =>
            {
                b.ToTable(HRManagementSoftwareConsts.DbTablePrefix + "Employees", HRManagementSoftwareConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.EmployeeNumber).HasColumnName(nameof(Employee.EmployeeNumber)).IsRequired().HasMaxLength(EmployeeConsts.EmployeeNumberMaxLength);
                b.Property(x => x.JobTitle).HasColumnName(nameof(Employee.JobTitle)).IsRequired().HasMaxLength(EmployeeConsts.JobTitleMaxLength);
                b.Property(x => x.DateOfJoining).HasColumnName(nameof(Employee.DateOfJoining));
                b.Property(x => x.PaidLeaveBalance).HasColumnName(nameof(Employee.PaidLeaveBalance)).HasMaxLength((int)EmployeeConsts.PaidLeaveBalanceMaxLength);
                b.Property(x => x.SickLeaveBalance).HasColumnName(nameof(Employee.SickLeaveBalance)).HasMaxLength((int)EmployeeConsts.SickLeaveBalanceMaxLength);
                b.Property(x => x.UnpaidLeaveBalance).HasColumnName(nameof(Employee.UnpaidLeaveBalance)).HasMaxLength((int)EmployeeConsts.UnpaidLeaveBalanceMaxLength);
                b.Property(x => x.BaseSalary).HasColumnName(nameof(Employee.BaseSalary)).HasMaxLength((int)EmployeeConsts.BaseSalaryMaxLength);
                b.HasOne<IdentityUser>().WithMany().HasForeignKey(x => x.IdentityUserId).OnDelete(DeleteBehavior.SetNull);
            });

        }
        if (builder.IsHostDatabase())
        {
            builder.Entity<LeaveRequest>(b =>
            {
                b.ToTable(HRManagementSoftwareConsts.DbTablePrefix + "LeaveRequests", HRManagementSoftwareConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.LeaveType).HasColumnName(nameof(LeaveRequest.LeaveType));
                b.Property(x => x.LeaveStatus).HasColumnName(nameof(LeaveRequest.LeaveStatus));
                b.Property(x => x.StartDate).HasColumnName(nameof(LeaveRequest.StartDate));
                b.Property(x => x.EndDate).HasColumnName(nameof(LeaveRequest.EndDate));
                b.Property(x => x.Reason).HasColumnName(nameof(LeaveRequest.Reason)).IsRequired().HasMaxLength(LeaveRequestConsts.ReasonMaxLength);
                b.Property(x => x.RequestDate).HasColumnName(nameof(LeaveRequest.RequestDate));
                b.HasOne<Employee>().WithMany().HasForeignKey(x => x.EmployeeId).OnDelete(DeleteBehavior.SetNull);
            });

        }
        if (builder.IsHostDatabase())
        {
            builder.Entity<HRManager>(b =>
            {
                b.ToTable(HRManagementSoftwareConsts.DbTablePrefix + "HRManagers", HRManagementSoftwareConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.HRNumber).HasColumnName(nameof(HRManager.HRNumber)).IsRequired().HasMaxLength(HRManagerConsts.HRNumberMaxLength);
                b.Property(x => x.Department).HasColumnName(nameof(HRManager.Department)).IsRequired().HasMaxLength(HRManagerConsts.DepartmentMaxLength);
                b.HasOne<IdentityUser>().WithMany().HasForeignKey(x => x.IdentityUserId).OnDelete(DeleteBehavior.SetNull);
            });

        }
        if (builder.IsHostDatabase())
        {
            builder.Entity<PayrollAdjustment>(b =>
            {
                b.ToTable(HRManagementSoftwareConsts.DbTablePrefix + "PayrollAdjustments", HRManagementSoftwareConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.Month).HasColumnName(nameof(PayrollAdjustment.Month)).HasMaxLength(PayrollAdjustmentConsts.MonthMaxLength);
                b.Property(x => x.Year).HasColumnName(nameof(PayrollAdjustment.Year)).IsRequired().HasMaxLength(PayrollAdjustmentConsts.YearMaxLength);
                b.Property(x => x.Status).HasColumnName(nameof(PayrollAdjustment.Status));
                b.Property(x => x.Netpay).HasColumnName(nameof(PayrollAdjustment.Netpay)).IsRequired().HasMaxLength((int)PayrollAdjustmentConsts.NetpayMaxLength);
                b.HasOne<LeaveRequest>().WithMany().HasForeignKey(x => x.LeaveRequestId).OnDelete(DeleteBehavior.SetNull);
                b.HasOne<Employee>().WithMany().HasForeignKey(x => x.EmployeeId).OnDelete(DeleteBehavior.SetNull);
            });

        }
    }
}
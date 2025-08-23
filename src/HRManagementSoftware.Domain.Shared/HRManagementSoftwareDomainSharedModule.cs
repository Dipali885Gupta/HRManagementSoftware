using HRManagementSoftware.Localization;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Validation.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.VirtualFileSystem;
using Volo.Abp.OpenIddict;
using Volo.Abp.BlobStoring.Database;
using Volo.Abp.LanguageManagement;
using Volo.Abp.TextTemplateManagement;
using Volo.Saas;
using Volo.Abp.Gdpr;
using Volo.Abp.GlobalFeatures;
using Volo.Abp.LeptonXTheme.Management;

namespace HRManagementSoftware;

[DependsOn(
    typeof(AbpAuditLoggingDomainSharedModule),
    typeof(AbpBackgroundJobsDomainSharedModule),
    typeof(AbpFeatureManagementDomainSharedModule),
    typeof(AbpPermissionManagementDomainSharedModule),
    typeof(AbpSettingManagementDomainSharedModule),
    typeof(AbpIdentityProDomainSharedModule),
    typeof(AbpOpenIddictProDomainSharedModule),
    typeof(LanguageManagementDomainSharedModule),
    typeof(SaasDomainSharedModule),
    typeof(TextTemplateManagementDomainSharedModule),
    typeof(AbpGdprDomainSharedModule),
    typeof(AbpGlobalFeaturesModule),
    typeof(LeptonXThemeManagementDomainSharedModule),
    typeof(BlobStoringDatabaseDomainSharedModule)
    )]
public class HRManagementSoftwareDomainSharedModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        HRManagementSoftwareGlobalFeatureConfigurator.Configure();
        HRManagementSoftwareModuleExtensionConfigurator.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<HRManagementSoftwareDomainSharedModule>();
        });

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Add<HRManagementSoftwareResource>("en")
                .AddBaseTypes(typeof(AbpValidationResource))
                .AddVirtualJson("/Localization/HRManagementSoftware");

            options.DefaultResourceType = typeof(HRManagementSoftwareResource);
            
            options.Languages.Add(new LanguageInfo("en", "en", "English")); 
            options.Languages.Add(new LanguageInfo("en-GB", "en-GB", "English (United Kingdom)")); 
            options.Languages.Add(new LanguageInfo("zh-Hans", "zh-Hans", "Chinese (Simplified)")); 
            options.Languages.Add(new LanguageInfo("es", "es", "Spanish")); 
            options.Languages.Add(new LanguageInfo("ar", "ar", "Arabic")); 
            options.Languages.Add(new LanguageInfo("hi", "hi", "Hindi ")); 
            options.Languages.Add(new LanguageInfo("pt-BR", "pt-BR", "Portuguese (Brazil)")); 
            options.Languages.Add(new LanguageInfo("fr", "fr", "French")); 
            options.Languages.Add(new LanguageInfo("ru", "ru", "Russian")); 
            options.Languages.Add(new LanguageInfo("de-DE", "de-DE", "German (Germany)")); 
            options.Languages.Add(new LanguageInfo("tr", "tr", "Turkish")); 
            options.Languages.Add(new LanguageInfo("it", "it", "Italian")); 
            options.Languages.Add(new LanguageInfo("cs", "cs", "Czech")); 
            options.Languages.Add(new LanguageInfo("hu", "hu", "Hungarian")); 
            options.Languages.Add(new LanguageInfo("ro-RO", "ro-RO", "Romanian (Romania)")); 
            options.Languages.Add(new LanguageInfo("sv", "sv", "Swedish")); 
            options.Languages.Add(new LanguageInfo("fi", "fi", "Finnish")); 
            options.Languages.Add(new LanguageInfo("sk", "sk", "Slovak")); 
            options.Languages.Add(new LanguageInfo("is", "is", "Icelandic")); 
            options.Languages.Add(new LanguageInfo("zh-Hant", "zh-Hant", "Chinese (Traditional)")); 

        });
        
        Configure<AbpExceptionLocalizationOptions>(options =>
        {
            options.MapCodeNamespace("HRManagementSoftware", typeof(HRManagementSoftwareResource));
        });
    }
}

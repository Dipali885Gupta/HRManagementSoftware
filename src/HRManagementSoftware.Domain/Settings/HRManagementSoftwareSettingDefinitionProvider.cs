using Volo.Abp.Settings;

namespace HRManagementSoftware.Settings;

public class HRManagementSoftwareSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(HRManagementSoftwareSettings.MySetting1));
    }
}

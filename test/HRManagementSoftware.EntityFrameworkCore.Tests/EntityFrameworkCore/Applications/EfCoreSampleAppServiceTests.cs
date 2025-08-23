using HRManagementSoftware.Samples;
using Xunit;

namespace HRManagementSoftware.EntityFrameworkCore.Applications;

[Collection(HRManagementSoftwareTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<HRManagementSoftwareEntityFrameworkCoreTestModule>
{

}

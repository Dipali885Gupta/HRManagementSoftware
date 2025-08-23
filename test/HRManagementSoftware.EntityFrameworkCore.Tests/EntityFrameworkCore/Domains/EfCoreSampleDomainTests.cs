using HRManagementSoftware.Samples;
using Xunit;

namespace HRManagementSoftware.EntityFrameworkCore.Domains;

[Collection(HRManagementSoftwareTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<HRManagementSoftwareEntityFrameworkCoreTestModule>
{

}

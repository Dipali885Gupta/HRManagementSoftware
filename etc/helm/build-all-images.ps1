./build-image.ps1 -ProjectPath "../../src/HRManagementSoftware.DbMigrator/HRManagementSoftware.DbMigrator.csproj" -ImageName hrmanagementsoftware/dbmigrator
./build-image.ps1 -ProjectPath "../../src/HRManagementSoftware.HttpApi.Host/HRManagementSoftware.HttpApi.Host.csproj" -ImageName hrmanagementsoftware/httpapihost
./build-image.ps1 -ProjectPath "../../angular" -ImageName hrmanagementsoftware/angular -ProjectType "angular"

param (
	$Namespace="hrmanagementsoftware-local",
    $ReleaseName="hrmanagementsoftware-local",
    $User = ""
)

if([string]::IsNullOrEmpty($User) -eq $false)
{
    $Namespace += '-' + $User
    $ReleaseName += '-' + $User
}

helm uninstall ${ReleaseName} --namespace ${Namespace}
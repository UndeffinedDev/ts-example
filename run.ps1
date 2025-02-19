param (
    [string]$tsFile = ".\src\website.ts"
)

cls
npx tsc $tsFile
if ($?) {
    $outputDir = ".\js-compiled"
    
        if (Test-Path $outputDir) {
        Remove-Item -Path $outputDir -Recurse -Force
    }

    New-Item -ItemType Directory -Path $outputDir | Out-Null
    
    $jsFile = $tsFile -replace "\.ts$", ".js"   
    Move-Item -Force $jsFile "$outputDir\"
    
    try {
        node "$outputDir\$(Split-Path -Leaf $jsFile)"
    } finally {
        if (Test-Path $outputDir) {
            Remove-Item -Path $outputDir -Recurse -Force
        }
    }
}

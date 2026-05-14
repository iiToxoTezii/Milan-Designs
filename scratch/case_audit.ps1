$htmlFiles = Get-ChildItem -Filter *.html
$assets = Get-ChildItem -Path "assets" -Recurse | Where-Object { -not $_.PSIsContainer }

$allIssues = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    # Match src="..." or href="..."
    $matches = [regex]::Matches($content, '(src|href)="assets/([^"]+)"')
    
    foreach ($m in $matches) {
        $refPath = "assets/" + $m.Groups[2].Value
        # Split into relative path to check each part
        $parts = $refPath -split '/'
        
        $currentPath = (Get-Item .).FullName
        $isOk = $true
        
        foreach ($part in $parts) {
            $found = Get-ChildItem -Path $currentPath | Where-Object { $_.Name -ceq $part }
            if (-not $found) {
                $actual = Get-ChildItem -Path $currentPath | Where-Object { $_.Name -ieq $part }
                if ($actual) {
                    $allIssues += [PSCustomObject]@{
                        File = $file.Name
                        Reference = $refPath
                        Expected = $part
                        Actual = $actual.Name
                    }
                }
                $isOk = $false
                break
            }
            $currentPath = Join-Path $currentPath $part
        }
    }
}

if ($allIssues.Count -gt 0) {
    $allIssues | Format-Table -AutoSize
} else {
    Write-Host "No case-sensitivity issues found!" -ForegroundColor Green
}

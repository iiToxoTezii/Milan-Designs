$basePath = "c:\Users\milan\OneDrive\Desktop\portfolio\Anti Gravity"
$domain = "https://milanjaindesign.site"

$htmlFiles = Get-ChildItem -Path $basePath -Filter "*.html" | Where-Object { $_.Name -notmatch "^google" -and $_.Name -notmatch "_restored" }

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Define canonical URL
    if ($file.Name -eq "index.html") {
        $canonicalUrl = "$domain/"
    } else {
        $canonicalUrl = "$domain/$($file.Name)"
    }
    
    $canonicalTag = "`n    <link rel=`"canonical`" href=`"$canonicalUrl`" />"
    
    # Check if canonical tag already exists
    if ($content -notmatch "<link[^>]*rel=`"canonical`"[^>]*>") {
        # Insert before </head>
        $content = $content -replace "(?i)</head>", "$canonicalTag`n</head>"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Added canonical to $($file.Name): $canonicalUrl"
    } else {
        Write-Host "Canonical already exists in $($file.Name)"
    }
}

$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Update effects.js with a version number for cache busting
    $content = $content -replace 'assets/js/effects\.js', 'assets/js/effects.js?v=2.0.1'
    # Update style.css with a version number for cache busting
    $content = $content -replace 'assets/css/style\.css', 'assets/css/style.css?v=2.0.1'
    
    Set-Content $file.FullName $content
    Write-Host "Applied cache busting to $($file.Name)"
}

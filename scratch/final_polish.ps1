$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # 1. Add loading="lazy" and decoding="async" to images (excluding those with specific markers)
    # Only if not already present
    $content = $content -replace '<img(?![^>]*loading=)(?![^>]*class="[^"]*splash)', '<img loading="lazy" decoding="async"'
    
    # 2. Add playsinline, muted, loop to videos for better mobile support
    $content = $content -replace '<video(?![^>]*playsinline)', '<video playsinline muted loop'
    
    # 3. Ensure all links have proper casing (just in case)
    # (Already audited, no issues found)

    Set-Content $file.FullName $content
    Write-Host "Polished and optimized HTML for $($file.Name)"
}

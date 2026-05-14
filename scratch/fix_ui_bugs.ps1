$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix the broken sound-toggle tag
    # Looking for: <div class="status-item achievements-trigger" ...> ... </div>\n     id="sound-toggle">
    # Note: The whitespace might vary
    $content = $content -replace 'id="sound-toggle">', '<div class="status-item sound-toggle" id="sound-toggle">'
    
    # Ensure achievements-list has lenis-prevent
    $content = $content -replace 'id="achievements-list" class="achievements-list"', 'id="achievements-list" class="achievements-list" data-lenis-prevent'
    
    Set-Content $file.FullName $content
    Write-Host "Fixed status bar and scrolling for $($file.Name)"
}

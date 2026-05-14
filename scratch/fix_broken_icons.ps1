$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove the broken icon before Back to Home
    $content = $content -replace '&larr;\?', '&larr;'
    $content = $content -replace '←\?', '←'
    
    # Also check for any other strange characters before Back to Home
    $content = $content -replace '<span>&larr;\?</span>', '<span>&larr;</span>'

    Set-Content $file.FullName $content
    Write-Host "Cleaned up Back to Home link in $($file.Name)"
}

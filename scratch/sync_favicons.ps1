$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse
$faviconTags = @"
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
  <link rel="apple-touch-icon" href="assets/images/favicon.png">
  <link rel="shortcut icon" href="assets/images/favicon.png">
"@

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if favicon already exists (to avoid duplicates)
    if ($content -notmatch 'rel="apple-touch-icon"') {
        # Inject before </head>
        $content = $content -replace '</head>', "$faviconTags`n</head>"
        Set-Content $file.FullName $content
        Write-Host "Updated favicon in $($file.Name)"
    } else {
        # If it exists but might be old, replace the whole block
        # (This is a simplified check)
        Write-Host "Favicon already seems set in $($file.Name)"
    }
}
Write-Host "Favicon sync complete for all pages."

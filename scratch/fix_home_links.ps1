$content = Get-Content index.html -Raw

# Add project-disclaimer-trigger class to all "Open Project" links that point to project pages
# We look for <a href="moonmist.html" class="btn btn-premium"> and similar
$content = $content -replace '(<a href="(moonmist\.html|project\d+\.html)" class="btn btn-premium)', '$1 project-disclaimer-trigger'

Set-Content index.html $content
Write-Host "Updated project links in index.html with disclaimer trigger."

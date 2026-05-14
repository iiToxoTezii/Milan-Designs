$content = Get-Content index.html -Raw

# Match any link to project pages and add the class if missing
# We look for <a href="..." and check if it has the class
$regex = [regex]'(<a\s+[^>]*?href="(moonmist\.html|projects\.html|project\d+\.html)"[^>]*?class=")([^"]+)"'
$content = $regex.Replace($content, {
    param($m)
    $prefix = $m.Groups[1].Value
    $classes = $m.Groups[3].Value
    if ($classes -notmatch "project-disclaimer-trigger") {
        return "$prefix$classes project-disclaimer-trigger`""
    }
    return $m.Value
})

Set-Content index.html $content
Write-Host "Re-standardized disclaimer triggers in index.html."

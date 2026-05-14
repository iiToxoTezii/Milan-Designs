$files = @(
    "moonmist.html",
    "project10.html",
    "project2.html",
    "project3.html",
    "project4.html",
    "project5.html",
    "project6.html",
    "project7.html",
    "project8.html",
    "project9.html",
    "projects.html"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    # Remove the first occurrence of the particles/effects scripts
    # We look for the one that is NOT at the end of the file (before the system status bar)
    # Actually, let's just remove the first pair and keep the last pair.
    
    $regex = [regex]'(?s)<script src="assets/js/particles.js"></script>\s*<script src="assets/js/effects.js"></script>'
    $matches = $regex.Matches($content)
    if ($matches.Count -gt 1) {
        Write-Host "Fixing $file..."
        # Replace only the first match
        $newContent = $regex.Replace($content, "", 1)
        Set-Content $file $newContent
    }
}

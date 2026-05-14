$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    $achievementPopup = @"
  <!-- ACHIEVEMENT NOTIFICATION -->
  <div id="achievement-popup" class="achievement-container">
    <div class="achievement-icon">&starf;</div>
    <div class="achievement-text">
      <h4 id="achievement-title">ACHIEVEMENT UNLOCKED</h4>
      <p id="achievement-desc">You've discovered a secret.</p>
    </div>
  </div>
"@

    # Regex to find any variation of the achievement popup
    $regex = [regex]'(?s)<!-- ACHIEVEMENT NOTIFICATION -->.*?</div>\s*</div>'
    
    if ($content -match $regex) {
        Write-Host "Standardizing achievement popup in $($file.Name)..."
        $content = $regex.Replace($content, $achievementPopup)
        Set-Content $file.FullName $content
    } else {
        # If it doesn't exist, we should probably add it before the status bar
        if ($content -match '<!-- SYSTEM STATUS BAR -->') {
            Write-Host "Adding achievement popup to $($file.Name)..."
            $content = $content.Replace('<!-- SYSTEM STATUS BAR -->', "$achievementPopup`n`n  <!-- SYSTEM STATUS BAR -->")
            Set-Content $file.FullName $content
        }
    }
}

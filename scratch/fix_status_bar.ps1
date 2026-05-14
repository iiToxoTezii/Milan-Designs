$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    $newStatusBar = @"
  <!-- SYSTEM STATUS BAR -->
  <div class="system-status-bar">
    <div class="status-item">
      <div class="status-dot"></div>
      <span id="status-text">SYSTEM: OPTIMAL</span>
    </div>
    <div class="status-item sound-toggle" id="sound-toggle">
      <span>SOUND: OFF</span>
    </div>
    <div class="status-item">
      <span>LATENCY: 14MS</span>
      <span id="live-clock" style="margin-left: 20px;">00:00:00</span>
    </div>
  </div>
"@

    # Match from the comment until the end of the system-status-bar div
    # We look for the start comment, and then the first occurrence of <div class="system-status-bar">
    # and then we count closing divs or just match until we see the next meaningful tag (script or body)
    
    $regex = [regex]'(?s)<!-- SYSTEM STATUS BAR -->.*?<div class="system-status-bar">.*?</div>\s*</div>\s*</div>'
    # Wait, the number of divs varies. 
    # Let's just match everything between the comment and the next element or end of file.
    # Actually, let's use a simpler marker. Every status bar ends before particles.js or </body>.
    
    $regex = [regex]'(?s)<!-- SYSTEM STATUS BAR -->.*?(?=<script src="assets/js/particles.js"|</body>)'

    if ($content -match $regex) {
        Write-Host "Fixing status bar in $($file.Name)..."
        $content = $regex.Replace($content, $newStatusBar + "`n`n  ")
        Set-Content $file.FullName $content
    }
}

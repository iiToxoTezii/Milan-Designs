$files = Get-ChildItem -Filter *.html

$modalHtml = @"
  <!-- ACHIEVEMENTS MODAL -->
  <div id="achievements-modal" class="achievements-modal-overlay">
    <div class="achievements-modal">
      <button class="close-achievements" id="close-achievements">&times;</button>
      <div class="achievements-header">
        <div class="achievements-title">
          <span>🏆</span> MISSION LOG
        </div>
        <p class="achievements-desc">
          These achievements are earned by exploring and scrolling through the website. Unlock all milestones to complete the Milan Protocol.
        </p>
      </div>

      <div class="progress-container">
        <div id="achievement-progress" class="progress-bar"></div>
      </div>

      <div id="achievements-list" class="achievements-list">
        <!-- Dynamically filled -->
      </div>
    </div>
  </div>

  <!-- CONGRATULATIONS POPUP -->
  <div id="congrats-popup" class="congrats-popup">
    <span class="congrats-icon">🎖️</span>
    <h2>MISSION COMPLETE</h2>
    <p>You have successfully decoded every visual system in the Anti Gravity archives.</p>
    <button class="btn btn-primary" onclick="this.parentElement.classList.remove('active')">DISMISS</button>
  </div>
"@

$statusUpdate = @"
    <div class="status-item achievements-trigger" style="cursor: pointer; color: #7cecff;">
      <span style="margin-right: 8px;">🏆</span>
      <span id="achievement-count">0/10</span>
    </div>
"@

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Inject Modal HTML before </body>
    if ($content -notmatch "achievements-modal") {
        $content = $content -replace '</body>', "$modalHtml`n</body>"
    }
    
    # Add Achievement Trigger to Status Bar
    if ($content -notmatch "achievements-trigger") {
        $content = $content -replace '(<div class="status-item sound-toggle")', "$statusUpdate`n    $1"
    }

    Set-Content $file.FullName $content
    Write-Host "Injected Achievement System into $($file.Name)"
}

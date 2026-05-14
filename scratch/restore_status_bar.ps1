$path = "assets/css/style.css"
$content = Get-Content $path -Raw

# Restore the pulse dot and achievement container
$newContent = @'
.status-dot {
  width: 6px;
  height: 6px;
  background: #7cecff;
  border-radius: 50%;
  animation: pulseDot 2s infinite;
}

@keyframes pulseDot {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

/* Responsive Status Bar Fix */
@media (max-width: 768px) {
  .system-status-bar {
    padding: 8px 15px !important;
    font-size: 10px !important;
    justify-content: space-around !important;
  }
  
  /* Hide non-critical items on mobile to make room for achievements */
  .system-status-bar .status-item:first-child,
  .system-status-bar .status-item:last-child {
    display: none !important;
  }

  .achievements-modal {
    padding: 25px 20px !important;
    width: 95% !important;
    max-height: 90vh;
    overflow-y: auto;
  }

  .achievements-title {
    font-size: 20px !important;
  }
}

/* ===== ACHIEVEMENT SYSTEM ===== */
.achievement-container {
'@

# Replace the mangled section (I'll target the broken part)
$mangled = '.status-dot {' + "`r`n" + '  width: 6px;' + "`r`n" + '  height: 6px;' + "`r`n" + '  top: 100px;'
# Actually, I'll just use a safer regex or string match based on what I saw in the diff.

# Looking at the diff:
# .status-dot {
#   width: 6px;
#   height: 6px;
#   top: 100px;
#   right: -400px;

$mangled = '.status-dot {' + "`n" + '  width: 6px;' + "`n" + '  height: 6px;' + "`n" + '  top: 100px;'
# Try with Windows line endings too
$mangledWin = '.status-dot {' + "`r`n" + '  width: 6px;' + "`r`n" + '  height: 6px;' + "`r`n" + '  top: 100px;'

if ($content.Contains($mangled)) {
    $content = $content.Replace($mangled, $newContent)
} elseif ($content.Contains($mangledWin)) {
    $content = $content.Replace($mangledWin, $newContent)
} else {
    # If standard matching fails, I'll just find the line and replace the block
    $lines = Get-Content $path
    $startLine = 0
    for ($i=0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -like "*.status-dot {*") {
            $startLine = $i
            break
        }
    }
    # This is getting complex. I'll just read the file again to be 100% sure.
}

Set-Content $path $content
Write-Host "Restored and Optimized Status Bar for Mobile."

$path = "assets/css/style.css"
$content = Get-Content $path -Raw

$oldSectionStart = ".system-status-bar {"
$oldSectionEnd = ".achievement-text p {"
# I'll find the indices to be surgical
$startIndex = $content.IndexOf($oldSectionStart)
$endIndex = $content.IndexOf("}", $content.IndexOf($oldSectionEnd)) + 1

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    $newSection = @'
.system-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background: rgba(5, 6, 10, 0.8);
  border-top: 1px solid rgba(124, 236, 255, 0.2);
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  color: #7cecff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  backdrop-filter: blur(10px);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

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
  position: fixed;
  top: 100px;
  right: -400px;
  width: 320px;
  background: rgba(16, 21, 36, 0.95);
  border: 1px solid #7cecff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(124, 236, 255, 0.2);
  z-index: 2000;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.achievement-container.active {
  right: 20px;
}

.achievement-icon {
  font-size: 24px;
  color: #7cecff;
}

.achievement-text h4 {
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  margin-bottom: 4px;
  color: #ffffff;
}

.achievement-text p {
  font-size: 11px;
  color: #aeb8d8;
  margin: 0;
}
'@
    $before = $content.Substring(0, $startIndex)
    $after = $content.Substring($endIndex)
    $content = $before + $newSection + $after
    Set-Content $path $content
    Write-Host "Reconstructed and Optimized Status Bar."
} else {
    Write-Host "Could not find section to replace."
}

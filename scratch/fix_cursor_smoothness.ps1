$path = "assets/css/style.css"
$content = Get-Content $path -Raw

$old = @'
.cursor-dot, .cursor-outline {
  will-change: transform, opacity;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  
  border-radius: 50%;
  z-index: 999999;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: #7cecff;
}

.cursor-outline {
  width: 40px;
  height: 40px;
  border: 2px solid #7cecff;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;
}
'@

$new = @'
.cursor-dot, .cursor-outline {
  will-change: transform;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  z-index: 999999;
  /* Only transition opacity (transform is handled by JS for buttery smoothness) */
  transition: opacity 0.3s ease;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: #7cecff;
  box-shadow: 0 0 10px rgba(124, 236, 255, 0.5);
}

.cursor-outline {
  width: 40px;
  height: 40px;
  border: 1.5px solid rgba(124, 236, 255, 0.4);
}
'@

$content = $content.Replace($old, $new)
Set-Content $path $content
Write-Host "Fixed cursor CSS for buttery smoothness."

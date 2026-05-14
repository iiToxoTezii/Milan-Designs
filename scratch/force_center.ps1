$path = "assets/css/style.css"
$content = Get-Content $path -Raw

$old = @'
#splash-screen {
  position: fixed;
  inset: 0;
  background: #05060a;
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1.2s cubic-bezier(0.77, 0, 0.175, 1);
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
'@

$new = @'
#splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #05060a;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1.2s cubic-bezier(0.77, 0, 0.175, 1);
  overflow: hidden;
}

.splash-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 600px;
  z-index: 2;
}
'@

$content = $content.Replace($old, $new)
Set-Content $path $content
Write-Host "Forced splash centering in style.css"

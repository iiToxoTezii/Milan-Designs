$path = "assets/css/style.css"
$content = Get-Content $path -Raw

$old = @'
#splash-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(5, 6, 10, 0.9);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  transition: opacity 0.8s ease, visibility 0.8s;
}

.splash-content {
  text-align: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
'@

$new = @'
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

$content = $content.Replace($old, $new)
Set-Content $path $content
Write-Host "Fixed splash centering in style.css"

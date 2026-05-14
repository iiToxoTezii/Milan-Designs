$path = "assets/css/style.css"
$content = Get-Content $path -Raw

# 1. Remove the old splash-logo text styles
$oldSplash = @'
.splash-logo {
  font-family: 'Orbitron', sans-serif;
  font-size: 64px;
  font-weight: 800;
  letter-spacing: 12px;
  color: #ffffff;
  margin-bottom: 40px;
  text-shadow: 0 0 30px rgba(124, 236, 255, 0.6);
  animation: logoPulse 2s ease-in-out infinite;
}

@keyframes logoPulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
'@
$content = $content.Replace($oldSplash, "")

# 2. Fix the accidentally joined block around 1906
$badBlock = @'
.achievements-title.splash-logo-container {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
}
'@
$goodBlock = @'
.splash-logo-container {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
}
'@
$content = $content.Replace($badBlock, $goodBlock)

# 3. Ensure the achievements title is clean
$content = $content.Replace('.achievements-header {
  margin-bottom: 30px;
}

.splash-logo-container {', '.achievements-header {
  margin-bottom: 30px;
}

.splash-logo-container {')

Set-Content $path $content
Write-Host "Cleaned up and fixed style.css for the creative logo."

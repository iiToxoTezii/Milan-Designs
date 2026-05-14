$path = "assets/css/style.css"
$content = Get-Content $path -Raw

$old = @'
.back {
  display: inline-block;
  margin-bottom: 40px;
  text-decoration: none;
  color: #aeb8d8;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 12px;
  transition: 0.3s ease;
}

.back:hover {
  color: #ffffff;
  transform: translate3d(-5px, 0, 0);
}
'@

$new = @'
.back {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
  text-decoration: none;
  color: #aeb8d8;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 12px;
  transition: 0.3s ease;
  font-family: 'Orbitron', sans-serif;
}

.back::before {
  content: '';
  width: 28px;
  height: 28px;
  border: 1px solid rgba(124, 236, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: rgba(124, 236, 255, 0.05);
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.back::after {
  content: '';
  position: absolute;
  left: 12px;
  width: 4px;
  height: 4px;
  background: #7cecff;
  border-radius: 50%;
  box-shadow: 0 0 10px #7cecff;
  pointer-events: none;
}

.back:hover {
  color: #7cecff;
}

.back:hover::before {
  border-color: #7cecff;
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(124, 236, 255, 0.2);
}
'@

$content = $content.Replace($old, $new)
Set-Content $path $content
Write-Host "Updated .back style in style.css"

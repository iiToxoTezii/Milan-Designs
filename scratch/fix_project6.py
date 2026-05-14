
import os

file_path = r'c:\Users\milan\OneDrive\Desktop\portfolio\Anti Gravity\project6.html'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Fix preview video
content = content.replace('src="assets/videos/Short Informative.mp4"', 'src="assets/videos/short-infomative.mp4"')
# Fix modal video
content = content.replace('src="assets/videos/Informative Animatied video.mp4"', 'src="assets/videos/infomative-animatied-video.mp4"')
# Fix closing X if corrupted
content = content.replace('onclick="closeModal()">o </div>', 'onclick="closeModal()">&times;</div>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated successfully.")

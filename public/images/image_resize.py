from PIL import Image
import os

folder = r"public\images\photos"
MAX_SIZE = int(1.5 * 1048576)
MAX_PIXELS = 10000000

for image_file in os.listdir(folder):
    if not image_file.lower().endswith(".jpg"):
        continue
    file_path = os.path.join(folder, image_file)

    # Skip if the file is less than or equal to 1.5MB
    if os.path.getsize(file_path) <= MAX_SIZE:
        continue

    # compress if the file is larger than 10 million pixels
    with Image.open(file_path) as img:
        resized = False
        while img.size[0] * img.size[1] > MAX_PIXELS:
            new_size = (int(img.size[0] * 0.8), int(img.size[1] * 0.8))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
            resized = True
            print(f"Resized {image_file} to {new_size} pixels")
        if resized:
            img.save(file_path, quality=95)

    # check if the file is still larger than 1.5MB
    if os.path.getsize(file_path) <= MAX_SIZE:
        continue

    # compress the file to <= 1.5MB
    with Image.open(file_path) as img:
        quality = 95
        temp_path = os.path.join(folder, "temp_" + image_file)
        while True:
            img.save(temp_path, quality=quality)
            if os.path.getsize(temp_path) <= MAX_SIZE or quality <= 20:
                break
            quality -= 5
        os.replace(temp_path, file_path)
        print(f"Compressed {image_file} to <= 1.5MB (quality={quality})")

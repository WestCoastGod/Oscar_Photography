import rasterio

with rasterio.open(r"C:\Users\cxoox\Downloads\world2024B.png") as src:
    arr = src.read(1)
    print("min:", arr.min(), "max:", arr.max(), "unique:", set(arr.flatten()))

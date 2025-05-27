import rasterio
from rasterio.warp import reproject, Resampling

# 输入输出路径
input_path = r"C:\Users\cxoox\Downloads\VNL_npp_2024_global_vcmslcfg_v2_c202502261200.average_masked.dat.tif\VNL_npp_2024_global_vcmslcfg_v2_c202502261200.average_masked.dat.tif"
output_path = r"C:\Users\cxoox\Desktop\hk_lightpollution.tif"

# 裁剪范围 (minX, minY, maxX, maxY)
bbox = (113.5, 21.95, 114.69, 22.75)

with rasterio.open(input_path) as src:
    # 裁剪
    window = rasterio.windows.from_bounds(*bbox, transform=src.transform)
    data = src.read(1, window=window)

    # 更新元数据
    profile = src.profile
    profile.update(
        {
            "height": window.height,
            "width": window.width,
            "transform": rasterio.windows.transform(window, src.transform),
        }
    )

    # 保存
    with rasterio.open(output_path, "w", **profile) as dst:
        dst.write(data, 1)

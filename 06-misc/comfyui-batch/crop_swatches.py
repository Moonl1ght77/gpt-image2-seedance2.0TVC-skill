"""
从色卡实拍图中裁剪出每个色号的单独色块，作为 GPT-Image-2 的颜色参考图(image2)
用法:
  py -3 crop_swatches.py           # 裁剪并保存
  py -3 crop_swatches.py --verify  # 生成标注图用于验证位置
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

BASE = r"E:\微信小程序开发总文件\02-assets\client-jiajufu\乐顺小程序"
OUTPUT = r"D:\谷歌下载\ComfyUI_windows_portable\ComfyUI\input\swatches"
VERIFY_DIR = os.path.join(os.path.dirname(__file__), "verify")

# 裁剪尺寸（从色块中心取这么大的区域）
CROP_SIZE = 300

# ============================================================
# 每个面料色卡的色块位置 (center_x, center_y)
# 坐标基于原图尺寸 (~4032×3024 或 3024×4032)
# ============================================================

# 3092# 云皱棉 (4032×3024 横向)
# 右侧 3列×3行: 行1=[03,06,09] 行2=[02,05,08] 行3=[01,04,07]
COORDS_3092 = {
    "01": (2650, 2100), "02": (2650, 1350), "03": (2650, 650),
    "04": (3200, 2100), "05": (3200, 1350), "06": (3200, 650),
    "07": (3700, 2100), "08": (3700, 1350), "09": (3700, 650),
}

# 3100# 菱朵棉 (4032×3024 横向) — 同 3092 布局
COORDS_3100 = {
    "01": (2650, 2100), "02": (2650, 1350), "03": (2650, 650),
    "04": (3200, 2100), "05": (3200, 1350), "06": (3200, 650),
    "07": (3700, 2100),
}

# 6049# 蝴蝶园林 (3024×4032 竖向)
# 下半部分 3列×2行: 行1=[01,02,03] 行2=[04,05,06]
COORDS_6049 = {
    "01": (650, 2800),  "02": (1400, 2800), "03": (2200, 2800),
    "04": (650, 3500),  "05": (1400, 3500),
}

# 6467# 幸运叶语 (4032×3024 横向)
# 左下 2行×3列: 行1=[01,02,03] 行2=[04,05,06]
# 右侧 多行×3列: 行1=[07,08,09] 行2=[10,11,12] 行3=[13,14,15] ...
COORDS_6467 = {
    "01": (400, 2300),  "02": (950, 2300),  "03": (1500, 2300),
    "04": (400, 2800),  "05": (950, 2800),  "06": (1500, 2800),
    "07": (2400, 350),  "08": (2950, 350),  "09": (3500, 350),
    "10": (2400, 850),  "11": (2950, 850),  "12": (3500, 850),
    "13": (2400, 1350), "14": (2950, 1350), "15": (3500, 1350),
}

# 8416# 兰精莫代尔 (4030×3022 横向)
# 左下 2行×3列: 行1=[01,02,03] 行2=[04,05,06]
# 右侧 多行×3列: 行1=[07,08,09] 行2=[10,11,12] ...
COORDS_8416 = {
    "01": (400, 2150),  "02": (950, 2150),  "03": (1450, 2150),
    "04": (400, 2650),  "05": (950, 2650),  "06": (1450, 2650),
    "07": (2400, 280),  "08": (2950, 280),  "09": (3500, 280),
    "10": (2400, 780),  "11": (2950, 780),  "12": (3500, 780),
    "13": (2400, 1300), "14": (2950, 1300), "15": (3500, 1300),
    "16": (2400, 1800), "17": (2950, 1800), "18": (3500, 1800),
    "19": (2400, 2300), "20": (2950, 2300),
}

ALL_CARDS = {
    "3092": ("3092# 云皱棉", COORDS_3092),
    "3100": ("3100#菱朵棉", COORDS_3100),
    "6049": ("6049#蝴蝶园林", COORDS_6049),
    "6467": ("6467#幸运叶语", COORDS_6467),
    "8416": ("8416#兰精莫代尔2x2罗纹", COORDS_8416),
}


def crop_swatch(img, cx, cy, size=CROP_SIZE):
    """从中心点裁剪正方形区域"""
    half = size // 2
    x1 = max(0, cx - half)
    y1 = max(0, cy - half)
    x2 = min(img.width, cx + half)
    y2 = min(img.height, cy + half)
    return img.crop((x1, y1, x2, y2))


def run_crop():
    """裁剪所有色块并保存"""
    os.makedirs(OUTPUT, exist_ok=True)
    total = 0

    for fid, (dirname, coords) in ALL_CARDS.items():
        path = os.path.join(BASE, dirname, "面料色卡图.jpg")
        img = Image.open(path)
        print(f"\n{fid} ({img.size[0]}×{img.size[1]}): {len(coords)} 个色号")

        for color_num, (cx, cy) in sorted(coords.items()):
            swatch = crop_swatch(img, cx, cy)
            out_name = f"{fid}-swatch-{color_num}.jpg"
            out_path = os.path.join(OUTPUT, out_name)
            swatch.save(out_path, quality=95)
            print(f"  ✅ {color_num} → {out_name} ({swatch.size[0]}×{swatch.size[1]})")
            total += 1

    print(f"\n{'='*50}")
    print(f"共裁剪 {total} 个色块 → {OUTPUT}")


def run_verify():
    """生成标注图，在原图上画出裁剪区域用于验证"""
    os.makedirs(VERIFY_DIR, exist_ok=True)

    for fid, (dirname, coords) in ALL_CARDS.items():
        path = os.path.join(BASE, dirname, "面料色卡图.jpg")
        img = Image.open(path)
        draw = ImageDraw.Draw(img)
        half = CROP_SIZE // 2

        for color_num, (cx, cy) in coords.items():
            x1, y1 = cx - half, cy - half
            x2, y2 = cx + half, cy + half
            # 画红色矩形框
            draw.rectangle([x1, y1, x2, y2], outline="red", width=8)
            # 标注色号
            draw.text((x1 + 10, y1 + 10), color_num, fill="red")

        # 保存缩小版用于查看
        scale = 0.5
        small = img.resize((int(img.width * scale), int(img.height * scale)))
        out_path = os.path.join(VERIFY_DIR, f"{fid}-verify.jpg")
        small.save(out_path, quality=90)
        print(f"✅ {fid} 标注图 → {out_path}")

    print(f"\n请检查 {VERIFY_DIR} 目录下的标注图，确认红框位置正确")


if __name__ == "__main__":
    if "--verify" in sys.argv:
        run_verify()
    else:
        run_verify()  # 先生成验证图
        print()
        run_crop()    # 再裁剪

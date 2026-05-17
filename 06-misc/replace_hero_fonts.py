#!/usr/bin/env python3
"""
首页Hero图字体替换脚本 v2
将hero图上的文字字体替换为logo图的字体风格

Logo字体特征:
- 中文"乐顺科纺": 等线粗体 (现代无衬线)
- 英文"LESHUN"/"TEXTILE": 等线Light (纤细无衬线)

处理流程:
1. 从每张hero图的右侧无文字区域采样渐变背景
2. 用采样到的颜色覆盖旧文字区域
3. 用logo风格字体重新渲染文字
"""

import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ============================================================
# 配置
# ============================================================
FONT_DIR = r"C:\Windows\Fonts"
HERO_DIR = r"e:\微信小程序开发总文件\03-code\client-jiajufu\assets\hero"
OUTPUT_DIR = r"e:\微信小程序开发总文件\06-misc\hero_output"

# 字体路径
FONT_CN_BOLD = os.path.join(FONT_DIR, "Dengb.ttf")    # 等线粗体 - 中文标题
FONT_CN_REGULAR = os.path.join(FONT_DIR, "Deng.ttf")   # 等线 - 中文副标题
FONT_EN_LIGHT = os.path.join(FONT_DIR, "Dengl.ttf")    # 等线Light - 英文

# 首页图文字配置
HERO_CONFIG = {
    "mote": {
        "title_cn": "舒适，不止于面料",
        "brand_cn": "乐顺科纺",
        "brand_en": "LESHUN TEXTILE",
        "file": "mote.jpg",
    },
    "gongchang": {
        "title_cn": "匠心织造 品质为先",
        "brand_cn": "乐顺科纺",
        "brand_en": "LESHUN TEXTILE",
        "file": "gongchang.jpg",
    },
    "mianliao": {
        "title_cn": "甄选全球优质纤维",
        "brand_cn": "乐顺科纺",
        "brand_en": "LESHUN TEXTILE",
        "file": "mianliao.jpg",
    },
    "pinpai": {
        "title_cn": "甄选全球优质纤维，只为织就非凡舒适",
        "brand_cn": "乐顺科纺",
        "brand_en": "LESHUN TEXTILE",
        "file": "pinpai.jpg",
    },
}

os.makedirs(OUTPUT_DIR, exist_ok=True)


def erase_text_by_gradient_sampling(img, y_start_ratio=0.55):
    """
    在图片底部绘制半透明渐变遮罩来覆盖旧文字。
    从透明渐变到半透明黑色，模拟CSS渐变遮罩效果。
    """
    w, h = img.size
    start_y = int(h * y_start_ratio)
    
    # 创建RGBA遮罩层
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    for y in range(start_y, h):
        # 从顶部的透明到底部的较不透明
        progress = (y - start_y) / (h - start_y)
        # 渐变：从alpha=0到alpha=250（完全覆盖旧文字）
        alpha = int(progress * progress * 250)  # 二次曲线使渐变更自然
        draw.line([(0, y), (w, y)], fill=(12, 12, 12, alpha))
    
    # 合成遮罩到原图
    img_rgba = img.convert("RGBA")
    img_rgba = Image.alpha_composite(img_rgba, overlay)
    return img_rgba.convert("RGB")


def process_hero_image(name, config):
    """处理单张hero图"""
    print(f"\n处理: {name} - {config['title_cn']}")
    
    img_path = os.path.join(HERO_DIR, config["file"])
    img = Image.open(img_path).convert("RGB")
    w, h = img.size
    print(f"  原图尺寸: {w}x{h}")
    
    # 第1步：绘制渐变遮罩覆盖旧文字
    # pinpai图文字区域更大，需要从更高的位置开始遮罩
    y_ratio = 0.42 if name == "pinpai" else 0.52
    img = erase_text_by_gradient_sampling(img, y_start_ratio=y_ratio)
    
    # 第2步：轻微模糊遮罩区域，使过渡更自然
    start_y = int(h * y_ratio)
    crop_region = (0, start_y, w, h)
    crop = img.crop(crop_region)
    crop_blurred = crop.filter(ImageFilter.GaussianBlur(radius=2))
    img.paste(crop_blurred, (0, start_y))
    
    # 第4步：用logo字体重新渲染文字
    txt_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    txt_draw = ImageDraw.Draw(txt_layer)
    
    # 加载字体
    font_title = ImageFont.truetype(FONT_CN_BOLD, 46)
    font_brand_cn = ImageFont.truetype(FONT_CN_BOLD, 28)
    font_brand_en = ImageFont.truetype(FONT_EN_LIGHT, 18)
    
    # pinpai图文字多，字号缩小
    if name == "pinpai":
        font_title = ImageFont.truetype(FONT_CN_BOLD, 38)
    
    # ---- 布局计算 ----
    # 品牌行：乐顺科纺 / LESHUN TEXTILE
    cn_bbox = txt_draw.textbbox((0, 0), config["brand_cn"], font=font_brand_cn)
    sep_bbox = txt_draw.textbbox((0, 0), "  /  ", font=font_brand_cn)
    en_bbox = txt_draw.textbbox((0, 0), config["brand_en"], font=font_brand_en)
    
    cn_w = cn_bbox[2] - cn_bbox[0]
    sep_w = sep_bbox[2] - sep_bbox[0]
    en_w = en_bbox[2] - en_bbox[0]
    total_brand_w = cn_w + sep_w + en_w
    
    brand_x = (w - total_brand_w) // 2
    brand_y = h - 70  # 品牌行距底部70px
    
    # 标题行
    title_bbox = txt_draw.textbbox((0, 0), config["title_cn"], font=font_title)
    title_w = title_bbox[2] - title_bbox[0]
    title_h = title_bbox[3] - title_bbox[1]
    title_x = (w - title_w) // 2
    title_y = brand_y - 50 - title_h  # 标题在品牌行上方50px
    
    # ---- 绘制文字 ----
    # 标题（白色，带轻微阴影）
    shadow = (0, 0, 0, 80)
    txt_draw.text((title_x + 2, title_y + 2), config["title_cn"], font=font_title, fill=shadow)
    txt_draw.text((title_x, title_y), config["title_cn"], font=font_title, fill=(255, 255, 255, 245))
    
    # 品牌行
    cx = brand_x
    txt_draw.text((cx, brand_y), config["brand_cn"], font=font_brand_cn, fill=(255, 255, 255, 200))
    cx += cn_w
    txt_draw.text((cx, brand_y), "  /  ", font=font_brand_cn, fill=(255, 255, 255, 120))
    cx += sep_w
    txt_draw.text((cx, brand_y + 3), config["brand_en"], font=font_brand_en, fill=(255, 255, 255, 160))
    
    # 合并
    img_rgba = img.convert("RGBA")
    img_rgba = Image.alpha_composite(img_rgba, txt_layer)
    
    # 保存
    output_path = os.path.join(OUTPUT_DIR, config["file"])
    img_rgba.convert("RGB").save(output_path, quality=95)
    print(f"  已保存: {output_path}")
    return output_path


def main():
    print("=" * 60)
    print("首页Hero图字体替换工具 v2")
    print("字体: 等线粗体(中文) + 等线Light(英文)")
    print("=" * 60)
    
    for name, config in HERO_CONFIG.items():
        try:
            process_hero_image(name, config)
        except Exception as e:
            print(f"  错误: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n输出目录: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

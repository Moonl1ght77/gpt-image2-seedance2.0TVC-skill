"""
面料换色批量脚本 — 基于用户验证过的换色工作流
核心逻辑：
  image1 = 面料实拍细节图（纹理+构图来源）
  image2 = 从色卡裁剪的色块（颜色来源）
  提示词 = 纯换色指令，不改纹理不改构图
"""
import json
import copy
import random
import csv
import time
import argparse
import os

COMFYUI_URL = "http://127.0.0.1:8188"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKFLOW_PATH = os.path.join(SCRIPT_DIR, "workflow-recolor-api.json")
CSV_PATH = os.path.join(SCRIPT_DIR, "fabric-tasks.csv")

# 换色提示词模板（按面料区分，image1/image2=细节图，image3=色块颜色源）
RECOLOR_PROMPTS = {
    "3092": """(NO TEXT, NO LETTERS, NO HUMANS), act as a professional digital textile colorist and material specialist.
[Core Logic]: This is a high-precision COLOR TRANSFER task. Use "image1"/"image2" as the STRUCTURAL MASTER and "image3" as the COLOR MASTER.
[Color Reference - Image 3]: Extract ONLY the exact hue, saturation, and tonal value from the cropped fabric swatch in "image3". Ignore the texture, weave, or physical details of "image3" entirely. The target color is "{color_name}" ({color_desc}).
[Structural Integrity - Image 1/2]: Maintain 100% consistency with "image1". Do NOT change the composition, the position of the folds, the lighting, or the specific "Cloud Crinkle" / "Diagonal Diamond-Grid" weave.
[Task Execution]: Repaint the surface of the fabric from "image1" using the specific color sampled from "image3". The new color must behave realistically under the existing light and shadow of "image1", preserving every micro-fiber, thread-tension, and 3D undulating hill.
[Final Quality]: 8k resolution, ultra-photorealistic, industrial-grade color match. The final result must look like "image1" was professionally dyed with the exact pigment shown in "image3".""",

    "3100": """(NO TEXT, NO LETTERS, NO HUMANS), act as a professional digital textile colorist and material specialist.
[Core Logic]: This is a high-precision COLOR TRANSFER task. Use "image1"/"image2" as the STRUCTURAL MASTER and "image3" as the COLOR MASTER.
[Color Reference - Image 3]: Extract ONLY the exact hue, saturation, and tonal value from the fabric swatch in "image3". Ignore the texture, weave, or any physical details of "image3" entirely. The target color is "{color_name}" ({color_desc}).
[Structural Integrity - Image 1/2]: Maintain 100% consistency with "image1". Do NOT change the composition, the geometric folds, or the specific "Ling Duo Cotton" (菱朵棉) texture. This unique texture features a slanted diamond grid with delicate, embossed clover-like floral motifs and a fine-gauge knit background.
[Task Execution]: Repaint the entire surface of "image1" using the specific color sampled from "image3". The new color must respond realistically to the existing light and shadow of "image1", ensuring the sharp diagonal ridges and the subtle 3D floral motifs remain perfectly sharp and distinct.
[Final Quality]: 8k resolution, ultra-photorealistic, industrial-grade color match. The final result must look like "image1" was professionally dyed with the exact pigment from "image3", keeping the intricate 3D textile structure 100% intact.""",

    "6049": """(NO TEXT, NO LETTERS, NO HUMANS), act as a professional digital textile colorist and material specialist.
[Core Logic]: This is a high-precision COLOR TRANSFER task. Use "image1"/"image2" as the STRUCTURAL MASTER and "image3" as the COLOR MASTER.
[Color Reference - Image 3]: Extract ONLY the exact hue, saturation, and tonal value from the cropped fabric swatch in "image3". Ignore the texture, weave, or any physical details of "image3" entirely. The target color is "{color_name}" ({color_desc}).
[Structural Integrity - Image 1/2]: Maintain 100% consistency with "image1". Do NOT change the composition, the position of the folds, or the specific "Butterfly Garden" (蝴蝶园林) texture. This material features a smooth, high-density base fabric with subtle, flat-woven jacquard bow motifs distributed across the surface.
[Task Execution]: Repaint the entire surface of "image1" using the specific color sampled from "image3". The new color must respond realistically to the lighting. Ensure the delicate thread-work of the butterfly patterns remains perfectly crisp and integrated with the new base color.
[Lighting]: Soft, warm diffused lighting with a subtle glow — like shooting through a silk diffuser. Reduce overall brightness by ~20% compared to the source image. No blown-out highlights. Shadows should be gentle and creamy, creating a dreamy yet detailed look. The overall mood should feel calm, premium, and easy on the eyes.
[Final Quality]: 8k resolution, ultra-photorealistic, industrial-grade color match. The final result must look like "image1" was professionally dyed, preserving the 3D volume of the folds and the intricate flat-woven details 100% intact.""",

    "6467": """(NO TEXT, NO LETTERS, NO NUMBERS, ABSOLUTELY NO HUMANS), act as a professional digital textile colorist and material specialist.
[Core Logic]: This is a high-precision COLOR TRANSFER task. Use "image1"/"image2" as the STRUCTURAL MASTER and "image3" as the COLOR MASTER.
[Color Reference - Image 3]: Extract ONLY the exact hue, saturation, and tonal value from the cropped fabric swatch in "image3". Ignore the texture, weave, or any physical details of "image3" entirely. The target color is "{color_name}" ({color_desc}).
[Structural Integrity - Image 1/2]: Maintain 100% consistency with "image1". Do NOT change the composition, the specific "Lucky Leaf" (幸运叶语) texture, or the folding arrangement. This texture features consistent vertical ribbed columns interspersed with delicate, repeating clover-shaped floral motifs.
[Task Execution]: Repaint the entire surface of "image1" using the specific color sampled from "image3". The new color must respond realistically to the soft highlights on the ribbed ridges and the subtle shadows within the clover patterns. Ensure every stitch and yarn loop remains crisp and clear.
[Lighting]: Soft, warm diffused lighting with a subtle glow — like shooting through a silk diffuser. Reduce overall brightness by ~20% compared to the source image. No blown-out highlights. Shadows should be gentle and creamy, creating a dreamy yet detailed look.
[Final Quality]: 8k resolution, ultra-photorealistic, industrial-grade color match. The final result must look like "image1" was professionally dyed with the exact pigment from "image3", keeping the 3D textile structure 100% intact.""",
}


def load_workflow():
    """加载工作流 JSON"""
    with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def fill_workflow(workflow, prompt, detail_image, swatch_image, output_prefix, seed=None):
    """填充工作流参数"""
    wf = copy.deepcopy(workflow)

    # Node 31: 换色提示词
    wf["31"]["inputs"]["prompt"] = prompt

    # Node 30: 面料细节图 (image1 — 纹理来源)
    wf["30"]["inputs"]["image"] = detail_image

    # Node 35: 色块参考图 (image2 — 颜色来源)
    wf["35"]["inputs"]["image"] = swatch_image

    # Node 29: 生成参数
    wf["29"]["inputs"]["seed"] = seed or random.randint(1, 2**31)
    wf["29"]["inputs"]["count"] = 1

    # Node 26: 输出文件名
    wf["26"]["inputs"]["filename_prefix"] = output_prefix

    return wf


def submit_to_comfyui(workflow):
    """提交工作流到 ComfyUI API"""
    import requests
    payload = {"prompt": workflow}
    resp = requests.post(f"{COMFYUI_URL}/prompt", json=payload)
    resp.raise_for_status()
    return resp.json().get("prompt_id", "")


def wait_for_completion(prompt_id, timeout=300):
    """等待任务完成"""
    import requests
    start = time.time()
    while time.time() - start < timeout:
        try:
            resp = requests.get(f"{COMFYUI_URL}/history/{prompt_id}")
            data = resp.json()
            if prompt_id in data:
                return True
        except:
            pass
        time.sleep(2)
    return False


def load_tasks(fabric_filter=None, color_filter=None):
    """从 CSV 加载任务"""
    tasks = []
    with open(CSV_PATH, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if fabric_filter and row["fabric_id"] != fabric_filter:
                continue
            if color_filter and row["color_number"] != color_filter:
                continue
            tasks.append(row)
    return tasks


def main():
    parser = argparse.ArgumentParser(description="面料换色批量生成")
    parser.add_argument("--fabric", help="只跑指定面料ID")
    parser.add_argument("--color", help="只跑指定色号")
    parser.add_argument("--dry-run", action="store_true", help="只显示参数不实际提交")
    parser.add_argument("--no-wait", action="store_true", help="提交后不等待完成")
    parser.add_argument("--delay", type=int, default=2, help="每个任务间隔秒数")
    args = parser.parse_args()

    # 加载任务
    tasks = load_tasks(args.fabric, args.color)
    if not tasks:
        print("❌ 没有找到匹配的任务")
        return

    print(f"📋 共 {len(tasks)} 个换色任务")

    # 加载工作流模板
    wf_template = load_workflow()

    success = 0
    failed = 0

    for i, task in enumerate(tasks):
        fabric_id = task["fabric_id"]
        color_num = task["color_number"]
        color_cn = task["color_name_cn"]
        color_desc = task["color_desc_en"]
        detail_image = task["input_image"]  # 面料细节图
        swatch_image = f"swatches/{fabric_id}-swatch-{color_num}.jpg"  # 裁剪色块
        output_prefix = f"{fabric_id}_{color_num}_{color_cn}"

        # 构建提示词（按面料选模板）
        prompt_tpl = RECOLOR_PROMPTS.get(fabric_id, RECOLOR_PROMPTS["3092"])
        prompt = prompt_tpl.format(
            color_name=color_cn,
            color_desc=color_desc
        )

        print(f"\n[{i+1}/{len(tasks)}] {fabric_id}# {color_cn} (色号{color_num})")

        if args.dry_run:
            print(f"  📷 细节图: {detail_image}")
            print(f"  🎨 色块参考: {swatch_image}")
            print(f"  💾 输出: {output_prefix}")
            print(f"  📝 提示词: {prompt[:100]}...")
            success += 1
            continue

        try:
            wf = fill_workflow(wf_template, prompt, detail_image, swatch_image, output_prefix)
            prompt_id = submit_to_comfyui(wf)
            print(f"  ✅ 已提交 → {prompt_id}")

            if not args.no_wait:
                print(f"  ⏳ 等待生成...")
                if wait_for_completion(prompt_id):
                    print(f"  ✅ 完成!")
                else:
                    print(f"  ⚠️ 等待超时")

            success += 1

            if i < len(tasks) - 1 and args.delay:
                time.sleep(args.delay)

        except Exception as e:
            print(f"  ❌ 失败: {e}")
            failed += 1

    print(f"\n{'='*50}")
    print(f"✅ 完成: {success} | ❌ 失败: {failed} | 总计: {len(tasks)}")


if __name__ == "__main__":
    main()

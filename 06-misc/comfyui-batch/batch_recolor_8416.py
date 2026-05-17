"""
兰精莫代尔2x2罗纹（8416#）批量换色脚本
- image1 = image2 = 8416-detail.jpg（结构/纹理主图）
- image3 = swatches/8416-swatch-XX.jpg（色块参考图，颜色来源）
- 提示词：颜色完全从色块图提取，不文字描述颜色
"""

import json
import copy
import random
import requests
import time
import sys

COMFYUI_URL = 'http://127.0.0.1:8188'
WF_PATH = r'E:\微信小程序开发总文件\06-misc\comfyui-batch\workflow-recolor-api.json'

PROMPT = (
    '(NO TEXT, NO LETTERS, NO NUMBERS, ABSOLUTELY NO HUMANS), '
    'act as a professional digital textile colorist and material specialist. '
    '[Core Logic]: This is a high-precision COLOR TRANSFER task. '
    'Use image1 as the STRUCTURAL MASTER and image3 as the COLOR MASTER. '
    '[Color Reference - Image 3]: Extract ONLY the exact hue, saturation, and tonal value '
    'from the fabric swatch in image3. Ignore the texture, weave, or any physical details of image3 entirely. '
    '[Structural Integrity - Image 1]: Maintain 100% consistency with image1. '
    'Do NOT change the composition, the specific Lenzing Modal 2x2 Rib (兰精莫代尔2x2罗纹) texture, '
    'or the fluid folding arrangement. This texture features incredibly fine, consistent, and rhythmic '
    '2x2 vertical ribbed columns with a silky, smooth surface. '
    '[Task Execution]: Repaint the entire surface of image1 using the specific color sampled from image3. '
    'The new color must respond realistically to the soft, diffused light and the silky sheen of the modal fibers. '
    'Ensure the vertical ribs remain razor-sharp and the fabric drapes appear soft and heavy. '
    '[Final Quality]: 8k resolution, ultra-photorealistic, industrial-grade color match. '
    'The final result must look like image1 was professionally dyed with the exact pigment from image3, '
    'preserving the 3D volume of the 2x2 ribbing 100% intact.'
)

# 全部 20 色
ALL_TASKS = [
    ('01', '本白'),  ('02', '浅粉'),  ('03', '粉红'),  ('04', '米白'),  ('05', '浅米'),
    ('06', '驼色'),  ('07', '浅绿白'), ('08', '浅蓝灰'), ('09', '中蓝'),  ('10', '浅灰'),
    ('11', '浅麻灰'), ('12', '中灰'),  ('13', '棕灰'),  ('14', '深灰'),  ('15', '藏青'),
    ('16', '酒红'),  ('17', '军绿'),  ('18', '深棕'),  ('19', '深蓝'),  ('20', '黑色'),
]


def load_workflow():
    with open(WF_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def submit_task(wf_template, num, name):
    wf = copy.deepcopy(wf_template)
    wf['31']['inputs']['prompt'] = PROMPT
    wf['30']['inputs']['image'] = '8416-detail.jpg'      # image1 & image2 → 细节图
    wf['35']['inputs']['image'] = f'swatches/8416-swatch-{num}.jpg'  # image3 → 色块
    wf['29']['inputs']['seed'] = random.randint(1, 2**31)
    wf['29']['inputs']['count'] = 1
    wf['26']['inputs']['filename_prefix'] = f'8416_{num}_{name}'
    resp = requests.post(f'{COMFYUI_URL}/prompt', json={'prompt': wf})
    resp.raise_for_status()
    data = resp.json()
    if data.get('node_errors'):
        print(f'  [警告] 节点错误: {data["node_errors"]}')
    return data.get('prompt_id', '')


def wait_for_task(pid, num, name, timeout=300):
    start = time.time()
    while time.time() - start < timeout:
        try:
            r = requests.get(f'{COMFYUI_URL}/history/{pid}', timeout=10)
            data = r.json()
            if pid in data:
                outputs = data[pid].get('outputs', {})
                files = []
                for nout in outputs.values():
                    for img in nout.get('images', []):
                        files.append(img['filename'])
                elapsed = round(time.time() - start, 1)
                return files, elapsed
        except Exception as e:
            pass
        time.sleep(5)
    return [], timeout


# ── 入口 ────────────────────────────────────────────
if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'test'
    wf_template = load_workflow()

    if mode == 'test':
        # 只跑色号 09 中蓝
        tasks = [('09', '中蓝')]
        print('=== 测试模式：仅跑色号 09-中蓝 ===\n')
    else:
        tasks = ALL_TASKS
        print(f'=== 批量模式：共 {len(tasks)} 色 ===\n')

    results = []
    for num, name in tasks:
        print(f'[提交] {num}-{name}', end=' ... ', flush=True)
        pid = submit_task(wf_template, num, name)
        print(f'pid={pid}')
        print(f'[等待] {num}-{name}', flush=True)
        files, elapsed = wait_for_task(pid, num, name)
        # 8416工作流只输出一张（00001即最终图）
        final = files
        results.append((num, name, final, elapsed))
        print(f'[完成] {num}-{name} → {final}  ({elapsed}s)\n')

    print('=== 汇总 ===')
    for num, name, files, elapsed in results:
        status = '✅' if files else '❌'
        print(f'  {status} {num}-{name}: {files}  ({elapsed}s)')

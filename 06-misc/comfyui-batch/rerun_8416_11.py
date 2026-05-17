"""
单独重跑 8416 第11色：浅麻灰
色卡参考图已替换为正确的灰色色卡（8416-swatch-11.jpg）
"""

import json
import copy
import random
import requests
import time

COMFYUI_URL = 'http://127.0.0.1:8188'
WF_PATH = r'E:\微信小程序开发总文件\06-misc\comfyui-batch\workflow-recolor-api.json'

PROMPT = (
    '(NO TEXT, NO LETTERS, NO NUMBERS, ABSOLUTELY NO HUMANS), '
    'act as a professional digital textile colorist and material specialist. '
    '[Core Logic]: This is a MIXED-YARN COLOR SIMULATION task, NOT a solid dye transfer. '
    'Use image1 as the STRUCTURAL MASTER and image3 as the COLOR MASTER. '
    '[Color Reference - Image 3]: The swatch in image3 shows a HEATHER / MELANGE fabric — '
    'a yarn-level blend of light gray and white fibers creating a naturally uneven, cloudy, marled appearance. '
    'DO NOT extract a single flat color. Instead, replicate the exact heather effect: '
    'irregular soft patches of warm white and light gray intermingled across the entire surface, '
    'like a light snow-dye or space-dye effect — subtle, natural, NOT tie-dye dramatic. '
    '[Structural Integrity - Image 1]: Maintain 100% consistency with image1. '
    'Do NOT change the composition, the specific Lenzing Modal 2x2 Rib (兰精莫代尔2x2罗纹) texture, '
    'or the fluid folding arrangement. The 2x2 vertical ribbed columns must remain razor-sharp and intact. '
    '[Task Execution]: Apply the heather/melange color effect from image3 onto the structure of image1. '
    'The result should look like the yarn itself was spun from mixed light-gray and white fibers — '
    'creating soft, organic, cloud-like variations of light gray (#C0C0C0) and near-white (#F0F0F0) '
    'distributed naturally across the fabric surface. '
    'The highlights from the silky modal sheen should interact with both the gray and white zones naturally. '
    '[Final Quality]: 8k resolution, ultra-photorealistic. '
    'The final result must look like a premium heather-gray modal rib fabric, '
    'preserving the 3D volume of the 2x2 ribbing 100% intact.'
)

def load_workflow():
    with open(WF_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def submit_task(wf_template):
    wf = copy.deepcopy(wf_template)
    wf['31']['inputs']['prompt'] = PROMPT
    wf['30']['inputs']['image'] = '8416-detail.jpg'
    wf['35']['inputs']['image'] = 'swatches/8416-swatch-11.jpg'   # 正确的浅麻灰色卡
    wf['29']['inputs']['seed'] = random.randint(1, 2**31)
    wf['29']['inputs']['count'] = 1
    wf['26']['inputs']['filename_prefix'] = '8416_11_浅麻灰'
    resp = requests.post(f'{COMFYUI_URL}/prompt', json={'prompt': wf})
    resp.raise_for_status()
    data = resp.json()
    if data.get('node_errors'):
        print(f'[警告] 节点错误: {data["node_errors"]}')
    return data.get('prompt_id', '')

def wait_for_task(pid, timeout=300):
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
        except:
            pass
        time.sleep(5)
    return [], timeout

if __name__ == '__main__':
    print('=== 重跑 8416 第11色：浅麻灰 ===\n')
    wf_template = load_workflow()

    print('[提交] 11-浅麻灰 ...', end=' ', flush=True)
    pid = submit_task(wf_template)
    print(f'pid={pid}')

    print('[等待] 生成中...', flush=True)
    files, elapsed = wait_for_task(pid)

    if files:
        print(f'\n✅ 完成！输出文件: {files}  ({elapsed}s)')
        print(f'生成后重命名为 8416_11_浅麻灰_00001_.png 上传云端覆盖即可')
    else:
        print(f'\n❌ 超时或失败，请检查ComfyUI是否在运行')

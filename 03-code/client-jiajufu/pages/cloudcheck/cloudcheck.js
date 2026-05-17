// 云存储诊断页（开发专用）
const BASE = 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045'

// 所有需要验证的云存储文件
const CHECK_LIST = [
  // ── 面料主图 ──
  { label: '云皱棉 主图',        path: `${BASE}/fabrics/3092-detail.jpg` },
  { label: '菱朵棉 主图',        path: `${BASE}/fabrics/3100-detail.jpg` },
  { label: '蝴蝶园林 主图',      path: `${BASE}/fabrics/6049-detail.jpg` },
  { label: '幸运叶语 主图',      path: `${BASE}/fabrics/6467-detail.jpg` },
  { label: '兰精莫代尔 主图',    path: `${BASE}/fabrics/8416-detail.jpg` },

  // ── Hero 视频 ──
  { label: '首页 TVC 视频',      path: `${BASE}/videos/首页TVC短片.mp4` },

  // ── 面料墙图片 ──
  { label: '面料墙 fw-1',        path: `${BASE}/fabric-wall/fw-1.jpg` },
  { label: '面料墙 fw-2',        path: `${BASE}/fabric-wall/fw-2.jpg` },
  { label: '面料墙 fw-3',        path: `${BASE}/fabric-wall/fw-3.jpg` },
  { label: '面料墙 fw-4',        path: `${BASE}/fabric-wall/fw-4.jpg` },
  { label: '面料墙 fw-5',        path: `${BASE}/fabric-wall/fw-5.jpg` },
  { label: '面料墙 fw-6',        path: `${BASE}/fabric-wall/fw-6.jpg` },
  { label: '面料墙 fw-7',        path: `${BASE}/fabric-wall/fw-7.jpg` },
  { label: '面料墙 fw-8',        path: `${BASE}/fabric-wall/fw-8.jpg` },

  // ── 营业执照 ──
  { label: '营业执照',           path: `${BASE}/营业执照.jpg` },

  // ── 色卡图（8416 莫代尔，代表性抽检5张）──
  { label: '8416 色卡-01本白',   path: `${BASE}/fabrics/swatches/8416_01_本白_00003_.png` },
  { label: '8416 色卡-10浅灰',   path: `${BASE}/fabrics/swatches/8416_10_浅灰_00001_.png` },
  { label: '8416 色卡-20黑色',   path: `${BASE}/fabrics/swatches/8416_20_黑色_v2_00001_.png` },

  // ── 色卡图（6467 幸运叶语，代表性抽检）──
  { label: '6467 色卡-01本白',   path: `${BASE}/fabrics/swatches/6467_01_本白_00002_.png` },
  { label: '6467 色卡-05浅黄',   path: `${BASE}/fabrics/swatches/6467_05_浅黄_00002_.png` }
]

Page({
  data: {
    checking: true,
    results: [],
    okCount: 0,
    failCount: 0,
    total: CHECK_LIST.length
  },

  onLoad() {
    this.startCheck()
  },

  startCheck() {
    this.setData({ checking: true, results: [] })
    const fileList = CHECK_LIST.map(f => f.path)

    wx.cloud.getTempFileURL({
      fileList,
      success: (res) => {
        const results = res.fileList.map((f, i) => {
          const ok = f.status === 0 && !!f.tempFileURL
          const shortPath = CHECK_LIST[i].path.replace(BASE + '/', '')
          return {
            id: i,
            label: CHECK_LIST[i].label,
            shortPath,
            ok,
            errMsg: ok ? '' : (f.errMsg || '文件不存在')
          }
        })
        const okCount = results.filter(r => r.ok).length
        const failCount = results.length - okCount
        this.setData({ checking: false, results, okCount, failCount })
      },
      fail: (err) => {
        this.setData({
          checking: false,
          results: [{ id: 0, label: '云API调用失败', shortPath: '', ok: false, errMsg: err.errMsg }]
        })
      }
    })
  }
})

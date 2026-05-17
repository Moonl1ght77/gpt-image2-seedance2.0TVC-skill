// 面料详情页逻辑
const app = getApp()

Page({
  data: {
    navTransparent: false,
    navbarHeight: 0,
    activeTab: 'colors',
    selectedColor: 0,
    viewMode: 'swatch',

    fabric: {}
  },

  // 面料数据字典（真实数据 — 乐顺科纺）
  _fabricDB: {
    '3092': {
      name: '云皱棉', nameEn: '3092# Cloud Crepe Cotton', badge: '天然棉',
      desc: '95%棉与5%氨纶混纺，表面呈现自然云皱纹理，手感柔软透气，是家居服和童装的优选面料。',
      tags: ['亲肤', '透气', '自然皱感', '弹力'],
      highlights: [
        { icon: '🌿', title: '天然棉质', desc: '95%优质棉，亲肤零刺激' },
        { icon: '✨', title: '自然皱感', desc: '独特云皱纹理，免烫自然美' },
        { icon: '💪', title: '弹力舒适', desc: '5%氨纶加入，穿着更贴合' },
        { icon: '🧺', title: '易打理', desc: '机洗不变形，日常护理简单' }
      ],
      scenes: [
        { icon: '👘', title: '家居服', bg: 'linear-gradient(135deg, #FFF8DC, #FAEBD7)' },
        { icon: '👶', title: '童装', bg: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)' },
        { icon: '👗', title: '套装', bg: 'linear-gradient(135deg, #F0E6D8, #E8D5C0)' }
      ],
      story: '云皱棉选用优质长绒棉纤维，经特殊织造工艺形成天然的云朵般皱感纹理。不同于普通棉布的平整，它自带一种随性、自然的美感，穿上身如被云朵包裹般舒适。',
      careGuide: [
        { icon: '🌊', title: '温和水洗', desc: '30°C以下水温，机洗轻柔模式' },
        { icon: '🚫', title: '避免漂白', desc: '不可使用含氯漂白剂' },
        { icon: '☀️', title: '阴凉晾干', desc: '避免阳光直射，保持皱感' },
        { icon: '🔄', title: '无需熨烫', desc: '自然皱感面料，免烫即穿' }
      ],
      colorCards: [
        { number: '01', name: '本白', hex: '#FFFFF0' },
        { number: '02', name: '浅粉', hex: '#FFF0F0' },
        { number: '03', name: '浅杏', hex: '#FAEBD7' },
        { number: '04', name: '浅米', hex: '#FFF8DC' },
        { number: '05', name: '焦糖', hex: '#DEB887' },
        { number: '06', name: '驼色', hex: '#C4A882' },
        { number: '07', name: '土黄', hex: '#C8B060' },
        { number: '08', name: '铜棕', hex: '#B87040' },
        { number: '09', name: '军绿', hex: '#5A5A3A' }
      ],
      params: [
        { label: '款号', value: '3092#' },
        { label: '品名', value: '云皱棉' },
        { label: '成分', value: '95%棉 5%氨纶' },
        { label: '克重', value: '210G（回潮）' },
        { label: '幅宽', value: '155CM（实用）' },
        { label: '适用', value: '家居服、童装、套装' },
        { label: '起订量', value: '50米起' },
        { label: '货期', value: '现货 / 定制7-15天' }
      ]
    },
    '3100': {
      name: '菱朵棉', nameEn: '3100# Diamond Cotton', badge: '柔肤棉',
      desc: '95%棉与5%氨纶混纺，表面呈现精致菱形提花，手感细腻轻薄，适合贴身穿着。',
      tags: ['轻薄', '提花', '亲肤', '透气'],
      highlights: [
        { icon: '💎', title: '菱形提花', desc: '精致立体菱格纹，质感高级' },
        { icon: '🪶', title: '轻薄透气', desc: '160G轻量克重，四季可穿' },
        { icon: '📐', title: '宽幅面料', desc: '170CM宽幅，裁剪更省料' },
        { icon: '🌿', title: '天然棉质', desc: '95%棉，贴身穿着无负担' }
      ],
      scenes: [
        { icon: '👘', title: '家居服', bg: 'linear-gradient(135deg, #FFF8DC, #FAEBD7)' },
        { icon: '🩲', title: '内裤', bg: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)' },
        { icon: '👶', title: '童装', bg: 'linear-gradient(135deg, #F0F8FF, #E8F0F8)' },
        { icon: '👚', title: '吊带背心', bg: 'linear-gradient(135deg, #F0E6D8, #E8D5C0)' }
      ],
      story: '菱朵棉的名字来源于面料表面如花朵般绽放的菱形提花图案。它将传统提花工艺与现代棉纺技术结合，创造出既有肌理美感又兼具舒适度的面料。',
      careGuide: [
        { icon: '🌊', title: '温和水洗', desc: '30°C以下水温，机洗轻柔模式' },
        { icon: '🚫', title: '避免漂白', desc: '不可使用含氯漂白剂' },
        { icon: '☀️', title: '阴凉晾干', desc: '避免阳光直射' },
        { icon: '🔄', title: '低温熨烫', desc: '如需熨烫，建议低温反面操作' }
      ],
      colorCards: [
        { number: '01', name: '本白', hex: '#FFFFF0' },
        { number: '02', name: '浅粉', hex: '#FFF0F0' },
        { number: '03', name: '浅黄', hex: '#FFFACD' },
        { number: '04', name: '浅米', hex: '#FFF8DC' },
        { number: '05', name: '浅粉紫', hex: '#E8D0E0' },
        { number: '06', name: '浅绿', hex: '#D8E8D0' },
        { number: '07', name: '浅灰粉', hex: '#E8D8D8' }
      ],
      params: [
        { label: '款号', value: '3100#' },
        { label: '品名', value: '菱朵棉' },
        { label: '成分', value: '95%棉 5%氨纶' },
        { label: '克重', value: '160G（回潮）' },
        { label: '幅宽', value: '170CM（实用）' },
        { label: '适用', value: '家居服、内裤、童装、打底、背心' },
        { label: '起订量', value: '50米起' },
        { label: '货期', value: '现货 / 定制7-15天' }
      ]
    },
    '6049': {
      name: '蝴蝶园林', nameEn: '6049# Butterfly Garden', badge: '棉莫混纺',
      desc: '46%棉与46%莫代尔、8%氨纶混纺，表面呈现精致的蝴蝶提花图案，触感丝滑柔软。',
      tags: ['莫代尔', '提花', '丝滑', '弹力'],
      highlights: [
        { icon: '�', title: '蝴蝶提花', desc: '精致蝴蝶图案，独特设计感' },
        { icon: '🌿', title: '棉莫混纺', desc: '棉+莫代尔，兼具天然与丝滑' },
        { icon: '💧', title: '吸湿透气', desc: '莫代尔纤维，吸湿性优异' },
        { icon: '�', title: '弹力回复', desc: '8%氨纶，穿着自由无束缚' }
      ],
      scenes: [
        { icon: '👘', title: '家居服', bg: 'linear-gradient(135deg, #FFF8DC, #FAEBD7)' },
        { icon: '🩲', title: '内裤', bg: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)' },
        { icon: '👶', title: '童装', bg: 'linear-gradient(135deg, #F0F8FF, #E8F0F8)' },
        { icon: '👚', title: '女士打底', bg: 'linear-gradient(135deg, #F0E6D8, #E8D5C0)' }
      ],
      story: '蝴蝶园林将棉的天然亲肤与莫代尔的丝滑触感完美融合。面料表面翩翩飞舞的蝴蝶提花，灵感来源于春日花园，穿在身上仿佛置身自然。',
      careGuide: [
        { icon: '🌊', title: '温和水洗', desc: '30°C以下水温，轻柔模式' },
        { icon: '🚫', title: '避免漂白', desc: '莫代尔纤维不耐漂白剂' },
        { icon: '☀️', title: '阴凉晾干', desc: '避免高温烘干和暴晒' },
        { icon: '🔄', title: '反面洗涤', desc: '保护提花纹理，延长使用寿命' }
      ],
      colorCards: [
        { number: '01', name: '本白', hex: '#FFF8F5' },
        { number: '02', name: '浅粉', hex: '#FFE8E0' },
        { number: '03', name: '浅蓝', hex: '#D8E0F0' },
        { number: '04', name: '浅绿', hex: '#E0E8D8' },
        { number: '05', name: '浅紫', hex: '#D8D0E8' }
      ],
      params: [
        { label: '款号', value: '6049#' },
        { label: '品名', value: '蝴蝶园林' },
        { label: '成分', value: '46%棉 46%莫代尔 8%氨纶' },
        { label: '克重', value: '190G（回潮）' },
        { label: '幅宽', value: '160CM（实用）' },
        { label: '适用', value: '家居服、内裤、童装、打底、背心' },
        { label: '起订量', value: '50米起' },
        { label: '货期', value: '订单生产 / 7-15天' }
      ]
    },
    '6467': {
      name: '幸运叶语', nameEn: '6467# Lucky Leaf', badge: '混纺新材',
      desc: '棉、再生纤维、锦纶与氨纶四元混纺，叶片提花图案，触感柔软有弹性。',
      tags: ['再生纤维', '锦纶', '弹力', '提花'],
      highlights: [
        { icon: '🍀', title: '叶片提花', desc: '幸运叶图案，自然清新' },
        { icon: '♻️', title: '再生纤维', desc: '31.3%再生纤维，环保可持续' },
        { icon: '💪', title: '锦纶耐磨', desc: '29.8%锦纶加入，耐磨耐穿' },
        { icon: '🎨', title: '色号丰富', desc: '9个色号，满足多样需求' }
      ],
      scenes: [
        { icon: '👘', title: '家居服', bg: 'linear-gradient(135deg, #FFF8DC, #FAEBD7)' },
        { icon: '🩲', title: '内裤', bg: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)' },
        { icon: '�', title: '童装', bg: 'linear-gradient(135deg, #F0F8FF, #E8F0F8)' },
        { icon: '👚', title: '女士打底', bg: 'linear-gradient(135deg, #F0E6D8, #E8D5C0)' }
      ],
      story: '幸运叶语是一款将环保理念与时尚设计结合的创新面料。再生纤维的加入让它更具可持续意义，叶片提花则赋予面料生命力，每一片叶子都承载着对自然的敬意。',
      careGuide: [
        { icon: '🌊', title: '温和水洗', desc: '30°C以下水温，轻柔模式' },
        { icon: '🚫', title: '避免漂白', desc: '混纺纤维不耐漂白' },
        { icon: '☀️', title: '阴凉晾干', desc: '避免高温和暴晒' },
        { icon: '🔄', title: '反面洗涤', desc: '保护提花图案完整性' }
      ],
      colorCards: [
        { number: '01', name: '本白',    hex: '#FFF8F5', file: '6467_01_本白_00002_.png' },
        { number: '02', name: '浅粉紫',  hex: '#EDD8E0', file: '6467_02_浅粉紫_00002_.png' },
        { number: '03', name: '浅粉',    hex: '#FFE0E0', file: '6467_03_浅粉_00002_.png' },
        { number: '04', name: '浅蓝灰',  hex: '#D0D8E0', file: '6467_04_浅蓝灰_00002_.png' },
        { number: '05', name: '浅黄',    hex: '#FFF5CC', file: '6467_05_浅黄_00002_.png' },
        { number: '06', name: '浅豆绿',  hex: '#C8D8C0', file: '6467_06_浅豆绿_00002_.png' },
        { number: '07', name: '冰蓝',    hex: '#C8D8E8', file: '6467_07_冰蓝_00002_.png' },
        { number: '08', name: '薄荷蓝绿', hex: '#7BBCBE', file: '6467_08_薄荷蓝绿_00002_.png' },
        { number: '09', name: '米白',    hex: '#F5F0EC', file: '6467_09_米白_00002_.png' }
      ],
      params: [
        { label: '款号', value: '6467#' },
        { label: '品名', value: '幸运叶语' },
        { label: '成分', value: '31.9%棉 31.3%再生纤维 29.8%锦纶 7%氨纶' },
        { label: '克重', value: '170G（回潮）' },
        { label: '幅宽', value: '160CM（实用）' },
        { label: '适用', value: '家居服、内裤、童装、打底、背心' },
        { label: '起订量', value: '50米起' },
        { label: '货期', value: '订单生产 / 7-15天' }
      ]
    },
    '8416': {
      name: '兰精莫代尔2×2罗纹', nameEn: '8416# Lenzing Modal Rib', badge: '高端莫代尔',
      desc: '91%兰精莫代尔与9%氨纶混纺，2×2罗纹组织，触感丝滑垂坠，配兰精莫代尔吊牌认证。',
      tags: ['兰精认证', '莫代尔', '罗纹', '丝滑'],
      highlights: [
        { icon: '🏅', title: '兰精认证', desc: '配兰精莫代尔吊牌，品质保证' },
        { icon: '✨', title: '丝滑触感', desc: '91%莫代尔，比丝绸更亲肤' },
        { icon: '📏', title: '2×2罗纹', desc: '经典罗纹组织，弹力优异' },
        { icon: '🎨', title: '色号丰富', desc: '20个色号，从浅色到深色齐全' }
      ],
      scenes: [
        { icon: '👘', title: '家居服', bg: 'linear-gradient(135deg, #FFF8DC, #FAEBD7)' },
        { icon: '�', title: '内裤', bg: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)' },
        { icon: '👶', title: '童装', bg: 'linear-gradient(135deg, #F0F8FF, #E8F0F8)' },
        { icon: '👚', title: '女士打底', bg: 'linear-gradient(135deg, #F0E6D8, #E8D5C0)' },
        { icon: '�', title: '吊带背心', bg: 'linear-gradient(135deg, #E8DDD0, #D4C4A8)' }
      ],
      story: '兰精莫代尔源自奥地利兰精集团，以欧洲榉木为原料，经环保工艺制成的再生纤维素纤维。这款2×2罗纹面料将兰精莫代尔的极致柔滑与罗纹组织的弹力完美结合，是高端内衣和家居服的理想之选。',
      careGuide: [
        { icon: '🌊', title: '温和水洗', desc: '30°C以下水温，轻柔模式' },
        { icon: '🚫', title: '避免漂白', desc: '莫代尔纤维不耐漂白剂' },
        { icon: '☀️', title: '阴凉晾干', desc: '避免高温烘干，防止缩水' },
        { icon: '🔄', title: '平铺晾干', desc: '垂挂可能导致变形，建议平铺' }
      ],
      colorCards: [
        { number: '01', name: '本白',   hex: '#F5F0EC', file: '8416_01_本白_00003_.png' },
        { number: '02', name: '浅粉',   hex: '#F5D8E0', file: '8416_02_浅粉_00002_.png' },
        { number: '03', name: '粉红',   hex: '#F0B8C8', file: '8416_03_粉红_00001_.png' },
        { number: '04', name: '米白',   hex: '#F0E8D8', file: '8416_04_米白_00001_.png' },
        { number: '05', name: '浅米',   hex: '#E8DCC8', file: '8416_05_浅米_00001_.png' },
        { number: '06', name: '驼色',   hex: '#C8A882', file: '8416_06_驼色_00001_.png' },
        { number: '07', name: '浅绿白', hex: '#D8ECD8', file: '8416_07_浅绿白_00001_.png' },
        { number: '08', name: '浅蓝灰', hex: '#C0CCD8', file: '8416_08_浅蓝灰_00001_.png' },
        { number: '09', name: '中蓝',   hex: '#6890C0', file: '8416_09_中蓝_00002_.png' },
        { number: '10', name: '浅灰',   hex: '#C8C8C8', file: '8416_10_浅灰_00001_.png' },
        { number: '11', name: '浅麻灰', hex: '#B8B4AC', file: '8416_11_浅麻灰_00001_.png' },
        { number: '12', name: '中灰',   hex: '#909090', file: '8416_12_中灰_00001_.png' },
        { number: '13', name: '棕灰',   hex: '#8C7870', file: '8416_13_棕灰_00001_.png' },
        { number: '14', name: '深灰',   hex: '#606060', file: '8416_14_深灰_00001_.png' },
        { number: '15', name: '藏青',   hex: '#2C3C50', file: '8416_15_藏青_00001_.png' },
        { number: '16', name: '酒红',   hex: '#7A1828', file: '8416_16_酒红_v2_00001_.png' },
        { number: '17', name: '军绿',   hex: '#4A5830', file: '8416_17_军绿_00001_.png' },
        { number: '18', name: '深棕',   hex: '#3C2818', file: '8416_18_深棕_v2_00001_.png' },
        { number: '19', name: '深蓝',   hex: '#1C2C4C', file: '8416_19_深蓝_v3_00001_.png' },
        { number: '20', name: '黑色',   hex: '#1A1A1A', file: '8416_20_黑色_v2_00001_.png' }
      ],
      params: [
        { label: '款号', value: '8416#' },
        { label: '品名', value: '兰精莫代尔2×2罗纹' },
        { label: '成分', value: '91%兰精莫代尔 9%氨纶' },
        { label: '克重', value: '220G（回潮）' },
        { label: '幅宽', value: '155CM（实用）' },
        { label: '适用', value: '家居服、内裤、童装、打底、背心' },
        { label: '起订量', value: '50米起' },
        { label: '货期', value: '现货 / 定制7-15天' }
      ]
    }
  },

  onLoad(options) {
    const mask = this.selectComponent('#lmask')
    if (mask) mask.show()
    const fabricId = options.fabricId || options.id || '3092'
    const fabric = this._fabricDB[fabricId] || this._fabricDB['3092']

    const cloudBase = 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045'
    const swatchBase = `${cloudBase}/fabrics/swatches`
    this.setData({
      fabricId,
      fabric,
      swatchBase,
      navbarHeight: app.globalData.navbarHeight
    })

    // 保存到最近浏览记录
    const RECENT_KEY = 'recentViewed'
    const brief = {
      id: fabricId,
      name: fabric.name,
      spec: (fabric.params.find(p => p.label === '克重') || {}).value + ' · ' + (fabric.params.find(p => p.label === '幅宽') || {}).value,
      img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/' + fabricId + '-detail.jpg',
      bg: 'linear-gradient(135deg, #F5EDE3, #E0D0BC)'
    }
    let recent = wx.getStorageSync(RECENT_KEY) || []
    recent = recent.filter(r => r.id !== fabricId)
    recent.unshift(brief)
    if (recent.length > 10) recent = recent.slice(0, 10)
    wx.setStorageSync(RECENT_KEY, recent)

    // 从色卡库跳转过来时，定位到对应色号
    if (options.colorIndex) {
      this.setData({
        selectedColor: parseInt(options.colorIndex),
        viewMode: 'swatch'
      })
    }
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  selectColor(e) {
    this.setData({ selectedColor: e.currentTarget.dataset.index })
  },

  // 切换视角
  switchView(e) {
    this.setData({ viewMode: e.currentTarget.dataset.mode })
  },

  // 预览色卡图片
  previewSwatchImage() {
    const fabric = this.data.fabric
    const fabricId = this.data.fabricId
    const base = this.data.swatchBase
    const getUrl = c => c.file ? `${base}/${c.file}` : `${base}/${fabricId}-${c.number}.png`
    const current = getUrl(fabric.colorCards[this.data.selectedColor])
    const urls = fabric.colorCards.map(c => getUrl(c))
    wx.previewImage({ current, urls })
  },

  // 跳转色卡库
  goSwatchLibrary() {
    wx.switchTab({ url: '/pages/swatch/swatch' })
  },

  // 询价 — 预填面料信息跳转联系页
  onInquiry() {
    const fabric = this.data.fabric
    const color = this.data.selectedColor >= 0 ? fabric.colorCards[this.data.selectedColor] : null
    const prefill = `${fabric.name}${color ? ' ' + color.number + ' ' + color.name : ''}`
    app.globalData.inquiryPrefill = prefill
    wx.switchTab({ url: '/pages/contact/contact' })
  },

  // 联系客服
  onContact() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.contactPhone.replace(/-/g, '')
    })
  }
})

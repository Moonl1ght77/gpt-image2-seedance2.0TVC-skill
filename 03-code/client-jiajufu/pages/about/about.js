// 关于我们页面逻辑
const app = getApp()

Page({
  data: {
    navbarHeight: 88,
    brandName: '',
    brandSlogan: '',

    // 品牌理念
    brandPhilosophy: '面料，是肌肤与世界之间最亲密的语言。',
    brandStory: '乐顺科纺创立于2024年，专注于将天然纤维与现代工艺融合，为品牌客户提供兼具舒适触感与高级质感的面料解决方案。从兰精莫代尔到精梳长绒棉，从提花工艺到罗纹织造，每一款面料都经过反复打样与手感测试，只为还原我们对"穿在身上的舒适"的极致追求。',

    // 品牌价值观
    values: [
      { symbol: '◇', title: '甄选原料', desc: '兰精莫代尔、精梳长绒棉，只用经得起肌肤考验的纤维' },
      { symbol: '◇', title: '工艺深耕', desc: '提花、罗纹、皱感——每种织法都是对触感的精确表达' },
      { symbol: '◇', title: '色彩体系', desc: '56 个精调色号，覆盖从自然素色到深邃暗调的完整色域' },
      { symbol: '◇', title: '快速响应', desc: '现货 48 小时发出，定制最快 7 天交付' }
    ],

    // 核心数据
    strengths: [
      { number: '5', unit: '大', label: '面料系列' },
      { number: '56', unit: '+', label: '精调色号' },
      { number: '2024', unit: '', label: '品牌启程' },
      { number: '200', unit: '+', label: '合作品牌' }
    ],

    // 合作流程
    processes: [
      { title: '选样咨询', desc: '浏览面料系列，了解材质与工艺' },
      { title: '寄送色卡', desc: '免费寄送实物色卡，触摸真实质感' },
      { title: '打样确认', desc: '按需打样，确认色号与手感' },
      { title: '下单生产', desc: '现货即发，定制 7–15 天交付' }
    ]
  },

  onShow() {
    const mask = this.selectComponent('#lmask')
    if (mask) mask.show()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
    this.setData({ pageAnimStyle: 'animation: none' })
    setTimeout(() => this.setData({ pageAnimStyle: '' }), 20)
  },

  onLoad() {
    this.setData({
      navbarHeight: app.globalData.navbarHeight,
      brandName: app.globalData.brandName,
      brandSlogan: app.globalData.brandSlogan
    })
  }
})

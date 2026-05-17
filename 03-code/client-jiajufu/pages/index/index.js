// 首页逻辑
const app = getApp()

Page({
  data: {
    brandName: '',
    brandSlogan: '',
    contactPhone: '',
    navTransparent: true,
    // 滚动触发的显示状态
    showQuote: false,
    showStats: false,
    showFeatured: false,
    featuredState: '',  // '' | 'in' | 'out'
    showPhilosophy: false,

    quoteChars: '面料，是肌肤与世界之间最亲密的语言'.split(''),

    // Hero 视频（上传云存储后替换为 cloud:// 路径）
    heroVideoSrc: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/videos/首页TVC短片.mp4',
    showLogoAnim: false,

    // 数据展示
    stats: [
      { number: 5, display: '5', label: '面料品种' },
      { number: 69, display: '69', label: '色号选择' },
      { number: 2024, display: '2024', label: '品牌启程' },
      { number: 200, display: '200+', label: '合作客户' }
    ],

    // 精选面料（纵向大卡片）— 取 3 款主推
    featuredList: [
      { id: '3092', name: '云皱棉', desc: '95%棉 · 210G · 自然皱感', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/3092-detail.jpg', bg: 'linear-gradient(135deg, #F5EDE3, #E0D0BC)' },
      { id: '8416', name: '兰精莫代尔2×2罗纹', desc: '91%兰精莫代尔 · 220G · 高端触感', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/8416-detail.jpg', bg: 'linear-gradient(135deg, #D5DDD5, #B8C5B8)' },
      { id: '6049', name: '蝴蝶园林', desc: '棉莫混纺 · 190G · 精致提花', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/6049-detail.jpg', bg: 'linear-gradient(135deg, #F0E0D8, #E0CFC2)' }
    ],

    // 面料工艺横滑
    craftList: [
      { name: '云皱棉', code: '3092', weight: '210G', comp: '95%棉 5%氨纶', craft: '皱感工艺', colors: 9 },
      { name: '菱朵棉', code: '3100', weight: '160G', comp: '95%棉 5%氨纶', craft: '菱形提花', colors: 7 },
      { name: '蝴蝶园林', code: '6049', weight: '190G', comp: '46%棉 46%莫代尔 8%氨纶', craft: '蝴蝶提花', colors: 5 },
      { name: '幸运叶语', code: '6467', weight: '170G', comp: '31.9%棉 31.3%再生纤维 29.8%锦纶 7%氨纶', craft: '叶片提花', colors: 9 },
      { name: '兰精莫代尔罗纹', code: '8416', weight: '220G', comp: '91%兰精莫代尔 9%氨纶', craft: '2×2罗纹', colors: 20 }
    ],

    // 滚动显示状态
    showCraft: false,
    showFabricWall: false,

    // 面料墙图片（上传云存储后替换为 cloud:// 路径）
    fabricWallImgs: [
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-1.jpg',
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-2.jpg',
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-3.jpg',
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-4.jpg',
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-5.jpg',
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-6.jpg',
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-7.jpg',
      'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabric-wall/fw-8.jpg'
    ],

    // 滚动进度条
    craftScrollLeft: 8,
    craftTrackPx: 0,
    craftNoAnim: false
  },

  // 视频进度更新——最后5秒显示logo，循环回头时隐藏
  onVideoTimeUpdate(e) {
    const { currentTime, duration } = e.detail
    if (!duration) return
    const nearEnd = currentTime >= duration - 5
    const looped = currentTime < 1 && this.data.showLogoAnim
    if (nearEnd && !this.data.showLogoAnim) {
      this.setData({ showLogoAnim: true })
    } else if (looped) {
      this.setData({ showLogoAnim: false })
    }
  },

  onLoad() {
    this.setData({
      contactPhone: app.globalData.contactPhone
    })
  },

  onPageScroll({ scrollTop }) {
    const threshold = app.globalData.windowHeight * 0.3
    const shouldTransparent = scrollTop < threshold
    if (this.data.navTransparent !== shouldTransparent) {
      this.setData({ navTransparent: shouldTransparent })
    }
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  onShow() {
    // 首次进入（从splash跳来）不播遮罩，避免与splash动画重复
    if (this._firstShow === undefined) {
      this._firstShow = true
    } else {
      const mask = this.selectComponent('#lmask')
      if (mask) mask.show()
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    // 页面切换淡入过渡
    this.setData({ pageAnimStyle: 'animation: none' })
    setTimeout(() => this.setData({ pageAnimStyle: '' }), 20)
  },

  onReady() {
    this.setupScrollAnimations()
    // 多次尝试初始化 craft 滚动（等 section 渲染完）
    setTimeout(() => this._initCraftScroll(), 800)
    setTimeout(() => this._initCraftScroll(), 2000)
  },

  onUnload() {
    if (this._observers) this._observers.forEach(ob => ob.disconnect())
  },

  // 面料工艺——手动拖拽横滑
  _craftTrackX: 0,
  _craftMaxX: 0,

  _initCraftScroll() {
    const query = wx.createSelectorQuery().in(this)
    query.select('.craft-scroll').boundingClientRect()
    query.select('.craft-track').boundingClientRect()
    query.exec(res => {
      if (!res || !res[0] || !res[1]) return
      const viewW = res[0].width
      const trackW = res[1].width
      if (trackW > viewW) {
        this._craftMaxX = trackW - viewW
      } else {
        this._craftMaxX = Math.max(0, this.data.craftList.length * 160 - viewW)
      }
    })
  },

  onCraftDragStart(e) {
    this._craftDragStartX = e.touches[0].clientX
    this._craftDragStartY = e.touches[0].clientY
    this._craftDragOffset = this._craftTrackX
    this._craftGestureDir = null
    this.setData({ craftNoAnim: true })
  },

  onCraftDragMove(e) {
    const dx = e.touches[0].clientX - this._craftDragStartX
    const dy = e.touches[0].clientY - this._craftDragStartY
    // 首次超过阈値时锁定方向
    if (!this._craftGestureDir && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      this._craftGestureDir = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
    }
    // 竖向手势不处理，让页面正常滚动
    if (this._craftGestureDir !== 'h') return
    let x = this._craftDragOffset + dx
    x = Math.min(0, Math.max(-this._craftMaxX, x))
    this._craftTrackX = x
    const ratio = this._craftMaxX > 0 ? Math.abs(x) / this._craftMaxX : 0
    // 滑块 left: 8rpx ~ 72%（滑块 28%，两端各留 8rpx）
    this.setData({ craftTrackPx: x, craftScrollLeft: 8 + ratio * 64 })
  },

  onCraftDragEnd() {
    this.setData({ craftNoAnim: false })
  },

  // 监听元素进入屏幕可见区域才触发动画
  setupScrollAnimations() {
    const sections = [
      { selector: '.quote-section', key: 'showQuote' },
      { selector: '.craft-section', key: 'showCraft' },
      { selector: '.fabric-wall-section', key: 'showFabricWall' }
    ]
    this._observers = sections.map(({ selector, key }) => {
      const ob = wx.createIntersectionObserver(this, { thresholds: [0.6] })
      ob.relativeToViewport({ bottom: 0 }).observe(selector, (res) => {
        if (res.intersectionRatio >= 0.6 && !this.data[key]) {
          this.setData({ [key]: true })
        }
      })
      return ob
    })

    // 精选面料：双向交叉动画
    const obFeat = wx.createIntersectionObserver(this, { thresholds: [0.1, 0.85] })
    obFeat.relativeToViewport().observe('.featured-vertical', (res) => {
      if (res.intersectionRatio >= 0.85) {
        this.setData({ showFeatured: true, featuredState: 'in' })
      } else if (res.intersectionRatio < 0.1 && this.data.featuredState === 'in') {
        this.setData({ featuredState: 'out' })
      }
    })
    this._observers.push(obFeat)
  },

  goToCategory(e) {
    wx.switchTab({ url: '/pages/category/category' })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  callPhone() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.contactPhone.replace(/-/g, '')
    })
  },

  // 查看电子营业执照
  openBusinessLicense() {
    wx.navigateTo({ url: '/pages/license/license' })
  }
})

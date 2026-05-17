// 家居服面料展示小程序
App({
  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({ env: 'cloud1-d3gfhziqx2f5af184' })
    }
    // 获取系统信息 & 计算自定义导航栏尺寸
    const sysInfo = wx.getWindowInfo()
    this.globalData.statusBarHeight = sysInfo.statusBarHeight
    this.globalData.windowWidth = sysInfo.windowWidth
    this.globalData.windowHeight = sysInfo.windowHeight
    const menuBtn = wx.getMenuButtonBoundingClientRect()
    const rowH = menuBtn.height + (menuBtn.top - sysInfo.statusBarHeight) * 2
    this.globalData.navbarRowHeight = rowH
    this.globalData.navbarHeight = sysInfo.statusBarHeight + rowH
    this.globalData.capsuleWidth = sysInfo.windowWidth - menuBtn.left
  },
  globalData: {
    // 品牌信息（后续替换为真实数据）
    brandName: '乐顺科纺',
    brandSlogan: '专注家居服面料，精研每一寸织物',
    contactPhone: '158-9996-9983',
    contactWechat: 'leshun9983',
    statusBarHeight: 0,
    windowWidth: 375,
    windowHeight: 667,
    navbarRowHeight: 44,
    navbarHeight: 88,
    capsuleWidth: 94,
    // 云存储图片基础路径
    cloudImageBase: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045',
    // 询价页面料预填（详情页→联系页传值）
    inquiryPrefill: ''
  }
})

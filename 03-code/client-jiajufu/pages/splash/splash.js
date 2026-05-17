Page({
  data: {
    animClass: ''
  },

  onLoad() {
    // 短暂延迟后触发渐入
    setTimeout(() => {
      this.setData({ animClass: 'anim-in' })
    }, 100)

    // 1.5秒后触发渐出
    setTimeout(() => {
      this.setData({ animClass: 'anim-out' })
    }, 1500)

    // 渐出结束后跳转首页（替换历史，不能返回splash）
    setTimeout(() => {
      wx.switchTab({ url: '/pages/index/index' })
    }, 2050)
  }
})

const app = getApp()

Component({
  properties: {
    transparent: { type: Boolean, value: false },
    showBack:    { type: Boolean, value: false }
  },

  data: {
    statusBarHeight: 0,
    navbarHeight: 88,
    rowHeight: 44,
    capsuleWidth: 94
  },

  lifetimes: {
    attached() {
      const g = app.globalData
      this.setData({
        statusBarHeight: g.statusBarHeight,
        navbarHeight:    g.navbarHeight,
        rowHeight:       g.navbarRowHeight,
        capsuleWidth:    g.capsuleWidth
      })
    }
  },

  methods: {
    onLeftTap() {
      if (this.properties.showBack) {
        wx.navigateBack()
      } else {
        this.triggerEvent('search')
      }
    }
  }
})

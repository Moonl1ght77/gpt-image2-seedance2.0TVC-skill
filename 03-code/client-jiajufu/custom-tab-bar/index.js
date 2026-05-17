Component({
  data: {
    selected: 0,
    tabs: [
      { key: 'home', pagePath: '/pages/index/index', text: '首页', icon: '/assets/icons/home.png', activeIcon: '/assets/icons/home-active.png' },
      { key: 'fabric', pagePath: '/pages/category/category', text: '面料', icon: '/assets/icons/fabric.png', activeIcon: '/assets/icons/fabric-active.png' },
      { key: 'swatch', pagePath: '/pages/swatch/swatch', text: '色卡', icon: '/assets/icons/swatch.png', activeIcon: '/assets/icons/swatch-active.png' },
      { key: 'about', pagePath: '/pages/about/about', text: '关于', icon: '/assets/icons/about.png', activeIcon: '/assets/icons/about-active.png' },
      { key: 'contact', pagePath: '/pages/contact/contact', text: '联系', icon: '/assets/icons/contact.png', activeIcon: '/assets/icons/contact-active.png' }
    ]
  },

  methods: {
    switchTab(e) {
      const { path, index } = e.currentTarget.dataset
      this.setData({ selected: index })
      wx.switchTab({ url: path })
    }
  }
})

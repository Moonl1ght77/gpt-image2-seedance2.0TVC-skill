// 面料分类页逻辑
const app = getApp()
Page({
  data: {
    navbarHeight: 88,
    activeCategory: 'all',
    animReady: false,

    // 分类标签（按面料类型）
    categories: [
      { id: 'all', name: '全部', count: '5' },
      { id: 'cotton', name: '棉类', count: '2' },
      { id: 'modal', name: '莫代尔', count: '2' },
      { id: 'blend', name: '混纺', count: '1' }
    ],

    // 双列数据
    leftColumn: [],
    rightColumn: [],

    // 真实面料数据（乐顺科纺）
    allFabrics: [
      { id: '3092', name: '云皱棉', spec: '210G · 155CM', cat: 'cotton', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/3092-detail.jpg', bg: 'linear-gradient(135deg, #F5EDE3, #E0D0BC)', imgHeight: 360, colors: ['#FFF8DC', '#FAEBD7', '#F5DEB3', '#DEB887'], colorCount: 9, desc: '95%棉 5%氨纶 · 自然皱感纹理' },
      { id: '3100', name: '菱朵棉', spec: '160G · 170CM', cat: 'cotton', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/3100-detail.jpg', bg: 'linear-gradient(135deg, #EDE5F0, #D8D0E0)', imgHeight: 340, colors: ['#F0E8F5', '#FFFACD', '#D8E8D8', '#E8D8E0'], colorCount: 7, desc: '95%棉 5%氨纶 · 菱形提花柔肤' },
      { id: '6049', name: '蝴蝶园林', spec: '190G · 160CM', cat: 'modal', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/6049-detail.jpg', bg: 'linear-gradient(135deg, #F0E0D8, #E0CFC2)', imgHeight: 380, colors: ['#FFF0F0', '#FFE8E0', '#D8E0F0', '#E0E8D8'], colorCount: 5, desc: '46%棉 46%莫代尔 8%氨纶 · 精致蝴蝶提花' },
      { id: '6467', name: '幸运叶语', spec: '170G · 160CM', cat: 'blend', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/6467-detail.jpg', bg: 'linear-gradient(135deg, #E8E0D8, #D5CCC0)', imgHeight: 320, colors: ['#F8F0F0', '#F0E8E0', '#E8E0F0', '#D8E8E0'], colorCount: 9, desc: '棉+再生纤维+锦纶 · 叶片提花' },
      { id: '8416', name: '兰精莫代尔2×2罗纹', spec: '220G · 155CM', cat: 'modal', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/8416-detail.jpg', bg: 'linear-gradient(135deg, #D5DDD5, #B8C5B8)', imgHeight: 360, colors: ['#F5F0F0', '#FFD0D8', '#B8C8D8', '#C8B8A0'], colorCount: 20, desc: '91%兰精莫代尔 9%氨纶 · 高端罗纹质感' }
    ]
  },

  onLoad() {
    this.setData({ navbarHeight: app.globalData.navbarHeight })
    this.loadFabrics('all')
  },

  onShow() {
    const mask = this.selectComponent('#lmask')
    if (mask) mask.show()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    this.setData({ pageAnimStyle: 'animation: none' })
    setTimeout(() => this.setData({ pageAnimStyle: '' }), 20)
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  switchCategory(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ activeCategory: id, animReady: false })
    this.loadFabrics(id)
  },

  loadFabrics(categoryId) {
    let list = this.data.allFabrics
    if (categoryId !== 'all') {
      list = list.filter(f => f.cat === categoryId)
    }

    // 分配到左右两列（模拟瀑布流）
    const left = []
    const right = []
    let leftH = 0
    let rightH = 0

    list.forEach(item => {
      if (leftH <= rightH) {
        left.push(item)
        leftH += item.imgHeight
      } else {
        right.push(item)
        rightH += item.imgHeight
      }
    })

    this.setData({
      leftColumn: left,
      rightColumn: right
    })

    // 触发入场动画
    setTimeout(() => {
      this.setData({ animReady: true })
    }, 50)
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})

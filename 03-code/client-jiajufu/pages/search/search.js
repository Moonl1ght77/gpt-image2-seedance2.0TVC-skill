// 搜索页逻辑
const app = getApp()

// 面料数据（与 category.js 保持一致）
const ALL_FABRICS = [
  { id: '3092', name: '云皱棉', spec: '210G · 155CM', cat: 'cotton', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/3092-detail.jpg', bg: 'linear-gradient(135deg, #F5EDE3, #E0D0BC)', colors: ['#FFF8DC', '#FAEBD7', '#F5DEB3', '#DEB887'], colorCount: 9, desc: '95%棉 5%氨纶 · 自然皱感纹理' },
  { id: '3100', name: '菱朵棉', spec: '160G · 170CM', cat: 'cotton', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/3100-detail.jpg', bg: 'linear-gradient(135deg, #EDE5F0, #D8D0E0)', colors: ['#F0E8F5', '#FFFACD', '#D8E8D8', '#E8D8E0'], colorCount: 7, desc: '95%棉 5%氨纶 · 菱形提花柔肤' },
  { id: '6049', name: '蝴蝶园林', spec: '190G · 160CM', cat: 'modal', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/6049-detail.jpg', bg: 'linear-gradient(135deg, #F0E0D8, #E0CFC2)', colors: ['#FFF0F0', '#FFE8E0', '#D8E0F0', '#E0E8D8'], colorCount: 5, desc: '46%棉 46%莫代尔 8%氨纶 · 精致蝴蝶提花' },
  { id: '6467', name: '幸运叶语', spec: '170G · 160CM', cat: 'blend', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/6467-detail.jpg', bg: 'linear-gradient(135deg, #E8E0D8, #D5CCC0)', colors: ['#F8F0F0', '#F0E8E0', '#E8E0F0', '#D8E8E0'], colorCount: 9, desc: '棉+再生纤维+锦纶 · 叶片提花' },
  { id: '8416', name: '兰精莫代尔2×2罗纹', spec: '220G · 155CM', cat: 'modal', img: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/8416-detail.jpg', bg: 'linear-gradient(135deg, #D5DDD5, #B8C5B8)', colors: ['#F5F0F0', '#FFD0D8', '#B8C8D8', '#C8B8A0'], colorCount: 20, desc: '91%兰精莫代尔 9%氨纶 · 高端罗纹质感' }
]

const HISTORY_KEY = 'searchHistory'
const RECENT_KEY = 'recentViewed'
const MAX_HISTORY = 8
const MAX_RECENT = 10

Page({
  data: {
    navbarHeight: 0,
    scrollHeight: 500,
    autoFocus: true,
    keyword: '',
    showResults: false,
    results: [],
    searchHistory: [],
    recentViewed: [],
    hotSearch: ['云皱棉', '菱朵棉', '莫代尔', '罗纹', '蝴蝶园林', '幸运叶语', '棉类', '提花', '混纺', '亲肤']
  },

  onLoad(options) {
    const navH = app.globalData.navbarHeight || 44
    // 搜索栏高度 = navbarHeight(px) + 16(上边距) + 72rpx换px(约36) + 20(下边距) ≈ navbarHeight + 72
    const sys = wx.getSystemInfoSync()
    const searchBarH = navH + 72
    const scrollH = sys.windowHeight - searchBarH
    this.setData({ navbarHeight: navH, scrollHeight: scrollH })
    this._loadStorage()
    // 从外部跳转携带关键词时直接搜索
    if (options.keyword) {
      this.setData({ keyword: options.keyword, autoFocus: false })
      this._search(options.keyword)
    }
  },

  onShow() {
    this._loadStorage()
  },

  _loadStorage() {
    const history = wx.getStorageSync(HISTORY_KEY) || []
    const recent = wx.getStorageSync(RECENT_KEY) || []
    this.setData({ searchHistory: history, recentViewed: recent })
  },

  onInput(e) {
    const kw = e.detail.value
    this.setData({ keyword: kw })
    if (!kw) {
      this.setData({ showResults: false, results: [] })
    }
  },

  clearKeyword() {
    this.setData({ keyword: '', showResults: false, results: [] })
  },

  doSearch() {
    const kw = this.data.keyword.trim()
    if (!kw) return
    this._saveHistory(kw)
    this._search(kw)
  },

  tapTag(e) {
    const word = e.currentTarget.dataset.word
    this.setData({ keyword: word })
    this._saveHistory(word)
    this._search(word)
  },

  _search(kw) {
    const lower = kw.toLowerCase()
    const results = ALL_FABRICS.filter(f =>
      f.name.includes(kw) ||
      f.desc.includes(kw) ||
      f.spec.toLowerCase().includes(lower) ||
      f.id.includes(kw)
    )
    this.setData({ showResults: true, results })
  },

  _saveHistory(kw) {
    let history = wx.getStorageSync(HISTORY_KEY) || []
    history = history.filter(h => h !== kw)
    history.unshift(kw)
    if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY)
    wx.setStorageSync(HISTORY_KEY, history)
    this.setData({ searchHistory: history })
  },

  clearHistory() {
    wx.removeStorageSync(HISTORY_KEY)
    this.setData({ searchHistory: [] })
  },

  clearRecent() {
    wx.removeStorageSync(RECENT_KEY)
    this.setData({ recentViewed: [] })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  goBack() {
    wx.navigateBack({ delta: 1 })
  }
})

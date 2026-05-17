// 色卡库页面
const app = getApp()
Page({
  data: {
    navbarHeight: 88,
    activeFabric: 0,
    currentFabric: null,
    totalColors: 0,

    // 真实面料数据（乐顺科纺）
    fabrics: [
      {
        id: '3092',
        name: '云皱棉',
        nameEn: '3092# Cloud Crepe Cotton',
        spec: '95%棉 5%氨纶 · 210G · 155CM',
        previewColors: ['#FFFFF0', '#F5DEB3', '#8B7355'],
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
        ]
      },
      {
        id: '3100',
        name: '菱朵棉',
        nameEn: '3100# Diamond Cotton',
        spec: '95%棉 5%氨纶 · 160G · 170CM',
        previewColors: ['#E8D8F0', '#FFFACD', '#D8B8C0'],
        colorCards: [
          { number: '01', name: '本白', hex: '#FFFFF0' },
          { number: '02', name: '浅粉', hex: '#FFF0F0' },
          { number: '03', name: '浅黄', hex: '#FFFACD' },
          { number: '04', name: '浅米', hex: '#FFF8DC' },
          { number: '05', name: '浅粉紫', hex: '#E8D0E0' },
          { number: '06', name: '浅绿', hex: '#D8E8D0' },
          { number: '07', name: '浅灰粉', hex: '#E8D8D8' }
        ]
      },
      {
        id: '6049',
        name: '蝴蝶园林',
        nameEn: '6049# Butterfly Garden',
        spec: '46%棉 46%莫代尔 8%氨纶 · 190G · 160CM',
        previewColors: ['#FFF0F0', '#D8E0F0', '#E0E8D8'],
        colorCards: [
          { number: '01', name: '本白', hex: '#FFF8F5' },
          { number: '02', name: '浅粉', hex: '#FFE8E0' },
          { number: '03', name: '浅蓝', hex: '#D8E0F0' },
          { number: '04', name: '浅绿', hex: '#E0E8D8' },
          { number: '05', name: '浅紫', hex: '#D8D0E8' }
        ]
      },
      {
        id: '6467',
        name: '幸运叶语',
        nameEn: '6467# Lucky Leaf',
        spec: '31.9%棉 31.3%再生纤维 29.8%锦纶 7%氨纶 · 170G · 160CM',
        previewColors: ['#FFF8F5', '#EDD8E0', '#7BBCBE'],
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
        ]
      },
      {
        id: '8416',
        name: '兰精莫代尔2×2罗纹',
        nameEn: '8416# Lenzing Modal Rib',
        spec: '91%兰精莫代尔 9%氨纶 · 220G · 155CM',
        previewColors: ['#F5F0EC', '#6890C0', '#1A1A1A'],
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
        ]
      }
    ]
  },

  onShow() {
    const mask = this.selectComponent('#lmask')
    if (mask) mask.show()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    this.setData({ pageAnimStyle: 'animation: none' })
    setTimeout(() => this.setData({ pageAnimStyle: '' }), 20)
  },

  onLoad(options) {
    const fabricIndex = options.fabricIndex ? parseInt(options.fabricIndex) : 0
    const total = this.data.fabrics.reduce((sum, f) => sum + f.colorCards.length, 0)
    this.setData({
      navbarHeight: app.globalData.navbarHeight,
      activeFabric: fabricIndex,
      currentFabric: this.data.fabrics[fabricIndex],
      totalColors: total,
      swatchBase: 'cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/fabrics/swatches'
    })
  },

  // 切换面料分类
  onFabricTab(e) {
    const idx = e.currentTarget.dataset.index
    this.setData({
      activeFabric: idx,
      currentFabric: this.data.fabrics[idx]
    })
    // 回到顶部
    wx.pageScrollTo({ scrollTop: 0, duration: 300 })
  },

  // 点击色号 → 跳转详情页
  onSwatchTap(e) {
    const { fabricIndex, colorIndex } = e.currentTarget.dataset
    const fabric = this.data.fabrics[fabricIndex]
    wx.navigateTo({
      url: `/pages/detail/detail?fabricId=${fabric.id}&colorIndex=${colorIndex}`
    })
  }
})

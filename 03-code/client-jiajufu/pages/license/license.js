// 电子营业执照页
const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    loading: true,
    imageUrl: ''
  },

  onLoad() {
    this.setData({ statusBarHeight: app.globalData.statusBarHeight })
    this.loadLicense()
  },

  // 从云存储获取营业执照临时链接
  loadLicense() {
    wx.cloud.getTempFileURL({
      fileList: ['cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/营业执照.jpg'],
      success: (res) => {
        this.setData({
          loading: false,
          imageUrl: res.fileList[0].tempFileURL
        })
      },
      fail: () => {
        this.setData({ loading: false })
      }
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})

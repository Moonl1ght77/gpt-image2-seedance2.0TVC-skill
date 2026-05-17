// 联系我们页面逻辑
const app = getApp()

Page({
  data: {
    navbarHeight: 88,
    contactPhone: '',
    contactWechat: '',
    address: '广东省广州市（待更新具体地址）',

    // 表单数据
    formName: '',
    formPhone: '',
    formFabric: '',
    formRemark: ''
  },

  onShow() {
    const mask = this.selectComponent('#lmask')
    if (mask) mask.show()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
    this.setData({ pageAnimStyle: 'animation: none' })
    setTimeout(() => this.setData({ pageAnimStyle: '' }), 20)

    // 接收详情页传来的面料预填信息
    const prefill = app.globalData.inquiryPrefill
    if (prefill) {
      this.setData({ formFabric: prefill })
      app.globalData.inquiryPrefill = ''
    }
  },

  onLoad() {
    this.setData({
      navbarHeight: app.globalData.navbarHeight,
      contactPhone: app.globalData.contactPhone,
      contactWechat: app.globalData.contactWechat
    })
  },

  // 拨打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.contactPhone.replace(/-/g, '')
    })
  },

  // 复制微信号
  copyWechat() {
    wx.setClipboardData({
      data: app.globalData.contactWechat,
      success() {
        wx.showToast({ title: '微信号已复制', icon: 'success' })
      }
    })
  },

  // 表单输入
  onNameInput(e) { this.setData({ formName: e.detail.value }) },
  onPhoneInput(e) { this.setData({ formPhone: e.detail.value }) },
  onFabricInput(e) { this.setData({ formFabric: e.detail.value }) },
  onRemarkInput(e) { this.setData({ formRemark: e.detail.value }) },

  // 提交询价 — 写入云数据库 inquiries 集合
  submitInquiry() {
    const { formName, formPhone, formFabric, formRemark } = this.data

    if (!formName.trim()) {
      wx.showToast({ title: '请输入您的称呼', icon: 'none' })
      return
    }
    if (!formPhone.trim() || formPhone.length < 11) {
      wx.showToast({ title: '请输入正确的电话号码', icon: 'none' })
      return
    }
    if (!formFabric.trim()) {
      wx.showToast({ title: '请输入感兴趣的面料', icon: 'none' })
      return
    }

    const db = wx.cloud.database()
    wx.showLoading({ title: '提交中...' })

    db.collection('inquiries').add({
      data: {
        name: formName.trim(),
        phone: formPhone.trim(),
        fabric: formFabric.trim(),
        remark: formRemark.trim(),
        submitTime: db.serverDate()
      },
      success: (res) => {
        wx.hideLoading()
        wx.showModal({
          title: '提交成功 ✓',
          content: '我们会在 24 小时内与您联系，感谢您的询价！',
          showCancel: false,
          confirmText: '好的'
        })
        this.setData({ formName: '', formPhone: '', formFabric: '', formRemark: '' })
        // 异步触发通知推送（失败不影响主流程）
        const now = new Date().toLocaleString('zh-CN', { hour12: false })
        wx.cloud.callFunction({
          name: 'notifyInquiry',
          data: { name: formName.trim(), phone: formPhone.trim(), fabric: formFabric.trim(), remark: formRemark.trim(), submitTime: now }
        }).catch(e => console.warn('[通知] 推送失败（不影响提交）', e))
      },
      fail: (err) => {
        wx.hideLoading()
        console.error('[询价] 写库失败', err)
        wx.showToast({ title: '提交失败，请稍后重试', icon: 'none' })
      }
    })
  },

  // 商家开启询价通知（商家本人点击，订阅后openid存入数据库）
  subscribeMerchantNotify() {
    wx.requestSubscribeMessage({
      // ⚠️ 替换为你在微信公众平台申请到的模板ID
      tmplIds: ['TEMPLATE_ID_HERE'],
      success: (res) => {
        if (res['TEMPLATE_ID_HERE'] === 'accept') {
          wx.cloud.callFunction({ name: 'saveMerchantOpenid' }).then(() => {
            wx.showToast({ title: '通知已开启 ✓', icon: 'success' })
          })
        } else {
          wx.showToast({ title: '已取消，通知未开启', icon: 'none' })
        }
      },
      fail: () => wx.showToast({ title: '操作失败，请重试', icon: 'none' })
    })
  }
})

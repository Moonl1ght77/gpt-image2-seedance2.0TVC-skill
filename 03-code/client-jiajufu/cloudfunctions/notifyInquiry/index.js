// 云函数：有新询价时向商家推送订阅消息
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// ⚠️ 使用前必须替换：
// 1. TEMPLATE_ID_HERE → 在微信公众平台申请的订阅消息模板ID
// 2. 确保商家已在小程序里点过"开启询价通知"按钮（保存openid到数据库）
const TEMPLATE_ID = 'TEMPLATE_ID_HERE'

exports.main = async (event) => {
  const { name, phone, fabric, remark, submitTime } = event

  // 1. 从数据库读取商家 openid
  let merchantOpenid
  try {
    const res = await db.collection('merchant_config').doc('main').get()
    merchantOpenid = res.data.openid
  } catch (e) {
    console.error('[notifyInquiry] 未找到商家openid，请先点击小程序里的"开启询价通知"', e)
    return { success: false, msg: '商家尚未开启通知' }
  }

  if (!merchantOpenid) {
    return { success: false, msg: '商家openid为空' }
  }

  // 2. 发送订阅消息
  try {
    await cloud.openapi.subscribeMessage.send({
      touser: merchantOpenid,
      templateId: TEMPLATE_ID,
      page: 'pages/contact/contact',
      // 模板字段（需与申请的模板字段一一对应）
      data: {
        thing1: { value: fabric || '未填写' },          // 询价面料
        phone_number2: { value: phone || '未填写' },     // 联系电话
        name3: { value: name || '未填写' },              // 客户姓名
        time4: { value: submitTime || new Date().toLocaleString('zh-CN') } // 提交时间
      }
    })
    return { success: true }
  } catch (e) {
    console.error('[notifyInquiry] 发送失败', e)
    return { success: false, msg: e.errMsg || '发送失败' }
  }
}

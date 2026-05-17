// 云函数：保存商家 openid 到数据库（商家点"开启询价通知"时触发）
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async () => {
  // 从云函数上下文自动获取调用者的 openid（无需前端传递，安全可靠）
  const { OPENID } = cloud.getWXContext()

  try {
    // 用 set 代替 add，避免重复写入（幂等操作）
    await db.collection('merchant_config').doc('main').set({
      data: {
        openid: OPENID,
        updatedAt: db.serverDate()
      }
    })
    return { success: true, openid: OPENID }
  } catch (e) {
    console.error('[saveMerchantOpenid] 写库失败', e)
    return { success: false, msg: e.errMsg }
  }
}

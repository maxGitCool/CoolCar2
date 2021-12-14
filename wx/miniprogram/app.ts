// app.ts
import { getSetting, getUserInfo } from "./utils/util"

let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void

App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve, reject) => {
      resolveUserInfo = resolve
      rejectUserInfo = reject
    })
  },
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })

    // // 获取用户信息
    //  promise写法
    // getSetting().then(res => {
    //   if (res.authSetting['scope.userInfo']) {
    //     return getUserInfo()
    //   }
    //   return undefined
    // }).then(res => {
    //   if (!res)
    //     return
    //   resolveUserInfo(res.userInfo)   
    // }).catch(rejectUserInfo)

    // async / await 写法
    try {
      const res = await getSetting()
      if (res.authSetting['scope.userInfo']) {
        const awaituserInfo = await getUserInfo()
        resolveUserInfo(awaituserInfo.userInfo)   
      }
    }
    catch(err){
      rejectUserInfo(err)
    }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfo(userInfo)
  },
  rejectUserInfo(reason?: any) {
    rejectUserInfo(reason)
  },
},
)
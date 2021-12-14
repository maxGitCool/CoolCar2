// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World 小杨酷车',
    userInfo: {},
    hasUserInfo: false,//是否取到userInfo
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  async onLoad() {
    // // @ts-ignore
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: false
    //   })
    // }
    // 原始写法
    // if(app.globalData.userInfo){
    //    this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于getuserInfo是网络请求，可能会在page.Load之后才返回
    //   // 所以加入Call Back 以防止这种情况
    //   app.userInfoReadyCallback = res =>{
    //     this.setData({
    //     userInfo: res.userInfo,
    //     hasUserInfo: true,
    //     })
    //   }
    // } else {
    //   // 在没有【open-type="getUserInfo"】版本的兼容处理
    // }
    // promise写法
    // app.globalData.userInfo.then((userInfo)=>{
    //   this.setData({
    //     userInfo: userInfo,
    //     hasUserInfo: true
    //   })
    // })
    // asyn / await 写法
    const awaituserInfo = await app.globalData.userInfo 
    this.setData({
      userInfo: awaituserInfo,
      hasUserInfo: true
    })
    // 演示函数式编程闭包处理
    // this.updateMotto()
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    const userInfo: WechatMiniprogram.UserInfo = e
    app.resolveUserInfo(userInfo)
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  // 函数式编程及闭包
  updateMotto(){
    let count:number= 0
    let shouldStop:boolean= false
    setTimeout(() => {
      shouldStop = true
    }, 1000)
    // 使用箭头函数更好理解
    const update = () => {
      count++
      if(!shouldStop){
        this.setData({
          motto : `update count : ${count}`,
        },()=>{
          update()
        })
      }
    }
    // 不断调用
    update()
  }, 

})

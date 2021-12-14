

interface IAppOption {
  globalData: {
    // 第1步代码
    //userInfo?: WechatMiniprogram.UserInfo,

    // 第1步代码修改
    userInfo : Promise<WechatMiniprogram.UserInfo>,
  }
  resolveUserInfo(userInfo:WechatMiniprogram.UserInfo):void
  rejectUserInfo(reason?: any):void
  //  第1步代码
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
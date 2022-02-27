
import {post,get} from "../../utils/http/api.js"
import {SM4DeCrypto,SM4EnCrypto} from "../../utils/crypto/crypto"
import {SM4EnCrypto_ECB,SM4DeCrypto_ECB} from "../../utils/crypto/sm4"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account:'11020024',
    password:'1320',
    loginForm:{},
  },
  /*
  *自定义
  */
 /**
  * 输入框双向绑定
  * @param {*} e 
  */
 listenName:function(e){

 },
 /**
  * 获取登录信息
  */
 login:function(e){
/*
*获取登录信息
 */
if(e.detail.value.username&&e.detail.value.password){
  this.setData({
    loginForm:{lg:SM4EnCrypto_ECB(e.detail.value)},
  })
  /**
   * 对密码加密
   */

  get("/login",this.data.loginForm).then(res=>{
    /**
     * status：13201-密码错误；13204账号不存在；200演出成功
     * 
     */
    if(res.status==200){ //登录验证成功
      wx.setStorage({ //缓存数据
        key:"userInfo",
        data:JSON.stringify(res.result),
      })
      wx.navigateBack({
        delta: 1,
      })
     /* wx.switchTab({
        url: '/pages/person/person',
      })*/
    }
    else{
      this.messageTip(res.msg)

    }
    console.log(res)
  });
}
else{
  this.messageTip("内容不能为空")
}

 },
  /*
  *登录
  */
 /*
 login:function(){
   console.log("登录成功")
   post("/api/v2/login",this.loginForm).then(res=>{
     console.log(res)
   });
 },*/
 /*注册
 * 
 */
 registerAccount:function(){
   /**
    * 跳转注册页面
    */
   wx.navigateTo({
     url: '/pages/register/register',
   })

 },
  /*忘记密码
 * 
 */
forgetPassword:function(){
  console.log(SM4EnCrypto_ECB("你是"))
  console.log(SM4DeCrypto_ECB("/txOEyNA+xKUbdqGX04ncw=="))
},
/**
 * 信息提示
 */
messageTip:(msg)=>{
  wx.showToast({
    title: msg,
    icon:'none',
    duration:2000
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }


})
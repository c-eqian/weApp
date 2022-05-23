// pages/register/register.js
import{messageTip} from "../../utils/public/public";
import {post} from "../../utils/http/api"
import {SM4DeCrypto_ECB,SM4EnCrypto_ECB} from "../../utils/crypto/sm4"
let timeNum = 6 //60秒倒计时
let countDownTime = timeNum
let timer; //计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip:"",
    idCard:"",
    name:"",
    password:"",
    ackPassword:"",
    codeColor: "#0271c1",
    codeText: "获取验证码"

  },
/**
 * 正则校验身份证格式
 */
regIdCard:function(e){
  var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if(pattern.test(e.detail.value)){
    this.setData({
      idCard:SM4EnCrypto_ECB(e.detail.value),/**对身份证加密 */
      tip:"",
    })
  }
  else{
    this.setData({
      tip:"身份证格式不正确",
    })
  }
  if(e.detail.value==""){
    this.setData({
      idCard:"",
      tip:"",
    })
  }

},
/**
 * 双向绑定，正则校验
 */
regPassword:function(e){
  this.setData({
    password:e.detail.value,
  })


},
/**
 * 双向绑定，正则校验
 */
regAckPassword:function(e){
  if(e.detail.value==this.data.password){
    this.setData({
      ackPassword:e.detail.value,
      tip:""
    })

  }else{
    this.setData({
      tip:"密码不一致"
    })
  }
  if(e.detail.value==""){
    this.setData({
      tip:"",
      ackPassword:""
    })
  }

},
/**
 * 提交
 */
register:function(e){
  if(this.data.password==this.data.ackPassword&&this.data.password!=""&&this.data.idCard!=""){
   post("/register",
   {
     password:SM4EnCrypto_ECB(this.data.password),
     name:e.detail.value.name,
     idCard:this.data.idCard
   }
   ).then(res=>{
     messageTip(res.msg)
   })
  }
  else{
    messageTip("输入信息有误，请检查")
  }
  
  

},
   //获取验证码
   getCode() {
    if (countDownTime == timeNum) {
      this.setInterval()
      this.setData({
        codeColor: "#e6252b",
        codeText: countDownTime + "s"
      })
    } else {
      wx.showToast({
        title: '请等待验证码',
        icon: "none"
      })
    }
  },

  // 计时器
  setInterval: function() {
    const that = this
    timer = setInterval(function() { // 设置定时器
      countDownTime--
      if (countDownTime < 2) {
        clearInterval(timer)
        that.setData({
          codeColor: "#0271c1",
          codeText: "获取验证码"
        })
        countDownTime = timeNum
      } else {
        that.setData({
          codeColor: "#e6252b",
          codeText: countDownTime + "s"
        })
      }
      console.log(countDownTime + "s")
    }, 1000)
  },
  /**
   * 
   * @param {*} options 
   */
  /**
   * 自定义函数
   */
  /**
   * 跳转登录页面
   */
  toLoginFuc:function(){ 
    wx.redirectTo({
      url: '/pages/login/login',
    })

  },
  /**
   * 跳转忘记密码页面
   * @param {*} options 
   */
  toForgetFuc:function(){
    messageTip("功能开发中")

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
    wx.setNavigationBarTitle({
      title: '开通账号',
    })

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
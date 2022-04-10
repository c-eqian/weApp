// pages/qrcode/qrcode.js
const app = getApp()
let drawQrcode = require("../../utils/public/weapp-qrcode.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    RequisitionId:"(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤",
  },

  ewmChange(){
    let size = {}
    size.w = wx.getSystemInfoSync().windowWidth / 750 * 600
    size.h = size.w
    var that = this

    drawQrcode({
      width: size.w,
      height: size.h,
      canvasId: 'myQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      text: that.data.RequisitionId,
      // v1.0.0+版本支持在二维码上绘制图片
    })
  },

  ewmText(e){
    this.setData({
      text: e.detail.value
    })
  },

  searchFn(){
    this.ewmChange()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      RequisitionId:options.userId?options.RequisitionId:""
    })
    this.ewmChange()
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
// pages/index/index.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var app = getApp();
let QQMapWX = require('../../utils/mapApi/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: "",
    latitude: "",
    longitude: "",
    scale: 14,
    // 图标定位
    markers: [],
    skew: 0,
    rotate: 0,
    showLocation: true,
    showScale: false,
    subKey: '',
    layerStyle: 1,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    showCompass: false,
    enable3D: false,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: true,
    enablebuilding:true

  },
/**
 * 获取当前位置
 */
getLocation:function(){
 // 调用接口
 /*qqmapsdk.getCityList({
  success: function (res) {
      console.log(res);
  },
  fail: function (res) {
      console.log(res);
  },
});*/
var self = this;
wx.openLocation({
  latitude: parseFloat(self.data.latitude),//经度
  longitude: parseFloat(self.data.longitude),//纬度
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: 'https://apis.map.qq.com/ws/location/v1/ip?key=PVJBZ-FX5L2-H57UJ-C5S7R-YUDHS-KDBW7',
      method: 'GET',
      timeout: 0,
      success: (result) => {
        self.setData({
          latitude:result.data.result.location.lat,
          longitude:result.data.result.location.lng,
        })
        console.log(result)
      },
      fail: (res) => {
        console.log(res)
      },
    })
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
          key: 'PVJBZ-FX5L2-H57UJ-C5S7R-YUDHS-KDBW7'
      });
      /** 
       * 获取位置经纬度
       */
    /*wx.getLocation({
      altitude: true,
      highAccuracyExpireTime: 5000,
      isHighAccuracy: true,
      type: 'gcj02',
      success: (result) => {
        console.log(result)
      },
      fail: (res) => {},
    })*/
   //   self.getLocation();
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
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        current: 0  // 索引为0，是第一个tab
      })
  }
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
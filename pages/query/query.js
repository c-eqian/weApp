// pages/query/query.js
import {messageTip} from "../../static/public"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerTab:[
      {"index":"1","num":"序号","name":"姓名","status":"状态","date":"时间"},
    ],
    listData:[
      {"code":"01","text":"text1","type":"type1","date":"2021-12-03"},
      {"code":"02","text":"text2","type":"type2","date":"2021-12-03"},
      {"code":"03","text":"text3","type":"type3","date":"2021-12-03"},
      {"code":"04","text":"text4","type":"type4","date":"2021-12-03"},
      {"code":"05","text":"text5","type":"type5","date":"2021-12-03"},
      {"code":"06","text":"text6","type":"type6","date":"2021-12-03"},
      {"code":"07","text":"text7","type":"type7","date":"2021-12-03"},
      {"code":"01","text":"text1","type":"type1","date":"2021-12-03"},
      {"code":"02","text":"text2","type":"type2","date":"2021-12-03"},
      {"code":"03","text":"text3","type":"type3","date":"2021-12-03"},
      {"code":"04","text":"text4","type":"type4","date":"2021-12-03"},
      {"code":"05","text":"text5","type":"type5","date":"2021-12-03"},
      {"code":"06","text":"text6","type":"type6","date":"2021-12-03"},
      {"code":"07","text":"text7","type":"type7","date":"2021-12-03"}
      ]
  },
/**
 * 自定义函数
 */
/** 
   * 点击表格一行
   */
  onRowClick: function(e) {
    console.log('e: ', e)
  },
query:function(){
 // var page= getCurrentPages();
  messageTip("查询成功");
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
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        current: 1  // 索引为0，是第一个tab
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
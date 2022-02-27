// pages/listItem/listItem.js
import {post,get} from "../../utils/http/api";
import{messageTip} from "../../utils/public/public";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"暂无数据",
    PID:"",
    type:1,//查询类型（已知条码1，未知0）
    listItem:[]

  },
/**
 * 自定义
 * @param {*} options 
 */

/**
 * 
 * 列表点击事件
 */
getItem:function(e){

  var recv = e.currentTarget.dataset.item,
      url = "",
      data = {};
  if(recv.FeeItemCode =="10020010" ){
    url = "/abdomenDetails"
    data=    {
      FeeItemCode:recv.FeeItemCode,
      RequisitionId:recv.RequisitionId
    }

  }else if(recv.FeeItemCode =="10020020"){ 
    url = "/EcgDetails";
    data=    {
      FeeItemCode:recv.FeeItemCode,
      RequisitionId:recv.RequisitionId
    }
  }else if(recv.FeeItemCode =="0"||recv.FeeItemCode ==0){
    url = "/basicDetails";
    data=    {
      RequisitionId:recv.RequisitionId
    }
  }
  else{
    url = "/urineTestItemDetails"
    data=    {
      FeeItemCode:recv.FeeItemCode,
      RequisitionId:recv.RequisitionId
    }
  }
  /**
   * 如果是基本情况，使用GET方式，否则POST请求
   */
  if(recv.FeeItemCode =="0"||recv.FeeItemCode ==0){
    get(
      url,
      data
  
    ).then(res=>{
      if(res.status==200){ //获取成功，跳转
        wx.navigateTo({
          url: `/pages/Physicaldetails/Physicaldetails?res=${JSON.stringify(res.result)}&&type=0&&${recv.FeeItemName}`,
        })
      }
      else{
        messageTip(res.msg)
      }

    })
  }
  else{
    post(
      url,
      data
  
    ).then(res=>{
      if(res.status==200){
        wx.navigateTo({
          url: `/pages/Physicaldetails/Physicaldetails?res=${JSON.stringify(res.result)}&&type=1&&FeeItemName=${recv.FeeItemName}`,
        })
      }else{
        messageTip(res.msg)
      }
    })
  }

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = JSON.parse(options.res)
    if(res.status==200){
      this.setData({
        listItem:res.result
      })

    }else{
      messageTip(res.msg)
      this.setData({
        msg:res.msg
      })
    }

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
   /* var that = this;
    var url = '';
    var data = {}
    if(parseInt(this.data.type)==1){
      url =  "/api/v2/urineTestItemList";
      data= {RequisitionId:this.data.PID }
    }else if(parseInt(this.data.type)==0){
      url =  "/api/v2/zcurineTestItemList";
      data= {personMark:this.data.PID }
    }
    get(
     url,
     data
    ).then(res=>{
      if(res.status==200){
        that.setData({
          listItem:res.result,
        })
      }else{
        that.setData({
          msg:res.msg,
        })
      }
      console.log(res)
    })
*/
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
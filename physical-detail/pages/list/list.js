// pages/list/list.js
import {get, post} from "../../../utils/http/api";
import { result } from "../../../utils/http/request"
import{messageTip,getUserId} from "../../../utils/public/public";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"暂无数据",
    PID:"",
    list:[],
    page:1,
    limit:30
  },
  //体检记录列表
  allList(){
    /**
   * 全部
   */
  var that = this;
  var userId = getUserId();
  if (userId!=0||!userId){
    get(
      "/physicalList",
      {
        userId:userId,
       page:that.data.page||1,
       limit:that.data.limit||30
      }
    ).then(res=>{
    if(res.status==200){
      this.setData({
        list:res.result
      })
    }else{
      this.setData({
        msg:res.msg
      })
    }
    })
  }else{
    messageTip("登录过期，请重新登录!")
  }
  
  },
/**
 * 自定义
 * @param {*} options 
 */
getItem:function(e){
    var rid = e.currentTarget.dataset.item.RequisitionId
    var that = this;
    var url = '';
    var data = {}
    url =  "/urineTestItemList";
    data= {RequisitionId:rid}
    // get(
    //  url,
    //  data
    // ).then(res=>{
    //   if(res.status==200){
    //     wx.setStorage({
    //       key:"list",
    //       data:JSON.stringify(res.result)
    //     })
    //   }
    //   wx.navigateTo({
    //     url: `/pages/listItem/listItem?res=${JSON.stringify(res)}`,
    //   })
    // })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    result({
      url: 'http://175.178.157.42:7090/v1/phy_exam_List',
      data:{
        idcard: "452528193812170017"
      }
    }).then((res)=>{
      console.log(res)
       if(res.data === '' || res.data ==='无数据'){ this.setData({empty:true}); return}
        let list = res.data
        list.forEach((item)=>{
          item.phy_exam_date= item.phy_exam_date.substring(0,10)
        })
        this.setData({
          list
        })
    })
  },
  //跳转事件
  handitem(data){
    let folup_no = data.target.dataset.folup_no || data.currentTarget.dataset.folup_no 
    wx.navigateTo({
      url: '/physical-detail/pages/tijian_details/index?folup_no='+ folup_no +'',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  wx.setNavigationBarTitle({
    title: '体检记录',
  })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  // this.allList() 
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
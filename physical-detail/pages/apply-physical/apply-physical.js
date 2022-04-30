// pages/apply-physical/apply-physical.js
import{messageTip,genderHandle,getUserId} from "../../../utils/public/public";
import {selfDialog} from "../../../utils/public/public"
import {SM4EnCrypto_ECB,SM4DeCrypto_ECB} from "../../../utils/crypto/sm4"
import {post,get} from "../../../utils/http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    result: [],
  },
  /**
   * 
   * @param 提交 event 
   */
  submit(){
    var that = this;
    if(this.data.result.length==0){
      messageTip("请选择")
    }else{
      var userId = getUserId() //获取用户Id
      if(userId!=0){
          get("/add-apply-list",{
            userId:userId,
            apply_type:JSON.stringify(that.data.result)
          }).then(res=>{
            messageTip(res.status==200?"提交成功":"提交失败")
            if(res.status==200){
              that.setData({
                result:[]
              })
            }
          })
      }else{
        messageTip("请登录")
      }
    }
    
  },
  onChange(event) {
    this.setData({
      result: event.detail,
    });
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {},
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
      title: '体检预约',
    })
  },
  /**
   * 查询体检项目大类列表
   */
getFeeItemList(){
  var that = this;
get("/fee-item-list",{

}).then(res=>{
  if(res.status==200){
    that.setData({
      list:res.result.lt
    })
  }else{
    messageTip(res.mag)
  }
})
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getFeeItemList()
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
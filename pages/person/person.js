// pages/person/person.js
import{messageTip,genderHandle} from "../../utils/public/public";
import {selfDialog} from "../../utils/public/public"
import {SM4EnCrypto_ECB,SM4DeCrypto_ECB} from "../../utils/crypto/sm4"
import {post,get} from "../../utils/http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
    username:"用户名",
    loginName:"十三",
    sex:"男",
    age:"18",
    org:"桂林航天大学",
    isLogin:false,
    show: false,
    moreIcon:"icon-shouqi",
    actions: [
      {
        name: '退出登录',
      },
      {
        name: '修改密码',
      },
      {
        name: '注销账号',
        subname: '永久注销',
      },
    ],
    noticeText:"生活不止有诗和远方，也有眼前的美好：也许你心里有清风明月，可是现实也有油盐烟火；你想有诗和远方，也要备足你的干粮和行装；清高孤傲有才情，这些可以富足你的灵魂。"
  },
  /**
   * 自定义函数
   * @param {*} e 
   */
  /**
   * 身高
   */
  heightFuc:function(){
    wx.navigateTo({
      url: `../../physical-detail/pages/list/list?res`,
    })
  },
   /**
   * 体重
   */
  weightFuc:function(){
    wx.getUserProfile({
      desc: 'desc',
      lang: "zh_CN",
      success: (result) => {
        this.setData(
          {
            avatarUrl:result.userInfo.avatarUrl
          })
      },
      fail: (res) => {

      },
    })
  },
     /**
   * 体温
   */
 temptFuc:function(){
  wx.navigateTo({
    url: `../../physical-detail/pages/list/list?res`,
  })
  },
  /**
   * 尿检
   */
urineFuc:function(){
  wx.navigateTo({
    url: `../../physical-detail/pages/list/list?res`,
  })
},
  /**
   * 心电
   */
EcgFuc:function(){
  wx.navigateTo({
    url: `../../physical-detail/pages/list/list?res`,
  })
  },
    /**
   * 超声
   */
passFuc:function(){
  wx.navigateTo({
    url: `../../physical-detail/pages/list/list?res`,
  })
},
    /**
   * 全部
   */
 allFuc:function(){
  wx.navigateTo({
    url: `../../physical-detail/pages/list/list?res`,
  })
  },
  /**
   * 编辑资料
   */
  editData:function(){
    messageTip("功能开发中")
  },
  /**
   * 更多选项
   */
  alertMenu:function(){

  this.setData({
    show:true,
    moreIcon:"icon-gengduo"
  })
  },
  /**
   * 选项关闭回调
   */
  onClose() {
    this.setData({ 
      show: false ,
      moreIcon:"icon-shouqi",
    });
  },
  /**
   * 删除本地缓存
   * @param {*} event 
   */
  deleData:function(key){
    wx.removeStorage({
      key: key,
      success (res) {
      }
    })
  },
/**
 * 选项选中
 * @param {*} event 
 */
  onSelect(event) {
    var self = this;
    switch(event.detail.name){
      case "退出登录":
        self.setData({
          isLogin:false
        })
        this.deleData("userInfo");
        break;
      case "修改密码":
        messageTip("功能开发中")
        break;
      case "注销账号":
        messageTip("功能开发中")
        break;
    }
  },
  /**
   * 进行登录
   * @param {*} options 
   */
  loginFuc:function(){
wx.navigateTo({
  url: '/pages/login/login',
})

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
   /* wx.getUserInfo({
      lang: "zh_CN",
       withCredentials: true,
       success: (result) => {
         this.setData(
          {
            avatarUrl:result.userInfo.avatarUrl
          }
         )
         console.log(result)
       },
       fail: (res) => {
        console.log(res)
       },
     })
*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarColor({
      backgroundColor: '#00B8B7',
      frontColor: '#ffffff',
    })
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        current: 2  // 索引为0，是第一个tab
      })
  }
    var self = this;
    wx.getStorage({
      key:"userInfo",
      success (res) {
        var data = JSON.parse(res.data)
        self.setData({
          isLogin:true,
          username:data.nickName,
          loginName:data.name,
          age:data.birthday,
          userId:data.userId,
          org:data.org_name,
          sex:genderHandle(data.gender)

        })
      },
      fail(res){
       self.setData({
         isLogin:false
       })
      }
    
    })
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
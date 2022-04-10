// pages/new_index/new_index.js
const app = getApp()
import{messageTip,genderHandle,getUserId} from "../../utils/public/public";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图配置
    autoplay: true,
    userId:"",
    interval: 10000,
    duration: 1200,
    lunboData:[],
    notice:'高效、高质量和可负担的智慧医疗不但可以有效提高医疗质量，更可以有效阻止医疗费用的攀升。智慧医疗使从业医生能够搜索、分析和引用大量科学证据来支持他们的诊断，同时还可以使医生、医疗研究人员、药物供应商、保险公司等整个医疗生态圈的每一个群体受益。在不同医疗机构间，建起医疗信息整合平台，将医院之间的业务流程进行整合，医疗信息和资源可以共享和交换，跨医疗机构也可以进行在线预约和双向转诊，这使得“小病在社区，大病进医院，康复回社区”的居民就诊就医模式成为现实，从而大幅提升了医疗资源的合理化分配，真正做到以病人为中心。振邦电子健康档案/电子病历的建设，通过标准化的业务语言组件，在授权许可范围内，共享患者的病历信息，以供医护人员随时查询，为预防、诊断、康复提供可靠参考。这保证了患者在任何地方都能得到一致的护理服务，从而有效提升了医疗服务水平。振邦智慧医疗系统融合了中西方医疗方法与技术。中医医院将中西医各类临床信息整合成标准化、可计算的模型，使医务人员可以准确制定融合中西医的治疗方案。医疗信息整合平台和电子健康档案/电子病历不是振邦智慧医疗系统的全部，当前振邦正在大力发展的医疗信息整合平台和电子健康档案/电子病历、移动医疗设备、个人医疗信息门户、远程医疗服务和虚拟医疗团队等，都将有力地推动智慧的医疗的建设，也将助力于中国建设起覆盖城乡居民的基本医疗卫生制度，为群众提供安全、有效、方便、价廉的医疗卫生服务。在未来，当智慧元素融入整个行业，医疗信息系统必将以前所未有的速度开始进化，并对医疗卫生行业，乃至全人类的健康产生重大影响。'
  },
  //体检预约
  apply_btn(){
    wx.navigateTo({
      url: '/pages/apply-physical/apply-physical',
    })
  },
  //获取体检记录
  getPhysicalList(){
    if(app.globalData.isLogin){
      wx.navigateTo({
        url: `/pages/list/list?res`,
      })
    }
    else{
      messageTip("请先登录")
    }

  },
  //创建二维码
  creat_qr_code(event){
    console.log(event.target.id);
    wx.navigateTo({
      url: `/pages/exam_list/exam_list?userId=${event.target.id}`,
      //url: `/pages/qrcode/qrcode?userId=${event.target.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    let ID = getUserId();
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "../../static/img/lb1.jpg"
        },
        {
          "id": 2,
          "imgurl": "../../static/img/lb2.jpg"
        },
        {
          "id": 3,
          "imgurl": "../../static/img/lb3.jpg"
        },
        {
          "id": 4,
          "imgurl": "../../static/img/lb4.jpg"
        }
      ]
    }; 
    that.setData({
      lunboData: data.datas,
      userId:ID
    })
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
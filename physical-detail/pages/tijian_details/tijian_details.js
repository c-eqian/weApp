// pages/suifan_details/index.js
import { result } from '../../../utils/http/request'
import { echart_init } from '../../../echarts_function/gauge'
import { echart_init_them } from '../../../echarts_function/them'
import {post,get} from "../../../utils/http/api.js"
import { messageTip } from '../../../utils/public/public'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rid:'',
    tabId:0,
    baseExam:[],
    resultList:[],
    InternalMedicine:[],
    ec: {
      lazyLoad: true  //手动加载图表
    }
  },
  tabsClicked:function(event){
    var name = event.detail.name;
    this.setData({
      tabId:name
    })
    var that = this;
    var url = '';
    if(name==1){
        url="/get-exam-result-list"
        if(!that.resultList){
          this.getResultByRid(url);
        }
    }
    else if(name==0){
      this.getBaseExam()
    }
    console.log(event)
  },
  getResultByRid(url=''){
    if(url){
      get(url,{
        rid:this.data.rid
      }).then(res=>{
        if(res.status==200){
          this.setData({
            resultList:res.result
          })
        }
      })
    }
  },
  getBaseExam(){
    get('/get_base_exam',{
      rid:this.data.rid
    }).then(res=>{
      if(res.status===200){
        console.log(res)
        this.setData({
          baseExam:res.result
        })
      }
      else{
        messageTip(res.msg)
      }
    })
  },
  onChange(event) {
   console.log('当前值：' + event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      rid:options.rid
    })
  this.getBaseExam();
  },

  scale_function(scale_item,self_assessment){
    let scale = []
    scale_item.forEach((item,index)=>{
      let scale_obj = {}
      if(Number(self_assessment) === index+1){
        scale_obj.text = scale_item[scale_item.length-(index+1)]
        scale_obj.icon = true
      }else{
        scale_obj.text = scale_item[scale_item.length-(index+1)]
        scale_obj.icon = false
      }
      scale.push(scale_obj)
     })
     scale.reverse()
     return scale
  },

  bodyData(list,dataindex){
    for(let i = 0; i<list.length; i++){
      if(Number(dataindex) === i+1){return list[i]}
      else if(i === list.length-1){ return '-'}
    }
  },

  body_list_data(body_list_title,body_list_item) {
    let body_list = []
    body_list_title.forEach((item,index)=>{
      let _obj = {}
      _obj.title = item
      _obj.text = body_list_item[index]
      body_list.push(_obj)
    })
    return body_list
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let fasting_blood_glucose =  this.data.fasting_blood_glucose
    // console.log('this.data',this.data)
    // this.ecComponent = this.selectComponent('#mychart-dom-bar');
    // echart_init(this.ecComponent, fasting_blood_glucose, '空腹血糖值', 'mmol/L')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarColor({
      backgroundColor: '#00B8B7',
      frontColor: '#ffffff',
    })
    wx.setNavigationBarTitle({
      title: '结果详情',
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
    if(this.data.tabId==1){
      let url="/get-exam-result-list"
      this.getResultByRid(url);
    } else if(this.data.tabId==0){
      this.getBaseExam()
    }

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
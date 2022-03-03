import dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const { $Message } = require('../../utils/plugin/dist/base/index');
var util = require('../../utils/util.js');
//正则校验手机号
export function regExpPhone(phone){
  var pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return pattern.test(phone)
}
//时间戳转换日期
export function timeStamp2date(stamp,type=0){
  /**
   * type：是否返回时间，默认不返回
   */
  var date = new Date(stamp),
  Y = date.getFullYear() + '-',
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
  D = date.getDate() < 10?'0'+date.getDate()+' ':date.getDate()+ ' ',
  h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':',
  m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':',
  s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  var getdatetime = type==0?(Y + M + D):(Y + M + D + h + m + s);
  return getdatetime
}

export function handleTime2DMM(TIME){
       // 调用函数时，传入new Date()参数，返回值是日期和时间
       // 再通过setData更改Page()里面的data，动态更新页面的数据
       var newDate =  TIME.replace(/\-/g, "/")   //利用正则把 - 改成 / 
       var newDate2 = newDate.replace(/\.0/g, '')		//利用正则把 .0 去掉
       var time = util.formatTime(new Date());
       var stime = new Date(newDate2).getTime();
       var etime = new Date(time).getTime();
       var usedTime = etime - stime;  //两个时间戳相差的毫秒数
       var days = Math.floor(usedTime / (24 * 3600 * 1000));
       //计算出小时数
       var leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
       var hours = Math.floor(leave1 / (3600 * 1000));
       //计算相差分钟数
       var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
       var minutes = Math.floor(leave2 / (60 * 1000));
       return {
        days:days.toString(),
        hours:hours.toString(),
        minutes:minutes.toString(),
        second:(leave2/1000).toString()
       }
}
export function msgTop(options){
  $Message({
    content: options.msg,
    type: options.type,
    duration:3
});
}
export function getUserName(){
  var userName='未知';
    try {
      var value = wx.getStorageSync("userInfo")
      if (value) {
        userName=JSON.parse(value).userName
        // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }
  return userName
}
export function getUserId(){
  var userId=0;
  const app = getApp()
  if (app.globalData.userId==0||!app.globalData.userId){
    try {
      var value = wx.getStorageSync("userInfo")
      if (value) {
        userId=JSON.parse(value).userId
        // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }
  }else{
    userId=app.globalData.userId
  }
  return userId
}
/**
 * 异步设置缓存
 */
export function selfSetStoreSync(options){
  var result={status:false}
  try {
    wx.setStorageSync(options.key, options.value)
    result.status=true
  } catch (e) { 
    result.status=false
  }
  return result
}
/**
 * 异步删除缓存
 */
export function selfRemoveStoreSync(key){
  var result={status:false}
  try {
    wx.removeStorageSync(key)
    result.status=true;
  } catch (e) {
    // Do something when catch error
  }
  return result
}
export function selfGetStoreSync(key){
  var result={status:false,data:null}
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      result.status=true;
      result.data=JSON.parse(value);
      // Do something with return value
    }
  } catch (e) {
    // Do something when catch error
  }
  return result
}
export function selfGetStore(key){
  var result={status:false,data:null};
  wx.getStorage({
    key:key,
    success(res){
      console.log(res)
      result.status = true;
      result.data = JSON.parse(res.data);
    },
    fail(){
      result.status = false;
    },

  })
  return result;
}
export function messageTip(msg) {
  wx.showToast({
      title: msg,
      icon:'none',
      duration:2000
  })
  }
  /**
   * 弹窗
   * @param {*} options 
   */
export function selfDialog(options){
  return Dialog.alert(
    options
  )
}
export function genderHandle(gender){
  var res = ''
  switch(gender){
    case '1':
      case 1:
      res = '男';
      break;
    case '2':
      case 2:
      res = '女';
      break;
    default:
      res = '未知'
      break;
      
  }
  return res
}
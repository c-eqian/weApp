import dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
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
      res = '男';
      break;
    case '2':
      res = '女';
      break;
    default:
      res = '未知'
      break;
      
  }
  return res
}
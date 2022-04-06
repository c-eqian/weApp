// components/compare/compare.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Liver_data:{
      type: Object,
      value: {}
    }
  },
  observers: {
    'Liver_data': function(newdata){
      console.log(newdata)
      if (Object.keys(newdata).length === 0){return}
      let _data = []
      let title = newdata.title
      let scope = newdata.scope
      let init = newdata.init
      let value = newdata.value
      title.forEach((item,index)=>{
        let _obj = {}
        let high = scope[index].split('~')[1]
        let low = scope[index].split('~')[0]
        console.log(high,low)
        _obj.title = item
        _obj.value = value[index]
        _obj.init = init[index]
        _obj.scope = scope[index]
        if(_obj.value === '—'){
          _obj.iconshow = ""
        }else if(Number(_obj.value) > Number(high)) {
          _obj.iconshow = "icon-iconup"
        }else if(Number(_obj.value) >= Number(low) && Number(_obj.value) <= Number(high)){
          _obj.iconshow = "icon-chiping"
        }else if(Number(_obj.value) < Number(low) ){
          _obj.iconshow = "icon-icondown"
        }
        _data.push(_obj)
      })
      console.log("_data",_data)
      this.setData({_data})
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _data : []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    datafunction(){
      //设置生活方式
      let life_type = {}
      let life_type_data = []
      let psy_adjust_comp_behavior = []
      let adjust_value = 0
      let adjust_text = ''
      let name_list = ['吸烟情况', '饮酒情况', '每周运动量', '每次运动量', '主食摄入量']
      let daily_list = ['daily_smoking', 'daily_alcohol', 'motion_freq', 'motion_dur', 'staple_food']
      let target_list = ['target_daily_smoking', 'target_daily_alcohol', 'motion_freq_advice', 'motion_dur_advice', 'staple_food_advice']
      let unit = ['支/天', '两/天' , '天', '分钟', '日/克']

      for(let i = 0; i<5; i++){
        let _life_type_data = {}
        _life_type_data.name = name_list[i]
        _life_type_data.daily = data[daily_list[i]] ? data[daily_list[i]] : '—'
        _life_type_data.target = data[target_list[i]] ? data[target_list[i]] : '—'
        _life_type_data.unit = unit[i]
        if(_life_type_data.daily === '—'){
          _life_type_data.iconshow = ""
        }else if(_life_type_data.daily > _life_type_data.target) {
          _life_type_data.iconshow = "icon-iconup"
        }else if(_life_type_data.daily = _life_type_data.target){
          _life_type_data.iconshow = "icon-chiping"
        }else if(_life_type_data.daily < _life_type_data.target){
          _life_type_data.iconshow = "icon-icondown"
        }
        life_type_data.push(_life_type_data)
      }
      
    }
  }
})

// components/progressbar/progressbar.js
Component({
  options:{
    
  },
  /**
   * 组件的属性列表
   */
  properties: {
    W_H_BMI:{
      type: Object,
      value: {}
    },
    _type:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    Lean_standard: String,
    standard_chubby: String,
    chubby_obesity: String,
    obesity_serious:String,
    animationData: {},
    icon: ''
  },
  /*使用数据监听的方法监听传给组件的数据并赋值，否则会在组件的生命周期中无法获取到传入组件的参数*/
  observers: {
    'W_H_BMI, _type': function(New_W_H_BMI, New_type){
        if ( JSON.stringify(New_W_H_BMI) === '{}' ) return
        let Lean_standard
        let standard_chubby
        let chubby_obesity
        let obesity_serious
        let height = New_W_H_BMI.height
        let weight = Number(New_W_H_BMI.weight)
        Lean_standard = (18.4 * Math.pow(Number(height/100),2)).toFixed(2)
        standard_chubby = (23.9 * Math.pow(Number(height/100),2)).toFixed(2)
        chubby_obesity = (27.9 * Math.pow(Number(height/100),2)).toFixed(2)
        obesity_serious = (29.9 * Math.pow(Number(height/100),2)).toFixed(2)
        console.log('Lean_standard',Lean_standard,weight)
      
        /*动画移动函数*/
        let move = wx.createAnimation({ duration:1000 });
        var weight_between
        let icon
        if (weight <= Lean_standard){
          weight_between = (((Lean_standard - weight) / 20) * 70 ).toFixed(0)
          icon = 'manyiduyiban_left'
        }else if(weight > Lean_standard && weight <= standard_chubby){
          weight_between = (((weight - Lean_standard) / (standard_chubby - Lean_standard)) * 65 + 70).toFixed(0)
          icon = 'manyidu1'
        }else if(weight > standard_chubby && weight <= chubby_obesity){
          weight_between = (((weight - standard_chubby) / (chubby_obesity - standard_chubby)) * 65 + 140).toFixed(0)
          icon = 'manyiduyiban'
        }else if(weight > chubby_obesity && weight <= obesity_serious){
          weight_between = (((weight - chubby_obesity) / (chubby_obesity - obesity_serious)) * 65 + 210).toFixed(0)
          icon = 'manyidu_fp'
        }else if(weight > obesity_serious){
          weight_between = (((weight- chubby_obesity) / 30) * 50 + 280).toFixed(0)
          icon = 'manyidu_yz'
        }
        console.log('icon',icon)
        move.translate(Number(weight_between),0).scale(1.5,1.5).step(); 
        if(New_type === 'BMI'){
          this.setData({
            animationData: move.export(),
            Lean_standard: '18.50',
            standard_chubby: '23.90',
            chubby_obesity: '27.90',
            obesity_serious: '29.90',
            icon
          })
        }else if(New_type === 'weight'){
          this.setData({
            animationData: move.export(),
            Lean_standard,
            standard_chubby,
            chubby_obesity,
            obesity_serious,
            icon
          })
        }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

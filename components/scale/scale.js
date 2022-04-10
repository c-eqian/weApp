// components/progressbar/progressbar.js
Component({
  options:{
    
  },
  /**
   * 组件的属性列表
   */
  properties: {
    scale:{
      type: Array,
      value: []
    },
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
    'scale': function(New_scale){
      console.log('New_scale',New_scale)
        if ( New_scale.length === 0 ) return
      }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

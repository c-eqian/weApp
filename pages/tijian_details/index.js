// pages/suifan_details/index.js
import { result } from '../../utils/http/request'
import { echart_init } from '../../echarts_function/gauge'
import { echart_init_them } from '../../echarts_function/them'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    get_data: {},
    Personal_information: {},
    basic: {},
    symptoms: {},
    signs: {},
    life_type: {},
    drug: [],
    H_W_Nan_Show: '',
    H_W_Nv_Show: '',
    gender: '',
    psy_adjust_comp_behavior: [],
    Drug_situation: {},
    tnb_folup_type: {},
    scale: [],
    self_care: [],
    cognitive: [],
    emotional: [],
    vision: {},
    body_list: [],
    Liver:{},
    renal:{},
    Blood_fat:{},
    Routine_blood:{},
    risk_factor_control:[],
    Weight_goals: '',
    vaccine: '',
    ec: {
      lazyLoad: true  //手动加载图表
    }
  },
  onChange(event) {
   console.log('当前值：' + event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    result({
      url: 'http://175.178.157.42:7090/v1/ListPersonPhyExamDetail',
      data:{
        phy_exam_no: options.folup_no
      }
    }).then((res)=>{
      //获取用户基本个人信息
      let data = res.data.data
      let Personalinformation = {}
      Personalinformation.name = data.name
      Personalinformation.org_name = data.org_name
      Personalinformation.phone = data.phone
      Personalinformation.doc_name = data.doc_name
      Personalinformation.gender = data.gender
      Personalinformation.idcard = data.idcard
      Personalinformation.idcard = data.idcard
      Personalinformation.f_no = data.f_no
      Personalinformation.empi = data.empi
      Personalinformation.tnb_folup_date_con = data.phy_exam_date
      
      //设置基本数据
      let basic = {}
      basic.tnb_folup_type = data.tnb_folup_type
      basic.next_tnb_folup_date_con = data.next_tnb_folup_date_con

      //设置症状数据
      let symptoms = {}
      symptoms.symptom = data.symptom
      symptoms.symptom_other =data.symptom_other

      //设置体征数据
      // 足背动脉搏动：1-触及正常；2-双侧减弱；3-左侧减弱；4-右侧减弱；5-双侧消失；6-左侧消失；7-右侧消失
      let signs = {}
      signs.weight = data.weight
      signs.target_weight = data.target_weight
      signs.bmi = data.bmi
      signs.target_bmi = data.target_bmi
      signs.height = data.height
      signs.pulse = data.pulse
      signs.systolic_pressure = data.blood_pressure_left
      console.log(' data.blood_pressure_left', data.blood_pressure_left)
      console.log(' data.blood_pressure_left', data.blood_pressure_right)
      signs.diastolic_pressure = data.blood_pressure_right 
      
      // signs.pulse_foot = data.pulse_foot
      switch(data.pulse_foot){
        case "1": signs.pulse_foot = '触及正常'; break
        case "2": signs.pulse_foot = '双侧减弱'; break
        case "3": signs.pulse_foot = '左侧减弱'; break
        case "4": signs.pulse_foot = '右侧减弱'; break
        case "5": signs.pulse_foot = '双侧消失'; break
        case "6": signs.pulse_foot = '左侧消失'; break
        case "7": signs.pulse_foot = '右侧消失'; break
      }
      
     //肝功能数据处理
     let Liver = {}
     Liver.title = ['血清谷丙转氨酶','血清谷草转氨酶','白蛋白','总胆红素','结合胆红素']
     Liver.init = ['U/L','U/L','g/L','μmol/L','μmol/L']
     Liver.scope= ['5~40','0~40','34~48','2~20','0~6.8']
     let Liver_value = []
     let Liver_key= ['serum_alanine_amino','serum_glutamic_oxalo','albumin','total_bilirubin','con_bilirubin']
     Liver_key.forEach((item,index)=>{
        Liver_value.push(data[item]?data[item]:'—')
     })
     Liver.value = Liver_value

     //肾功能数据处理
     let renal = {}
     renal.title = ['血清肌酐','血尿素','血钾浓度','血钠浓度']
     renal.init = ['μmol/L','mmol/L','mmol/L','μmol/L']
     renal.scope= ['50~110','2.9~7.5','34~48','3.5~5.5','135~145']
     let renal_value = []
     let renal_key= ['serum_creatinine','blood_urea','blood_potassium_con','blood_sodium_con']
     renal_key.forEach((item,index)=>{
      renal_value.push(data[item]?data[item]:'—')
     })
     renal.value = renal_value

      //血脂据处理
      let Blood_fat = {}
      Blood_fat.title = ['总胆固醇','甘油三脂','血清低密度值蛋白胆固醇','血清高密度值蛋白胆固醇']
      Blood_fat.init = ['mmol/L','mmol/L','mmol/L','μmol/L']
      Blood_fat.scope= ['2.83~5.2','0.45~1.7','2.1~3.1','3.5~5.5','0.91~2.17']
      let Blood_fat_value = []
      let Blood_fat_key= ['total_chole','triglyceride','serum_l_chole','serum_h_chole']
      Blood_fat_key.forEach((item,index)=>{
        Blood_fat_value.push(data[item]?data[item]:'—')
      })
      Blood_fat.value = Blood_fat_value
 
      //血常规数据处理
      let Routine_blood = {}
      Routine_blood.title = ['血红蛋白','白细胞','血小板']
      Routine_blood.init = ['g/L','×10^ 9/L','10^ 9/L']
      Routine_blood.scope= ['120~160','4.0~10.0','10.0~30.0']
      let Routine_blood_value = []
      let Routine_blood_key= ['hemoglobin','white_blood_cell','platelet']
      Routine_blood_key.forEach((item,index)=>{
        Routine_blood_value.push(data[item]?data[item]:'—')
      })
      Routine_blood.value = Routine_blood_value
      

      //辅助检查数据
      let auxiliary = {}
      auxiliary.fasting_blood_glucose = data.fasting_blood_glucose
      auxiliary.post_blood_glucose = data.post_blood_glucose
      auxiliary.gly_hemoglobin = data.gly_hemoglobin
      auxiliary.supple_exam_date = data.supple_exam_date
      auxiliary.supple_exam_other = data.supple_exam_other

     //随访满意程度
     let satisfaction = {}
     satisfaction.tnb_folup_type = data.tnb_folup_type

     //用药情况
     //  药物用法1：1-口服，2-肌注，3-静脉注射，4-皮下注射，5-外洗
     let drug = []
     let _data = data
     for(let i=0; i<5; i++){
       if(_data[`drug_name_${i+1}`] !== null){
          let _drug_usage = ''
          switch( _data[`drug_usage_${i+1}`]){
            case "1": _drug_usage = '口服'; break
            case "2": _drug_usage = '肌肉注射'; break
            case "3": _drug_usage = '静脉注射'; break
            case "4": _drug_usage = '皮下注射'; break
            case "5":_drug_usage = '外洗'; break
          }
          let  drug_obj = {
            drug_name: _data[`drug_name_${i+1}`],
            drug_usage: _drug_usage,
            drug_freq: _data[`drug_freq_${i+1}`],
            drug_dose: _data[`drug_dose_${i+1}`]
          }
          drug.push(drug_obj)
       }
     }
     //身高数据处理
     let H_W_Nan_Show
     let H_W_Nv_Show
     let gender = data.gender
     if(gender == "1"){
       H_W_Nan_Show = "H_W_Nan_Show"
     }else if(gender == "2"){
       H_W_Nv_Show = "H_W_Nv_Show"
     }

     //老年人随访满意度处理
     let scale_item = ['不满意','不太满意','说不清楚','基本满意','满意']
     let scale_item1 = ['初筛阳性','初筛阴性']
     let scale_item2 = ['不能自理','中度依赖','轻度依赖','可自理']
     let scale = []
     let self_care = []
     let cognitive = []
     let emotional = []
     scale = this.scale_function(scale_item,data.self_assessment)
     self_care = this.scale_function(scale_item2,data.self_care)
     cognitive = this.scale_function(scale_item1,data.cognitive)
     emotional = this.scale_function(scale_item1,data.emotional)
    

      //设置视力数据
      let vision = {}
      vision.visual_of_left_eye = data.visual_of_left_eye ? data.visual_of_left_eye : '-'
      vision.visual_of_right_eye = data.visual_of_right_eye ? data.visual_of_right_eye : '-'
      vision.corrected_visual_of_left_eye = data.corrected_visual_of_left_eye ? data.corrected_visual_of_left_eye : '-'
      vision.corrected_visual_of_right_eye = data.corrected_visual_of_right_eye ? data.corrected_visual_of_right_eye : '-'

      //设置查体部分数据
      let body_list_title = ['听力','运动','眼底','皮肤','巩膜','淋巴结']
      let body_list_item = []
      let body_list = []
      let hearing_list = ['听见','听不清或无法听清']
      let movement = ['可顺利完成','无法独立完成动作']
      let eye_ground_status_list = ['正常','异常']
      let skin_stauts_list = ['正常','潮红','苍白','发绀','黄染','色素沉着','其他']
      let sclera_stauts_list = ['正常','黄染','充血','其他' ]
      let lymph_gland_stauts_list = ['未触及','锁骨上','腋窝','其他']
      body_list_item.push(this.bodyData(hearing_list,data.hearing))
      body_list_item.push( this.bodyData(movement,data.motor))
      body_list_item.push(this.bodyData(eye_ground_status_list,data.eye_ground_status))
      body_list_item.push(this.bodyData(skin_stauts_list,data.skin_stauts))
      body_list_item.push(this.bodyData(sclera_stauts_list,data.sclera_stauts))
      body_list_item.push(this.bodyData(lymph_gland_stauts_list,data.lymph_gland_stauts))
      body_list = this.body_list_data(body_list_title,body_list_item)

      //设置血糖值
      let fasting_blood_glucose = data.fasting_blood_glucose_mmol
      this.ecComponent = this.selectComponent('#mychart-dom-bar');
      echart_init(this.ecComponent, fasting_blood_glucose, '空腹血糖值', 'mmol/L')
      //设置体温计呼吸频率
      this.ecComponent_them = this.selectComponent('#mychart-dom-them')
      echart_init_them(this.ecComponent_them,data.temperature,data.respiratory)
      
      //获取药物情况数据
      let Drug_situation = {}
      Drug_situation.comp_med = data.comp_med
      Drug_situation.hyp_reactio_status = data.hyp_reactio_status
      Drug_situation.drug_adver_react =  data.drug_adver_react
      
      //获取随访满意度数据
      let tnb_folup_type = {value: '0',text: ''}
      switch(data.health_assess_status){
        case '1':  tnb_folup_type.value = 5; tnb_folup_type.text='体检无异常';break
        case '2':  tnb_folup_type.value = 2; tnb_folup_type.text='体检有异常';break
      }

      //获取健康指导数据
      let risk_factor_control = []
      let Weight_goals = data.weight_loss_target ? data.weight_loss_target : '-'
      let vaccine = data.vac_advice ? data.vac_advice : '-'
      // 1-戒烟，2-健康饮酒，3-饮食，4-锻炼，5-减体重，6-建议接种疫苗，7-其他
      let risk_factor_control_list = data.risk_factor_control.split(',')
      console.log('risk_factor_control_list',risk_factor_control_list)
      risk_factor_control_list.forEach((item,index)=>{
        let text = ''
        switch(item){
          case '1':  text='戒烟';break
          case '2':  text='健康饮酒';break
          case '3':  text='饮食';break
          case '4':  text='锻炼';break
          case '5':  text='减体重';break
          case '6':  text='建议接种疫苗';break
          case '7':  text='其他';break
         }
         risk_factor_control.push(text)
      })


      this.setData({
        Personal_information: Personalinformation,
        basic,
        symptoms,
        signs,
        drug,
        H_W_Nan_Show,
        H_W_Nv_Show,
        gender,
        Drug_situation,
        tnb_folup_type,
        scale,
        self_care,
        cognitive,
        emotional,
        vision,
        body_list,
        Liver,
        renal,
        Blood_fat,
        Routine_blood,
        risk_factor_control,
        Weight_goals,
        vaccine
      })
    })
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
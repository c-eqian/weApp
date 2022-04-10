import * as echarts from '../ec-canvas/echarts';

// const app = getApp();
function setOption(chart, data) {
  var indicator = [{"name": "自知力","max": 100}, {"name": "睡眠情况","max": 100}, {"name": "饮食情况","max": 100}, { "name": "个人生活料理","max": 100}, {"name": "家务劳动","max": 100}, {"name": "生产劳动", "max": 100}, {"name": "学习能力","max": 100}, { "name": "人际交往", "max": 100}];
  var data = data;
  
  var option = {
    // backgroundColor: '#0A2E5D',
    "normal": {
        "top": 200,
        "left": 300,
        "width": 600,
        "height": 600,
        "zIndex": 6,
        "backgroundColor": ""
    },
    "color": ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
    "title": {
        "show": true,
        "text": "基本情况分析",
        "left": "35%",
        "top": "1%",
        "textStyle": {
            "fontSize": 18,
            "color": "#30cfd0",
            "fontStyle": "normal",
            "fontWeight": "normal"
        }
    },
    "tooltip": {
        "show": true,
        "trigger": "item"
    },
    "radar": {
        "center": ["50%", "58%"],
        "radius": "70%",
        "startAngle": 10,
        "splitNumber": 4,
        "shape": "circle",
        "splitArea": {
            "areaStyle": {
                "color": ["transparent"]
            }
        },
        "axisLabel": {
            "show": false,
            "fontSize": 18,
            "color": "#000",
            "fontStyle": "normal",
            "fontWeight": "normal"
        },
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "rgba(19, 173, 255, 0.5)"//
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": "rgba(19, 173, 255, 0.5)"//
            }
        },
        "indicator": indicator
    },
    "series": [ {
        "name": "高一(2)班",
        "type": "radar",
        "symbol": "circle",
        "symbolSize": 8,
        "itemStyle": {
            "normal": {
                color:'rgba(19, 173, 255, 1)',
                "borderColor": "rgba(19, 173, 255, 0.4)",
                "borderWidth": 1
            }
        },
        "areaStyle": {
            "normal": {
                "color": "rgba(19, 173, 255, 0.5)"
            }
        },
        "lineStyle": {
            "normal": {
                "color": "rgba(19, 173, 255, 1)",
                "width": 1,
                "type": "dashed"
            }
        },
        "data": [
           data
        ]
    }]
  };
  chart.setOption(option);
}

export function echart_init(ecComponent,value, name, unit){
    ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        setOption(chart,value, name, unit);
  
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
}
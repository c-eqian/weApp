import * as echarts from '../ec-canvas/echarts';

// const app = getApp();
function setOption(chart,them, frequency) {
  var highlight = '#03b7c9';

  var demoData = [{
          name: '温度',
          value: them,
          unit: '℃',
          pos: ['25%', '40%'],
          range: [10, 50],
          YS: [
              [0.4, '#119eff'],
              [0.5, '#30da74'],
              [1, '#f3390d']
          ]
      },
      {
          name: '呼吸频率',
          value: frequency,
          unit: '次/分',
          pos: ['75%', '40%'],
          range: [0, 60],
          splitNum: 10,
          YS: [
              [0.3, '#f3390d'],
              [0.8, '#30da74'],
              [1, '#119eff']
          ]
      }
  ];

  var option = {
      backgroundColor: '#00162d',
      series: (function() {
          var result = [];

          demoData.forEach(function(item) {
              result.push(
                  // 外围刻度
                  {
                      type: 'gauge',
                      center: item.pos,
                      radius: '50%', // 1行2个
                      splitNumber: item.splitNum || 10,
                      min: item.range[0],
                      max: item.range[1],
                      startAngle: 225,
                      endAngle: -45,
                      axisLine: {
                          show: true,
                          lineStyle: {
                              width: 2,
                              shadowBlur: 0,
                              color: [
                                  [1, highlight]
                              ]
                          }
                      },
                      axisTick: {
                          show: true,
                          lineStyle: {
                              color: highlight,
                              width: 1,
                              // height: 10
                          },
                          length: -10,
                          splitNumber: 10
                      },
                      splitLine: {
                          show: true,
                          length: -10,
                          lineStyle: {
                              color: highlight,
                          }
                      },
                      axisLabel: {
                          distance: -18,
                          textStyle: {
                              color: highlight,
                              fontSize: '10',

                          }
                      },
                      pointer: {
                          show: 0
                      },
                      detail: {
                          show: 0
                      }
                  }, 
                  // 内侧指针、数值显示
                  {
                      name: item.name,
                      type: 'gauge',
                      center: item.pos,
                      radius: '40%',
                      startAngle: 225,
                      endAngle: -45,
                      min: item.range[0],
                      max: item.range[1],
                      axisLine: {
                          show: true,
                          lineStyle: {
                              width: 16,
                              color: [
                                  [1, 'rgba(75,228,255,.1)']
                              ]
                          }
                      },
                      axisTick: {
                          show: 0,
                      },
                      splitLine: {
                          show: 0,
                      },
                      axisLabel: {
                          show: 0
                      },
                      pointer: {
                          show: true,
                          length: '90%',
                          width: 3,
                      },
                      itemStyle: { //表盘指针的颜色
                          color: 'rgba(255, 153, 0, 0.31)',
                          borderColor: '#ff9900',
                          borderWidth: 1
                      },
                      detail: {
                          show: true,
                          offsetCenter: [0, '100%'],
                          textStyle: {
                              fontSize: 16,
                              color: '#000000'
                          },
                          formatter: [
                              '{value} ' + (item.unit || ''),
                              '{name|' + item.name + '}'
                          ].join('\n'),
                          rich: {
                              name: {
                                  fontSize: 18,
                                  lineHeight: 30,
                                  color: '#1bafaf'
                              }
                          }
                      },

                      data: [{
                          value: item.value
                      }]
                  }
              );
          });
          return result;
      })()
  };
  chart.setOption(option);
}

export function echart_init_them(ecComponent,them, frequency){
    ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        setOption(chart,them, frequency);
  
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
}
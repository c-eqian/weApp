import * as echarts from '../ec-canvas/echarts';

// const app = getApp();
function setOption(chart) {
  var xMax = 30;
var barWidth = 20;
var kd = [];
var kdUnit = 5;
// 刻度使用柱状图模拟，短设置3，长的设置5；构造一个数据
for (var i = 0, len = xMax; i <= len; i++) {
    if (i > xMax) {
        kd.push('0');
    } else {
        if (i % kdUnit === 0) {
            kd.push('-5');
        } else {
            kd.push('-3');
        }
    }
}
var option = {
    backgroundColor: '#0e1733',
    xAxis: [
        {
            show: false,
            min: 0,
            max: xMax,
            inverse: true,
        },
        {
            show: false,
            data: [],
            min: -3,
            max: 33,
            inverse: true,
        },
    ],
    yAxis: [
        {
            show: false,
            data: [],
        },
        {
            show: false,
            data: [],
        },
        {
            show: false,
            data: [],
        },
        {
            show: false,
            min: -90,
            max: 100,
        },
    ],
    series: [
        {
            name: '急需改造',
            type: 'bar',
            barWidth: 24,
            // silent: true,
            stack: true,
            yAxisIndex: 0,
            data: [
                {
                    value: 5,
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            formatter: function (params) {
                                return '优秀';
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#528CED',
                        },
                    },
                },
            ],
        },
        {
            name: ' ',
            type: 'bar',
            stack: true,
            barWidth: 24,
            // silent: true,
            yAxisIndex: 0,
            data: [
                {
                    value: 5,
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            formatter: function (params) {
                                return '良好';
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#3DD7C1',
                        },
                    },
                },
            ],
        },
        {
            name: ' ',
            type: 'bar',
            stack: true,
            barWidth: 24,
            // silent: true,
            yAxisIndex: 0,
            data: [
                {
                    value: 5,
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            formatter: function (params) {
                                return '一般';
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#E5BB3C',
                        },
                    },
                },
            ],
        },
        {
          name: ' ',
          type: 'bar',
          stack: true,
          barWidth: 24,
          // silent: true,
          yAxisIndex: 0,
          data: [
              {
                  value: 5,
                  label: {
                      normal: {
                          show: true,
                          color: '#fff',
                          fontSize: 14,
                          formatter: function (params) {
                              return '一般';
                          },
                      },
                  },
                  itemStyle: {
                      normal: {
                          color: '#E5BB3C',
                      },
                  },
              },
          ],
      },
        {
            name: ' ',
            type: 'bar',
            stack: true,
            barWidth: 5,
            // silent: true,
            yAxisIndex: 0,
            data: [
                {
                    value: 5,
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            formatter: function (params) {
                                return '急需改造';
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#EF5286',
                        },
                    },
                },
            ],
        }
    ],
};
  chart.setOption(option);
}

export function echart_init_scale(ecComponent){
    ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        setOption(chart);
  
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
}
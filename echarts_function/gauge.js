import * as echarts from '../physical-detail/ec-canvas/echarts';

// const app = getApp();
function setOption(chart, value, name, unit) {
  var value = value;
  var name = name;
  var unit = unit;
  var color = ['#04a299', '#1aebd0'];
  
  var option = {
    "series": [
        {
            type: 'gauge',
            radius: '60%',
            splitNumber: 0,
            axisLine: {
                lineStyle: {
                    shadowColor: 'rgba(0, 255, 252, 0.3)',
                    shadowBlur: 10,
                    color: [[1, 'rgba(3, 27, 41, 0.5)']],
                    width: 20,
                },
                roundCap : true
            },
            axisLabel: { show: false },
            axisTick: { show: false },
            detail: { show: false },
            progress: { show: false ,lineStyle: {cap: "round"} },
            pointer: { show: false },
            splitLine: { show: false },
        },
        {
          type: 'gauge',
          radius: '60%', //刻度盘的大小
          min: 0,
          max: (Number(value) || '0') + 50,
          detail: {
              valueAnimation: true,
              formatter: function (v) {
                  return '{value|' + v.toFixed(1) + '}'+ '\n' +'{unit| ' + unit + '}';
              },
              offsetCenter: [0, '5%'],
              fontFamily: 'SQ',
              fontSize: 14,
              rich: {
                  value: {
                      color: '#000000',
                      fontFamily: 'SQ',
                      fontSize: 25
                  },
                  unit: {
                      color: '#000000',
                  },
              },
          },
          data: [
              {
                  value: value || 0,
                  itemStyle: {
                      color: {
                          //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 1, //从左到右 0-1
                          y2: 0,
                          colorStops: [
                              {
                                  offset: 0,
                                  color: color[0],
                              },
                              {
                                  offset: 1,
                                  color: color[1],
                              },
                          ],
                      },
                  },
              },
          ],
          axisLabel: { show: false },
          progress: { show: true, width: 20,roundCap: true },
          pointer: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: {
              show: false,
              lineStyle: { width: 1, color: [[1, 'rgba(255,255,255,0)']] },
          },
      },
        {
            title: {
                color: '#000000',
                fontSize: 18,
                offsetCenter: [0, '-95%'],
            },
            type: 'gauge',
            splitNumber: 0,
            startAngle: 0,
            endAngle: 0,
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false },
            data: [{ name: name || '' }],
        },
    ]
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
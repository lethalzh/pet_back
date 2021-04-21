<template>
  <div id="Panelline" class="Panelline" />
</template>

<script>
import { getSumOrderPrice } from '@/api/home.js'
import echarts from 'echarts'
export default {
  name: 'Panelline',
  data() {
    return {
      option: {
        title: {
          text: '成交金额曲线'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['已付', '未付']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: [],
          axisLabel: { // 坐标轴刻度标签的相关设置。
            interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
            textStyle: {
              color: '#1B253A',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            },
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 10 // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
            // rotate:50,
          },
          axisTick: { // 坐标轴刻度相关设置。
            show: false
          },
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: '#E5E9ED'
              // opacity:0.2
            }
          },
          splitLine: { // 坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: '#E5E9ED'
              // 	opacity:0.1
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E5E9ED'
                // 	opacity:0.1
              }
            }

          }
        ],
        series: [
          {
            name: '已付',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3A84FF',
                lineStyle: {
                  color: '#3A84FF',
                  width: 1
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: 'rgba(58,132,255,0)'
                  }, {
                    offset: 1,
                    color: 'rgba(58,132,255,0.35)'
                  }])
                }
              }
            },
            data: []
          },
          {
            name: '未付',
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(255,80,124,1)',
                lineStyle: {
                  color: 'rgba(255,80,124,1)',
                  width: 1
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: 'rgba(255,80,124,0)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,80,124,0.35)'
                  }])
                }
              }
            },
            data: []
          }
        ]
      }

    }
  },
  created() {

  },
  mounted() {
    this.initChart()
  },
  methods: {
    async initChart() {
      const res = await getSumOrderPrice()
      //  console.log(res)
      for (const i of res.data) {
        this.option.series[0].data.push(i.wPrice)
        this.option.series[1].data.push(i.fPrice)
        this.option.xAxis.data.push(i.days)
      }
      this.chart = echarts.init(document.getElementById('Panelline'))
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style scoped lang="scss">
.Panelline{
  width: 100%;
  height: 350px;
  margin: 0 auto;
}
</style>

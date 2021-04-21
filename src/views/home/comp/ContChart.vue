<template>
  <div id="ContChart" class="ContChart" />
</template>

<script>
import echarts from 'echarts'
import { getVideoConnum } from '@/api/home.js'
export default {
  name: 'ContChart',
  data() {
    return {
      option: {
        title: {
          text: '视频播放量'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['cat', 'dog']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['吃货必备', '奇异玩具', '居家出行', '精致入厕/潮流出行']
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: [],
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
            }
          },
          {
            name: '',
            type: 'bar',
            data: [],
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
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      getVideoConnum().then(res => {
        const arr = res.data; let j = 0
        for (let row = 0; row < arr.length; row++) {
          if (row == 4) { j++ }
          this.option.series[j].name = arr[row].animal
          this.option.series[j].data.push(arr[row].num)
          // console.log(arr[row].animal,arr[row].num ,'-----',this.option.series)
          this.chart = echarts.init(document.getElementById('ContChart'))
          this.chart.setOption(this.option)
        }
      })
    }
  }
}
</script>

<style scoped>
  .ContChart{
    width: 540px;
    height: 350px;
  }
</style>

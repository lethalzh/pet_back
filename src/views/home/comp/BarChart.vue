<template>
  <div id="BarChart" class="BarChart" />
</template>

<script>
import { getSumGoods } from '@/api/home.js'
import echarts from 'echarts'
export default {
  name: 'BarChart',
  data() {
    return {
      option: {
        title: {
          text: '商品销售量'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['cat', 'dog']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'cat',
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
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }

          },
          {
            name: 'dog',
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
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }

          }
        ]
      },
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      getSumGoods().then(res => {
        // console.log(res,'------------')
        let j = 0
        const info = res.data
        for (let i = 0; i < info.length; i++) {
          if (i == 12) { j = 1 }
          this.option.series[j].data.push(info[i].num)
          if (i < 12) { this.option.xAxis[0].data.push(info[i].com_product_type) }
        }
        this.chart = echarts.init(document.getElementById('BarChart'))
        this.chart.setOption(this.option)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.BarChart{
  width: 540px;
  height: 350px;
}
</style>

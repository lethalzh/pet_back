<template>
  <div id="AnimalCom" class="AnimalCom" />
</template>

<script>
import echarts from 'echarts'
import { productsNum } from '@/api/home.js'
export default {
  name: 'AnimalCom',
  data() {
    return {
      option: {
        title: {
          text: '商品占比',
          left: 'center',
          top: '-5'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: 'cat',
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
              { value: 0, name: 'dog',
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
        ]
      },
      chart: null
    }
  },
  created() {

  },
  mounted() {
    this.productsNum()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('AnimalCom'))
      this.chart.setOption(this.option)
    },
    productsNum() {
      productsNum().then(res => {
        this.option.series[0].data[0].value = res.products_num.cat
        this.option.series[0].data[1].value = res.products_num.dog
        this.initChart()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.AnimalCom{
  width: 540px;
  height: 350px;
}
</style>

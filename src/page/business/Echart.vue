<template>
  <div>
      <van-nav-bar
        title="统计"
      />
      <div style="margin-top: 60px;">
        <div id="chart"></div>
      </div>
  </div>
</template>

<script>
import {getEchPayList} from '@/api/load-data.js'
import {localUser} from '@/util/local.js'
export default {
  data () {
    return {
      chart: null,
      goodsData: [],
      createtime: [],
      number: []
    }
  },
  created () {
    this.$store.commit('setActiveMenu', 2)
  },
  mounted () {
    let d = localUser().username
    getEchPayList(d).then(res => {
      this.goodsData = res.data
      this.init()
    })
  },
  methods: {
    init () {
      this.chart = this.$echarts.init(document.getElementById('chart'))
      this.setOption()
    },
    setOption () {
      this.goodsData.map((item, index) => {
        this.createtime[index] = item[0]
        this.number[index] = item[1]
      })
      let option = {
        title: {
          text: '统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.createtime
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 50,
            color: '#096'
          }, {
            gt: 50,
            lte: 100,
            color: '#ffde33'
          }, {
            gt: 100,
            lte: 150,
            color: '#ff9933'
          }, {
            gt: 150,
            lte: 200,
            color: '#cc0033'
          }, {
            gt: 200,
            lte: 300,
            color: '#660099'
          }, {
            gt: 300,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: '销量',
          type: 'line',
          data: this.number,
          markLine: {
            silent: true,
            data: [{
              yAxis: 50
            }, {
              yAxis: 100
            }, {
              yAxis: 150
            }, {
              yAxis: 200
            }, {
              yAxis: 300
            }]
          }
        }
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
#chart{
  height: 500px;
}
</style>
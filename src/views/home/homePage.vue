<template>
  <div class="homePage">
    <Panel-Group />
    <Panelline />
    <div class="btmChart">
      <div><Animal-Com /></div>
      <div><Bar-Chart /></div>
      <div><Cont-Chart /></div>
    </div>
  </div>
</template>

<script>
import PanelGroup from './comp/PanelGroup'
import Panelline from './comp/Panelline'
import AnimalCom from './comp/AnimalCom'
import BarChart from './comp/BarChart'
import ContChart from './comp/ContChart'
export default {
  name: 'HomePage',
  components: { PanelGroup, Panelline, AnimalCom, BarChart, ContChart }
}
</script>

<style scoped lang="scss">
  .homePage{
    margin-top: -20px;
    padding-top: 10px;
    background-color: #f0f2f5;
    .btmChart{
      display: flex;
      margin-top: 5px;
      justify-content: center;
      div{
        width: 540px;
        height: 350px;

        margin-left: 5px;
      }
    }
  }

</style>

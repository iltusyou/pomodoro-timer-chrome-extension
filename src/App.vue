<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import Clock from './components/Clock.vue'
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

const activeName = ref('clock')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>

<template>
  <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick">
    <el-tab-pane label="Task" name="task">Task</el-tab-pane>
    <el-tab-pane label="Clock"  name="clock" >Clock<Clock></Clock></el-tab-pane>
        <el-tab-pane label="Records"  name="records" >Records</el-tab-pane>
    <el-tab-pane label="Setting" name="setting">Setting</el-tab-pane>
  </el-tabs>
</template>


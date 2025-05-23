<template>
   <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="專注時間">
        <el-input v-model="form.focusTime" type="number" placeholder="請輸入專注時間(分鐘)"></el-input>
    </el-form-item>
    <el-form-item label="短休息時間">
        <el-input v-model="form.shortBreakTime" type="number" placeholder="請輸入短休息時間(分鐘)"></el-input>
    </el-form-item>
    <el-form-item label="長休息時間">
        <el-input v-model="form.longBreakTime" type="number" placeholder="請輸入長休息時間(分鐘)"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">儲存設定</el-button>
    </el-form-item>
  </el-form>
</template>


<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  focusTime: '25',
  shortBreakTime: '5',
  longBreakTime: '15'
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
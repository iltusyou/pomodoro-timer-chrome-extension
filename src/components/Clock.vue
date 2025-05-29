<script setup>
import { ref, onMounted ,computed  } from "vue";

import { useSettingsStore } from "../stores/settingsStore.js";
const settingsStore = useSettingsStore();

// const startAngle = ref(0); 
// const rotateAngle = computed(() => {
//   return startAngle.value -90;
// });

const totalTime = 5; // 將分鐘轉換為秒
const remainingTime = ref(totalTime);
// const dashOffset =computed (() => {
//   return (remainingTime.value / totalTime.value) * 314;
// });

const progress=computed(() => {
  const percentage = 100-( (remainingTime.value / totalTime) * 100);


  return  Math.round(percentage * 100) / 100;
});


const displayTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});



let time;
const isCounting = ref(false);
const startTime = ref(null);
const endTime = ref(null);

const startCountdown = () =>{
  if(!time){
      startTime.value = new Date().toLocaleTimeString(); // 記錄開始時間
time= setInterval(()=>{
    if(remainingTime.value>0){
      remainingTime.value --;
    }
    else{
      clearInterval(time);
    time = null;
    isCounting.value = false;
      endTime.value = new Date().toLocaleTimeString(); // 記錄結束時間
      console.log(startTime.value + ' - ' + endTime.value);
    }
  },1000);
  }
} 

const pauseCountdown = ()=>{
  if(time){
    clearInterval(time);
    time = null;
  }
}

const toggleCountdown = ()=>{
  if(isCounting.value){
    pauseCountdown();
  }
  else{
    startCountdown();
  }
  isCounting.value = !isCounting.value;
}

onMounted(() => {
// startCountdown();
});

</script>

<template>
  <span>  {{ displayTime }}</span><br>
  <el-progress type="circle" :percentage="progress" />


    <div class="mb-4">
    <el-button :type="isCounting?'success':'primary'" @click="toggleCountdown" round>{{isCounting?'Pause':'Start'}}</el-button>
    <el-button type="danger" round>Reset</el-button>
  </div>


  <!-- <button @click="toggleCountdown">{{isCounting?'Pause':'Start'}}</button> -->
    <p>開始時間：{{ startTime }}</p>
    <p>結束時間：{{ endTime }}</p>
</template>
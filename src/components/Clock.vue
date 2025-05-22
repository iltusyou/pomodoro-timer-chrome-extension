<script setup>
import { ref, onMounted ,computed  } from "vue";

const radius = ref(50); // radius
const startAngle = ref(90); 
const rotateAngle = computed(() => {
  return startAngle.value -90;
});

const totalTime = 25*60; // 25 minutes in seconds
const remainingTime = ref(totalTime);
const dashOffset =computed (() => {
  return (remainingTime.value / totalTime) * 314;
});
const displayTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});


const isCounting = ref(false);
let time;

const startCountdown = () =>{
  if(!time){
time= setInterval(()=>{
    if(remainingTime.value>0){
      remainingTime.value --;
    }
    else{
      clearInterval(time);
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
  {{ displayTime }}<br>
  {{ dashOffset }}<br>
  <svg width="120" height="120" viewBox="0 0 120 120">
    <circle
      cx="60"
      cy="60"
      :r=radius
      stroke="#ddd"
      stroke-width="10"
      fill="none"
    />
    <circle
      cx="60"
      cy="60"
      :r=radius
      stroke="tomato"
      stroke-width="10"
      fill="none"
      stroke-dasharray="314"
      :stroke-dashoffset=dashOffset
      stroke-linecap="round"
      :transform="`rotate(${rotateAngle} 60 60)`" 
    />
  </svg>
<br>
  <button @click="toggleCountdown">{{isCounting?'Pause':'Start'}}</button>
</template>